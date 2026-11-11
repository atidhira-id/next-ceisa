FROM node:22.23.4-alpine

RUN apk add --no-cache su-exec

WORKDIR /app

COPY package*.json ./

COPY prisma ./prisma
COPY prisma7.config.ts ./

RUN npm install

COPY --chown=node:node . .

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev"]