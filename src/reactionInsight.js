import { config } from 'dotenv';
config();

import Discord from 'discord.js';
import MessageScoreModel from './mongo/models/messageScore.js';
import ServerModel from './mongo/models/server.js';
import { connect } from './mongo/database.js';
import botUtils from './utils/bot-utils.js';
import loggingUtils from './utils/logging-utils.js';

import { initializeCommandOnMessage } from './initializeCommands.js';

const client = new Discord.Client({ 
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.GuildMessageReactions
    ],
    partials: [
        Discord.Partials.Message,
        Discord.Partials.Channel,
        Discord.Partials.Reaction
    ]
});

client
.on('messageCreate', async (message) => {
    try {
        const response = await initializeCommandOnMessage(message);
        if (response) await message.channel.send(response);
    }
    catch (err) {
        loggingUtils.logError('initializeCommandOnMessage', err, { channel: message.channel });
    }
})
.on('messageReactionAdd', async (reaction) => {
    try {
        await onAddedReaction(reaction);
    }
    catch (err) {
        loggingUtils.logError('onAddedReaction', err, { channel: reaction.message.channel });
    }
})
.on('messageReactionRemove', async (reaction) => {
    try {
        await onRemovedReaction(reaction);
    }
    catch (err) {
        loggingUtils.logError('onRemovedReaction', err, { channel: reaction.message.channel });
    }
})
.on('messageUpdate', async (oldMessage, newMessage) => {
    try {
        await onMessageUpdate(newMessage);
    }
    catch (err) {
        loggingUtils.logError('onMessageUpdate', err, { channel: newMessage.channel });
    }
})
.on('messageDelete', async (message) => {
    try {
        await onMessageDelete(message);
    }
    catch (err) {
        loggingUtils.logError('onMessageDelete', err, { channel: message.channel });
    }
})
.on('rateLimit', async (rateLimitData) => {
    console.log(`Rate limit has been hit at ${new Date()}`);
})
.on('guildCreate', async (guild) => {
    console.log(`Joined server: "${guild.name}"`);
})
.on('guildDelete', async (guild) => {
    await MessageScoreModel.deleteMany({ guildId: guild.id });
    await ServerModel.deleteMany({ guildId: guild.id });
})
.on('ready', async () => {
    console.log('Bot is ready!');
	console.log(`Bot name: "${client.user.tag}"`);
})
.on('error', console.error);

async function onMessageUpdate(newMessage) {
    await botUtils.fetchPartial(newMessage);

    await MessageScoreModel.upsert({
        guildId: message.guild?.id,
        messageId: message.id,
        channelId: message.channel?.id,
        authorId: message.author?.id
    },{
        content: message.content
    });
}

async function onAddedReaction(reaction) {
    await botUtils.fetchPartial(reaction.message);

    await MessageScoreModel.upsert({
        guildId: message.guild?.id,
        messageId: message.id,
        channelId: message.channel?.id,
        authorId: message.author?.id
    },{
        count: botUtils.extractReactionCount(message),
        content: message.content
    });
};

async function onRemovedReaction(reaction) {
    await botUtils.fetchPartial(reaction.message);

    await MessageScoreModel.upsert({
        guildId: message.guild?.id,
        messageId: message.id,
        channelId: message.channel?.id,
        authorId: message.author?.id
    },{
        count: botUtils.extractReactionCount(message),
        content: message.content
    });
};

async function init() {
    await connect(process.env.MONGO_HOST, process.env.MONGO_INITDB_ROOT_USERNAME, process.env.MONGO_INITDB_ROOT_PASSWORD);
    console.log("Attempting discord login...");
    await client.login(process.env.TOKEN);
};

init();