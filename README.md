# 📦 Projeto Automação e Gerenciamento de Publicações do DJE

Este projeto integra a automação para coleta de publicações do Diário da Justiça Eletrônico (DJE) de São Paulo com um sistema de gerenciamento completo que conta com backend (API), frontend (interface web) e um módulo de automação (robot) para web scraping. A aplicação foi desenvolvida para facilitar a revisão, análise e acompanhamento dos processos judiciais coletados.

## 🚀 Requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## 📥 Clonando o Repositório

```bash
git clone git@github.com:desafiojuscash/meta.git
cd seu-repo
```

⚙️ Estrutura do Projeto
A árvore de arquivos está organizada da seguinte forma:

```
.
├── README                           # Este arquivo (documentação geral)
├── backend                          # API e lógica de gerenciamento (Node.js)
├── docker-compose.yml               # Definição dos containers do projeto
├── frontend                         # Interface de usuário (React/Vite)
└── robot                            # Automação de coleta de publicações (Python)
```

## 🚀 Executando o Projeto
Utilize o Docker Compose para levantar todos os containers simultaneamente.

```
docker-compose up --build
```
Os serviços serão iniciados conforme a seguinte configuração:

- Banco de Dados (PostgreSQL): Disponível na porta 5432.

- Backend (API): Disponível na porta 3000.

- Frontend (Interface Web): Disponível na porta 5173.

- Robot (Automação via Python): Executado com comando customizado; consulte a documentação do módulo.

## 🔧 Como Acessar os Módulos
- Backend: Acesse os endpoints da API via http://localhost:3000.

- Frontend: A interface web estará acessível em http://localhost:5173.

- Robot: Para iniciar o processo de automação, execute o comando:

```
docker exec -it robot_task python src/main.py
```
Ou, para especificar um período de coleta:

```
docker exec -it robot_task python src/main.py --startDate=17/03/2025 --endDate=10/04/2025
```
> **Atenção:**  Verifique e atualize os arquivos de ambiente (.env.local) dos módulos conforme as variáveis necessárias para a operação.

## 🚀 Endpoints de produção

- [https://13.58.212.214.sslip.io](https://13.58.212.214.sslip.io) (API BACKEND)
- [https://main.dxh3c1lw6fb50.amplifyapp.com/](https://main.dxh3c1lw6fb50.amplifyapp.com/) ( FRONTEND )

## 🔧 Domentações Relacionadas
Documentações adicionais podem ser acessadas nesse [drive](https://drive.google.com/drive/folders/1LO6GcvpWQZaLgljkOsfEqzUTbsUwqCHQ?usp=sharing) como exemplos de requests na collection do postman, diagramas de dados, swaggers e mais.