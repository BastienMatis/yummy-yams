FROM node:18-alpine

WORKDIR /api

COPY package.json .

RUN npm install\
    && npm install -g ts-node\
    && npm install -g typescript \
    && npm install -g nodemon

COPY . .

EXPOSE 3001

CMD [ "npm", "run", "start" ]