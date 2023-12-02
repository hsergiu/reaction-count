function extractReactionCount(message = {}) {
  if (Object.keys(message).length === 0) return 0;

  let totalReactions = 0;
  message.reactions.cache.forEach((reaction) => {
    totalReactions += reaction.count;
  });

  return totalReactions;
}

async function fetchPartial(object = {}) {
  if (object.partial) {
    await object.fetch();
  }
}

function buildMessageUrl(message = {}) {
  return `https://discord.com/channels/${message.guildId}/${message.channelId}/${message.messageId}`;
}

function isSuperadmin(message) {
  if (message.author.id !== process.env.ownerId) {
    return false;
  }

  return true;
}

function getPrefix(content) {
  const splitContent = content.split(' ');
  if (splitContent?.length === 2 && /\D{1}/.test(splitContent[1])) return splitContent[1];
  return null;
}

function truncateString(str, maxLength = 200) {
  if (str.length > maxLength) {
    return `${str.substring(0, maxLength)}...`;
  }
  return str;
}

function removeUndefined(object) {
  Object.keys(object).forEach((key) => {
    if (object[key] === undefined) {
      delete object[key];
    }
  });

  return object;
}

const botUtilsExport = {
  extractReactionCount,
  fetchPartial,
  buildMessageUrl,
  isSuperadmin,
  getPrefix,
  truncateString,
  removeUndefined,
};

export default botUtilsExport;
