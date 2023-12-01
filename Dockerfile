FROM node:16

RUN useradd --user-group --create-home --shell /bin/false bot

COPY package.json .eslintrc.* package-lock.json /home/bot/reaction-insight/
RUN chown -R bot:bot /home/bot/*

USER root
WORKDIR /home/bot/reaction-insight
COPY . .

RUN npm install

RUN chown -R bot:bot /home/bot/*
USER bot