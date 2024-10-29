FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install @prisma/client && npx prisma generate

EXPOSE 3000

CMD ["npx", "ts-node-dev", "--transpile-only", "src/server.ts"]
