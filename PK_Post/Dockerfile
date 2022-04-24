FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3005
CMD [ "node", "index-dynamodb.js" ]

#https://nodejs.org/en/docs/guides/nodejs-docker-webapp/