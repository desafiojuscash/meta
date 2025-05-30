# 📦 🤖 Automação de Coleta de Publicações do DJE - Python
Este módulo realiza o web scraping automatizado do Diário da Justiça Eletrônico (DJE) de São Paulo, especificamente do Caderno 3 - Judicial - 1ª Instância - Capital Parte 1. A automação busca publicações que contenham os termos definidos, extrai dados relevantes como número do processo, autores, advogados, valores e conteúdo completo, e salva tudo em um banco de dados estruturado.

As coletas são programadas para ocorrer diariamente a partir de 17/03/2025. As publicações extraídas são marcadas com status inicial de "nova" para integração com o sistema de gerenciamento por Kanban.

🔗 Acesse o DJE em: [https://dje.tjsp.jus.br/cdje/index.do](https://dje.tjsp.jus.br/cdje/index.do)

> **Atenção:** Não há verificação de duplicidade dos dados extraídos, pois o PDF disponibilizado pode gerar informações inconcistentes, o que impede uma identificação confiável de publicações repetidas.

## 🚀 Requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose (opcional)](https://docs.docker.com/compose/)

## 📥 Clonando o Repositório

```bash
git clone git@github.com:desafiojuscash/meta.git
cd seu-repo
```


⚙️ Configuração do Ambiente
Atualize o arquivo .env.local na raiz do projeto com as variáveis de ambiente necessárias. Exemplo:

```env
ADVANCED_QUERY_URL=https://dje.tjsp.jus.br/cdje/consultaAvancada.do
ADVANCED_QUERY_CHANGE_PAGE_URL=https://dje.tjsp.jus.br/cdje/trocaDePagina.do
PDF_URL_ROOT=https://dje.tjsp.jus.br
USERNAME={SEU_USUARIO_NO_SITE}
PASSWORD={SUA_SENHA_NO_SITE}
APP_ROOT_URI={URI_DO_APP}
APP_CASE_PATH=/v1/case
APP_AUTH_PATH=/v1/auth
```

> **Atenção:** Crie ou atualize o arquivo .env.local na raiz da pasta **robot** com as variáveis necessárias. É de suma importância configurar o usuário e a senha do aplicativo.

▶️ Rodando o Container

```bash
docker exec -it robot_task python src/main.py
```

ou

```bash
docker exec -it robot_task python src/main.py --startDate=17/03/2025 --endDate=10/04/2025
```