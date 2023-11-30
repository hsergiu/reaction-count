import MessageScoreModel from '../mongo/models/messageScore.js';
import botUtils from '../utils/bot-utils.js';

export default {
    value: 'stats',
    description: 'show stats fors server\'s top 5 messages',
    execute: async (message) => {
        const noStatsDefaultMessage = 'No stats for the current channel';
        const data = await MessageScoreModel.findMostReactedToMessages({
            guildId: message.guild.id,
            channelId: message.channel.id,
            limit: 5
        });

        if (!data || data.length === 0) return noStatsDefaultMessage;

        const response = data.reduce((accumulator, current) => {
            const currentMessageUrl = botUtils.buildMessageUrl(current);
            return accumulator + '\n'
                + `(${current.count} reactions) "${current.content ?? ''}": ${currentMessageUrl}`;
        }, 'Most reacted to messages in this channel:');

        return response;
    }
};
