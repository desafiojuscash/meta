from dotenv import load_dotenv
from datetime import datetime
import requests
import re
import os
import fitz
import json
import concurrent.futures
from requests.auth import HTTPBasicAuth
import argparse
from bs4 import BeautifulSoup


load_dotenv()

ADVANCED_QUERY_URL = ''
ADVANCED_QUERY_CHANGE_PAGE_URL = ''
PDF_URL_ROOT = ''


def load_env():
    global ADVANCED_QUERY_URL
    global ADVANCED_QUERY_CHANGE_PAGE_URL
    global PDF_URL_ROOT
    ADVANCED_QUERY_URL = os.getenv('ADVANCED_QUERY_URL')
    ADVANCED_QUERY_CHANGE_PAGE_URL = os.getenv(
        'ADVANCED_QUERY_CHANGE_PAGE_URL'
    )
    PDF_URL_ROOT = os.getenv('PDF_URL_ROOT')


def build_payload(page=1):
    return {
        'dadosConsulta.dtInicio': START_DATE,
        'dadosConsulta.dtFim': END_DATE,
        'dadosConsulta.cdCaderno': '12',
        'dadosConsulta.pesquisaLivre': '"RPV" E "pagamento pelo INSS"'
    } if page == 1 else {
        'pagina': page,
    }


def extract_data(html_content):
    soup = BeautifulSoup(html_content, 'lxml')
    results = []
    for row in soup.select('tr.fundocinza1'):
        link_tag = row.select_one(
            'td[colspan="2"][align="left"] > a.layout[onclick]'
        )
        if link_tag:
            onclick = link_tag['onclick']
            link = onclick.split("'")[1].replace('&amp;', '&')
            full_text = link_tag.get_text(strip=True)
            date_str = full_text.split(' - ')[0]
            try:
                date_obj = datetime.strptime(
                    date_str, '%a %b %d %H:%M:%S %Z%z %Y'
                )
                formatted_date = date_obj.strftime('%d/%m/%Y')
            except ValueError:
                formatted_date = date_str

            results.append({
                'link': link,
                'date': formatted_date,
            })
    return results


def get_next_page(session, page):
    response = session.get(
        ADVANCED_QUERY_CHANGE_PAGE_URL,
        params=build_payload(page)
    )
    return extract_data(response.text)


def get_first_page(session):
    response = session.post(ADVANCED_QUERY_URL, data=build_payload())
    return extract_data(response.text)


def get_registers(session):
    results = []
    is_done = False
    page = 1

    while not is_done:
        print(f"Page: {page}")
        result = get_first_page(session) if page == 1 \
            else get_next_page(session, page)
        results.extend(result)
        page += 1
        if not result:
            is_done = True
    print("Finished processing pages.")
    print("Total results:", len(results))
    return results


def get_pdf(session, path):
    newPath = path.replace('consultaSimples', 'getPaginaDoDiario')
    response = session.get(
        f"{PDF_URL_ROOT}{newPath}"
    )

    if response.status_code == 200:
        return response.content
    else:
        print(f"Erro ao baixar PDF: {response.status_code}")
        return None


def extract_text_from_pdf(pdf_bytes):
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    texto = ""
    for page in doc:
        texto += page.get_text()
    return texto


def extract_cases(text, publication_date):
    cases = []
    blocks = re.split(r'(?=Processo \d+-\d+\.\d+\.\d+\.\d+\.\d+)', text)
    for block in blocks:
        if "pagamento pelo INSS" in block and ("RPV" in block):
            data = {
                "case_number": None,
                "publication_date": publication_date,
                "authors": [],
                "lawyers": [],
                "content": block.strip(),
                "principal_gross_net": None,
                "late_interest": None,
                "legal_fees": None
            }

            case_number = re.search(
                r'Processo (\d+-\d+\.\d+\.\d+\.\d+\.\d+)',
                block
            )
            if case_number:
                data["case_number"] = case_number.group(1)

            authors_matches = re.findall(
                r'-\s*([A-Za-zÀ-ú\s]+?)\s*-\s*Vistos\.',
                block,
                re.IGNORECASE
            )
            if authors_matches:
                data["authors"] = [
                    author.strip() for author in authors_matches
                ]

            lawyer_matches = re.findall(
                r'ADV:\s*([A-Za-zÀ-ú\s]+?\s*\(OAB\s*\d+\/[A-Z]{2}\))',
                block
            )
            if lawyer_matches:
                data["lawyers"] = [lawyer.strip() for lawyer in lawyer_matches]

            principal_match = re.search(
                r'R\$\s*([\d.,-]+)\s*-\s*principal bruto',
                block,
                re.IGNORECASE
            )
            if principal_match:
                data["principal_gross_net"] = f"R$ {principal_match.group(1)}"

            interest_match = re.search(
                r'R\$\s*([\d.,-]+)\s*-\s*juros morat[oó]rios',
                block,
                re.IGNORECASE
            )
            if interest_match:
                value = interest_match.group(1)
                data["late_interest"] = f"R$ {value}" \
                    if value != '-' else "R$ 0,00"

            fees_match = re.search(
                r'R\$\s*([\d.,-]+)\s*-\s*honor[áa]rios advocat[íi]cios',
                block,
                re.IGNORECASE
            )
            if fees_match:
                data["legal_fees"] = f"R$ {fees_match.group(1)}"

            cases.append(data)

    return cases


