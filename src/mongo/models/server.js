import mongoose from 'mongoose';

const serverSchema = new mongoose.Schema({
    guildId: String,
    prefix: String,
    name: String,
});

const serverModel = new mongoose.model('servers', serverSchema);

async function findServerPrefix({ guildId }) {
    const data = await serverModel.findOne({
        guildId,
    })
    .exec();

    return data?.prefix;
};

async function createOrUpdateServerPrefix({ guildId }, { prefix }) {
    const options = { upsert: true, new: true, setDefaultOnInsert: true };
    const update = { $set: { prefix } };

    await serverModel.findOneAndUpdate({
        guildId,
    }, update, options);
}

async function deleteMany({ guildId }) {
    await serverModel.deleteMany({
        guildId,
    });
}

const serverExport = {
    findServerPrefix,
    createOrUpdateServerPrefix,
    deleteMany,
};

export default serverExport;
