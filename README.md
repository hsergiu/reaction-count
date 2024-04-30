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
 
![help cmd](https://github.com/hsergiu/reaction-count/assets/57728877/641ffb94-8b9a-49ba-a4ab-417c28f68766)
</details>
 
<details>
<summary> Stats </summary>

Check stats for the current server or channel (using 'current-channel' parameter). Overrdide the default result limit (5) using 'limit' param. (ex: _stats limit 10 ; _stats current-channel)
 
![stats cmd](https://github.com/hsergiu/reaction-count/assets/57728877/b624e607-565a-42ca-82ac-e0e6484a7b4b)

![stats channel cmd](https://github.com/hsergiu/reaction-count/assets/57728877/136ef6ff-2d0a-49a8-aa10-3aa6c00b5889)

</details>

<details>
<summary> Author stats </summary>

Find who are the top authors of the current server based on the reaction count they got on their messages. (ex: _author-stats)
 
![top authors cmd](https://github.com/hsergiu/reaction-count/assets/57728877/cfd97b71-a425-4b00-988a-2f92fe6b69c3)

</details>

> The other commands that are not showcased: change-prefix, clear-stats

## Local setup
- requirements: docker, npm
- define your .env file with credentials
- install dependencies  with npm
- docker compose up
- use any eslint extension
