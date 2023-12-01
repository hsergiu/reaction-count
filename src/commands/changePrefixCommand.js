import ServerModel from '../mongo/models/server.js';
import botUtils from '../utils/bot-utils.js';

export default {
  value: 'change-prefix',
  description: 'change current server prefix for this bot',
  execute: async (message) => {
    const prefix = botUtils.getPrefix(message.content);
    if (!prefix) {
      throw new Error('Prefix provided is not valid', { cause: 'user' });
    }

    await ServerModel.createOrUpdateServerPrefix({ guildId: message.guild.id }, { prefix });
    return `Prefix was changed to '${prefix}'`;
  },
};
