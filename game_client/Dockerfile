FROM node:latest

WORKDIR /code
COPY package.json package.json
RUN npm install
COPY . .
CMD ["npm", "start"]