FROM node:latest

RUN mkdir -p /app

WORKDIR /app

COPY package*.json /app//

RUN npm install

COPY . .

RUN npm install -g nodemon

CMD ["nodemon", "index.js"]