def extract_all_cases(session, registers):
    results = []
    for register in registers:
        pdf_bytes = get_pdf(session, register.get("link"))
        context = extract_text_from_pdf(pdf_bytes)
        cases = extract_cases(context, register.get("date"))
        results.extend(cases)
    return results


def parse_case_data(data):
    def money_to_int(value):
        if not value:
            return None
        numeric = value.replace("R$", "") \
                       .replace(".", "") \
                       .replace(",", "") \
                       .strip()
        return int(numeric) if numeric.isdigit() else None

    publication_date = None
    if data.get("publication_date"):
        try:
            publication_date = datetime.strptime(
                data["publication_date"], "%d/%m/%Y"
            ).isoformat(timespec='milliseconds') + "Z"
        except ValueError:
            publication_date = None

    authors = ", ".join(data["authors"]) if data.get("authors") else None
    if authors == "":
        authors = None

    lawyers_raw = data.get("lawyers", [])
    lawyers = []

    for lawyer in lawyers_raw:
        cleaned = re.sub(r"\s+", " ", lawyer.replace("\n", " ")).strip()
        match = re.match(r"(.+?)\s+\(OAB\s+(\d+\/[A-Z]{2})\)", cleaned)
        if match:
            lawyers.append({
                "name": match.group(1).strip(),
                "document": match.group(2).strip()
            })

    return {
        "case_number": data.get("case_number"),
        "publication_date": publication_date,
        "authors": authors,
        "lawyers": lawyers,
        "content": data.get("content"),
        "principal_gross_net": money_to_int(data.get("principal_gross_net")),
        "late_interest": money_to_int(data.get("late_interest")),
        "legal_fees": money_to_int(data.get("legal_fees"))
    }


def get_auth_token():
    username = os.getenv('USERNAME')
    password = os.getenv('PASSWORD')

    result = requests.post(
        f"{os.getenv('APP_ROOT_URI')}{os.getenv('APP_AUTH_PATH')}",
        auth=HTTPBasicAuth(username, password)
    )

    return result.json().get('access_token')


def to_camel_case(snake_str):
    parts = re.split(r'[_\-]', snake_str)
    return parts[0] + ''.join(word.capitalize() for word in parts[1:])


def convert_json(original_json):
    new_json = {}
    for key, value in original_json.items():
        if value is None:
            continue
        camel_key = to_camel_case(key)
        if isinstance(value, list):
            new_value = [
                convert_json(item) if isinstance(item, dict) else item
                for item in value
            ]
        elif isinstance(value, dict):
            new_value = convert_json(value)
        else:
            new_value = value
        new_json[camel_key] = new_value
    return new_json


def send_to_server(params):
    data = params.get("data")
    token = params.get("token")
    response = requests.post(
        f"{os.getenv('APP_ROOT_URI')}{os.getenv('APP_CASE_PATH')}",
        data=json.dumps(convert_json(data)),
        headers={
            'Content-Type': 'application/json',
            'Authorization': f"Bearer {token}"
        }
    )
    print(response.text)
    pass


def send_in_batches_to_server(data, max_workers=1):
    token = get_auth_token()
    with concurrent.futures.ThreadPoolExecutor(
        max_workers=max_workers
    ) as executor:
        futures = [executor.submit(
            send_to_server, {"data": d, "token": token}
        ) for d in data]
        concurrent.futures.wait(futures)


def process():
    session = requests.Session()
    registers = get_registers(session)
    cases = extract_all_cases(session, registers)
    cases_parsed = [parse_case_data(case) for case in cases]
    send_in_batches_to_server(cases_parsed, max_workers=5)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument(
        '--startDate', type=str, help='Data de início no formato dd/mm/aaaa'
    )
    parser.add_argument(
        '--endDate', type=str, help='Data de fim no formato dd/mm/aaaa'
    )
    args = parser.parse_args()

    load_env()

    global START_DATE, END_DATE
    START_DATE = args.startDate or datetime.now().strftime("%d/%m/%Y")
    END_DATE = args.endDate or datetime.now().strftime("%d/%m/%Y")

    process()
