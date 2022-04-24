# pull official base image
FROM node:14-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package*.json ./
RUN npm install
RUN npm install react-scripts -g

# add app
COPY . ./

EXPOSE 3000
# start app
CMD ["npm", "start"]

#https://mherman.org/blog/dockerizing-a-react-app/
#https://nodejs.org/en/docs/guides/nodejs-docker-webapp/