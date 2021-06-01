import mongoose from 'mongoose';

let guildSchema = mongoose.Schema({
    guildID: {
        type: String,
        required: true,
    },
    guildName: {
        type: String,
        required: true,
    },
    prefix: {
        type: String,
        required: true,
    },
    adminRole: {
        type: String,
        required: true,
    },
});

export default mongoose.model('Guild', guildSchema);
