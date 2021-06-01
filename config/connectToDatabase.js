import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import config from 'config';

export default async function () {
    let mongoURI = config.get('mongoURI');

    while (mongoURI.includes('<password>')) {
        mongoURI = mongoURI.replace('<password>', process.env.MONGO_PASS);
    }
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: false,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log('MongoDb is connected');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
