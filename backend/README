
# 📦 API de Gerenciamento de Publicações - Backend (Node.js)

Este módulo é responsável por fornecer a API para o gerenciamento dos dados extraídos do DJE. Desenvolvida em Node.js com Express, a API oferece endpoints para cadastro, consulta e atualização de publicações, integrando com o banco de dados PostgreSQL.

## 🚀 Requisitos

- [Docker](https://www.docker.com/)
- Node.js (para desenvolvimento local fora do container, se desejado)
- [Docker Compose (opcional)](https://docs.docker.com/compose/)

## 📥 Clonando o Repositório

Se você já clonou o projeto completo (README na raiz), acesse a pasta `backend`:

```bash
cd meta/backend
```


## ⚙️ Configuração do Ambiente
Crie ou atualize o arquivo .env.local na raiz da pasta backend com as variáveis necessárias, por exemplo:

#### Configurações do Banco de Dados
```
DB_DIALECT=postgres
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=myappdb
```
#### Outras variáveis de ambiente da API

```
JWT_SECRET=sua_chave_secreta
JWT_EXPIRES_IN=24h
```

## ▶️ Executando o Backend
A API é construída via Docker. Utilize o Docker Compose para iniciar todos os serviços ou execute apenas o backend:

```
docker-compose up --build backend
```
Caso queira interagir diretamente com o container para depuração, use:
```
docker exec -it backend_service sh
```
## Dentro do container, você pode rodar:
npm start
### 🔗 Endpoints Principais
- Autenticação: /v1/auth

- Gerenciamento de Usuários: /v1/user

- Gerenciamento de Publicações: /v1/case

Consulte a documentação interna (por exemplo, via Swagger ou README adicional) para detalhes de cada endpoint.

>***Nota:*** Certifique-se de que o banco de dados esteja ativo e configurado corretamente antes de iniciar a API.