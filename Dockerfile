FROM --platform=linux/amd64 node:lts-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY ./dist ./src

CMD ["node", "src/main.js"]