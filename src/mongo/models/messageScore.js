import mongoose from 'mongoose';

const messageScoreSchema = new mongoose.Schema({
  guildId: String,
  channelId: String,
  count: Number,
  messageId: String,
  authorId: String,
});

const MessageScoreModel = new mongoose.model('message-score', messageScoreSchema);

async function upsert({
  guildId, messageId, channelId, authorId,
}, { count, content }) {
  const options = { upsert: true, new: true, setDefaultOnInsert: true };
  const update = { $set: { count, content } };
  await MessageScoreModel.findOneAndUpdate({
    guildId, messageId, channelId, authorId,
  }, update, options);
}

async function findMostReactedToMessages({ guildId, channelId, limit }) {
  const data = await MessageScoreModel.find({
    guildId,
    channelId,
  }, null, { limit })
    .sort('-count')
    .exec();

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
};

export default messageScoreExport;
