# Reaction Insight
Discord bot that counts reactions for every message and saves to Mongo. Uses discord.js v14.

This way you can display the most interacted with message(s) using a command, or show top users based on how many reactions they got.
Supports multiple guilds.

The bot fetches the reaction count for every message (on removed/added reaction) and sets the new value in the database so the number is more accurate.

Also, if the bot was removed from the server and added back, it doesn't fetch the latest messages to recalculate the reaction number (In this case you would have to wait for someone to react to those latest messages). It works best when it is permanently online on a server.

Default prefix is '_'. It can be changed.

## Commands
<details>
<summary> Help </summary>

</details>
 
<details>
<summary> Stats </summary>

</details>

<details>
<summary> Author stats </summary>

</details>

> The other commands that are not showcased: change-prefix, clear-stats

## Pipeline
![ci](https://github.com/hsergiu/reaction-count/actions/workflows/main-workflow.yml/badge.svg) 

Github actions CI with 3 stages that should be mentioned: linting, testing and building. Defined [here](.github/workflows/main-workflow.yml). Another stage that is not yet implemented would be used for deployment.

## Local setup
- requirements: docker, npm
- define your .env file with credentials
- install dependencies  with npm
- docker compose up
- use any eslint extension
