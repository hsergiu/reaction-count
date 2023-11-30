# Reaction Insight
Discord bot that counts reactions for every message and saves to Mongo. Uses discord.js v14.

This way you can display the most interacted with message(s) using a command.
Supports multiple guilds.

The bot fetches the reaction count for every message (on removed/added reaction) and sets the new value in the database so the number is more accurate.

Also, if it was removed from the server and added back, it doesn't fetch the latest messages to recalculate the reaction number (In this case you would have to wait for someone to react to those latest messages). It works best when it is permanently online on a server.

Default prefix is '_'. It can be changed.

Commands available: help, get-stats, clear-stats, change-prefix

> Setup: docker and npm are required to install dependencies or to run the containerized app.
