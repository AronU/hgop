FROM node:erbium

WORKDIR /code

COPY package.json package.json

RUN npm install

COPY database.js database.js

COPY app.js app.js

CMD node app.js