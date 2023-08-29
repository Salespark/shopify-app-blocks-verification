FROM node:18.17.1

WORKDIR /var/app

COPY ./package.json .

RUN yarn install

COPY . .

RUN yarn build

CMD yarn pm2:start
