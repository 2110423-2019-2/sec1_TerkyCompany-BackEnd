FROM node:12

RUN npm install -g nodemon

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

RUN npm build

CMD "npm" "start"
