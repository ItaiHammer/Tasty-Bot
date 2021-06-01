import mongoose from 'mongoose';

import Guild from '../models/Guild.js';

async function createGuild(guildID, guildName, prefix, adminRole) {
    const newGuild = new Guild({
        guildID,
        guildName,
        prefix,
        adminRole,
    });

    await newGuild.save();
}

async function deleteGuild(guildID) {
    const guild = await Guild.findOne({ guildID });
    guild.delete();
}

async function changeGuildVar(guildID, varName, varValue) {
    const guild = await Guild.findOne({ guildID });

    guild[varName] = varValue;

    guild.save();
}

export { createGuild, deleteGuild, changeGuildVar };
