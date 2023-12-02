import mongoose from 'mongoose';
import botUtils from '../../utils/bot-utils.js';

const messageScoreSchema = new mongoose.Schema({
  guildId: String,
  channelId: String,
  count: Number,
  content: String,
  messageId: String,
  authorId: String,
});

const MessageScoreModel = new mongoose.model('message-score', messageScoreSchema);

async function upsert(query, { count, content }) {
  const options = { upsert: true, new: true, setDefaultOnInsert: true };
  const update = { $set: { count, content } };
  await MessageScoreModel.findOneAndUpdate(botUtils.removeUndefined(query), update, options);
}

async function findMostReactedToMessages(query, queryOptions = {}) {
  const data = await MessageScoreModel.find(
    botUtils.removeUndefined(query),
    null,
    { limit: queryOptions.limit },
  )
    .sort('-count')
    .exec();

  return data;
}

async function findTopAuthors(query, queryOptions = {}) {
  const data = await MessageScoreModel.aggregate([
    {
      $match: { guildId: query.guildId },
    },
    {
      $group: {
        _id: '$authorId',
        totalScore: { $sum: '$count' },
      },
    },
    {
      $sort: { totalScore: -1 },
    },
    { $limit: queryOptions.limit },
  ]);

  return data;
}

async function deleteMany({ guildId }) {
  await MessageScoreModel.deleteMany({ guildId });
}

async function deleteOne({ guildId, messageId, channelId }) {
  await MessageScoreModel.deleteOne({
    guildId,
    messageId,
    channelId,
  });
}

const messageScoreExport = {
  upsert,
  findMostReactedToMessages,
  deleteMany,
  deleteOne,
  findTopAuthors,
};

export default messageScoreExport;
