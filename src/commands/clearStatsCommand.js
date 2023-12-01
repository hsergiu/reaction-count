import MessageScoreModel from '../mongo/models/messageScore.js';
import ServerModel from '../mongo/models/server.js';
import botUtils from '../utils/bot-utils.js';

export default {
  value: 'clear-stats',
  description: 'clear server\'s stats from the bot',
  execute: async (message) => {
    if (!botUtils.isSuperadmin(message)) {
      throw new Error(`${message.author.username} does not have permission to clear stats`, { cause: 'user' });
    }

    await MessageScoreModel.deleteMany({ guildId: message.guild.id });
    await ServerModel.deleteMany({ guildId: message.guild.id });
    return 'Stats and configurations cleared';
  },
};
