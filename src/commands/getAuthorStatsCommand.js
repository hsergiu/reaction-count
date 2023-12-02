import MessageScoreModel from '../mongo/models/messageScore.js';

function extractLimitNumber(content) {
  const regex = /limit (\d+)/;
  const match = regex.exec(content);

  if (match) {
    return parseInt(match[1], 10);
  }
  return null;
}

export default {
  value: 'author-stats',
  description: 'show stats for server\'s top 5 or (limit) authors',
  execute: async (message) => {
    const noStatsDefaultMessage = 'No stats for the current server';

    const limit = extractLimitNumber(message.content);

    const data = await MessageScoreModel.findTopAuthors({
      guildId: message.guild.id,
    }, { limit: limit ?? 5 });

    if (!data || data.length === 0) return noStatsDefaultMessage;

    const response = data.reduce(
      (accumulator, current) => `${accumulator}\n<@${current._id}> (${current.totalScore} reactions)`,
      'Top authors in this server',
    );

    return response;
  },
};
