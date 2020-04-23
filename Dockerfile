FROM node:12.14

WORKDIR /home/node/app

COPY package*.json ./
RUN npm install
COPY . .

RUN npm build
EXPOSE 8080
ENTRYPOINT npm start