import helpCommand from './commands/helpCommand.js';
import getStatsCommand from './commands/getStatsCommand.js';
import clearStatsCommand from './commands/clearStatsCommand.js';
import changePrefixCommand from './commands/changePrefixCommand.js';
import getAuthorStatsCommand from './commands/getAuthorStatsCommand.js';

import serverModel from './mongo/models/server.js';

async function getPrefix(guildId) {
  const defaultPrefix = '_';

  const prefix = await serverModel.findServerPrefix({ guildId });
  return prefix ?? defaultPrefix;
}

export function getCommandsAvailable() {
  return [getStatsCommand, clearStatsCommand, changePrefixCommand, getAuthorStatsCommand];
}

export async function initializeCommandOnMessage(message) {
  const prefix = await getPrefix(message.guild?.id);
  let result;
  if (message.content.startsWith(`${prefix}${helpCommand.value}`)) {
    result = helpCommand.execute(getCommandsAvailable());
  } else if (message.content.startsWith(`${prefix}${getStatsCommand.value}`)) {
    result = await getStatsCommand.execute(message);
  } else if (message.content.startsWith(`${prefix}${clearStatsCommand.value}`)) {
    result = await clearStatsCommand.execute(message);
  } else if (message.content.startsWith(`${prefix}${changePrefixCommand.value}`)) {
    result = await changePrefixCommand.execute(message);
  } else if (message.content.startsWith(`${prefix}${getAuthorStatsCommand.value}`)) {
    result = await getAuthorStatsCommand.execute(message);
  }

  return result;
}
