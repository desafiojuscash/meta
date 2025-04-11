FROM node:22.14.0-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

RUN \
  if [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm install; \
  elif [ -f yarn.lock ]; then yarn install; \
  else echo "Nenhum gerenciador de pacotes detectado" && exit 1; \
  fi

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
