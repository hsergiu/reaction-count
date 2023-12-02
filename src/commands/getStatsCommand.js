import MessageScoreModel from '../mongo/models/messageScore.js';
import botUtils from '../utils/bot-utils.js';

function extractLimitNumber(content) {
  const regex = /limit (\d+)/;
  const match = regex.exec(content);

  if (match) {
    return parseInt(match[1], 10);
  }
  return null;
}

function extractCurrentChannel(content) {
  const regex = /current-channel/;
  const match = regex.exec(content);

  if (match) {
    return true;
  }
  return false;
}

export default {
  value: 'stats',
  description: 'show stats for server\'s top 5 or (limit) messages',
  execute: async (message) => {
    const onlyCurrentChannel = extractCurrentChannel(message.content);
    const noStatsDefaultMessage = `No stats for the current ${onlyCurrentChannel ? 'channel' : 'server'}`;

    const limit = extractLimitNumber(message.content);

    const data = await MessageScoreModel.findMostReactedToMessages({
      guildId: message.guild.id,
      channelId: onlyCurrentChannel ? message.channel.id : undefined,
    }, { limit: limit ?? 5 });

    if (!data || data.length === 0) return noStatsDefaultMessage;

    const response = data.reduce((accumulator, current) => {
      const currentMessageUrl = botUtils.buildMessageUrl(current);
      return `${accumulator}\n`
                + `(${current.count} reactions) "${current.content ?? ''}": ${currentMessageUrl}`;
    }, `Most reacted to messages in this ${onlyCurrentChannel ? 'channel' : 'server'}:`);

    return response;
  },
};
