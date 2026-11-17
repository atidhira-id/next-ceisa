FROM node:22.23.4-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY prisma ./prisma
COPY prisma.config.ts ./
COPY tsconfig.json ./
COPY src ./src

EXPOSE 4000

CMD ["npm", "run", "dev"]
