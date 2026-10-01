FROM node:22-alpine

RUN apk add --no-cache su-exec

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY --chown=node:node . .

EXPOSE 3000