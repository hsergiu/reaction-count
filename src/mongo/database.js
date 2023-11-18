import mongoose from 'mongoose';

export async function connect(host, username, password) {
    await mongoose.connect(
        `mongodb://${username}:${password}@${host}:27017/admin`
        , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000
    });
}
