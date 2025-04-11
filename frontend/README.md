
# 📦 Interface Web para Gerenciamento de Publicações - Frontend (React/Vite)

Este módulo foi desenvolvido com React e Vite, fornecendo uma interface interativa para usuários acompanharem as publicações extraídas do DJE. A aplicação inclui funcionalidades como login, cadastro, visualização em formato Kanban e busca avançada.

## 🚀 Requisitos

- [Docker](https://www.docker.com/)
- Node.js e npm (para desenvolvimento local)
- [Docker Compose (opcional)](https://docs.docker.com/compose/)

## 📥 Clonando o Repositório

Após clonar o repositório completo, acesse a pasta do frontend:

```
cd seu-repo/frontend
```

## ⚙️ Configuração do Ambiente
Atualize ou crie o arquivo .env.local (se aplicável) na raiz da pasta frontend com as variáveis de ambiente necessárias, por exemplo:
```
VITE_API_URL=http://localhost:3000
```
## ▶️ Executando o Frontend
Utilize o Docker Compose para iniciar o container ou execute localmente:

Via Docker Compose
```
docker-compose up --build frontend
```
Para Desenvolvimento Local
Instale as dependências e inicie o servidor de desenvolvimento:

```
npm install
npm run dev
```
A aplicação estará disponível em http://localhost:5173.

## 🔍 Funcionalidades
- Tela de Login e Cadastro: Acesso seguro com validação de credenciais.

- Kanban: Visualização e gerenciamento das publicações com drag and drop.

- Busca e Filtros: Ferramentas para localizar publicações com base em critérios específicos.

>***Dica:*** Para conferir a integridade visual e responsividade, teste a aplicação em diferentes resoluções (desktop e mobile).