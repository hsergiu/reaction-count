FROM node:16

RUN useradd --user-group --create-home --shell /bin/false bot

USER bot
WORKDIR /home/bot/reaction-insight

COPY --chown=bot:bot package.json .eslintrc.* package-lock.json ./

RUN npm install

COPY --chown=bot:bot . .
