import Guild from '../models/Guild.js';

async function prefixCommand(msg) {
    const guildInfo = await Guild.findOne({ guildID: msg.guild.id });
    const currentPrefix = guildInfo.prefix === '' ? 'BLANK' : guildInfo.prefix;

    let doNotRespond = false;

    for (let i = 0; i < query.length; i++) {
        if (query[i] === '-r') {
            msg.content =
                msg.content.substr(0, msg.content.indexOf('-')) +
                msg.content.substr(msg.content.indexOf('-') + 2);

            query.splice(i, 1);
            doNotRespond = true;
        }
    }

    if (!doNotRespond) {
        msg.reply(`the current prefix is \`${currentPrefix}\``);
    }
}

async function prefixChange(msg, query) {
    let doNotRespond = false;
    const guildInfo = await Guild.findOne({ guildID: msg.guild.id });

    for (let i = 0; i < query.length; i++) {
        if (query[i] === '-r') {
            msg.content =
                msg.content.substr(0, msg.content.indexOf('-')) +
                msg.content.substr(msg.content.indexOf('-') + 2);

            query.splice(i, 1);
            doNotRespond = true;
        }
    }

    if (query[1] === 'BLANK') {
        guildInfo.prefix = 'BLANK';

        if (!doNotRespond) {
            msg.channel.send(
                `:white_check_mark: **Done!** set \`BLANK\` as the new prefix`
            );
        }
    } else {
        guildInfo.prefix = query[1];

        if (!doNotRespond) {
            msg.channel.send(
                `:white_check_mark: **Done!** set \`${guildInfo.prefix}\` as the new prefix`
            );
        }
    }

    guildInfo.save();
}

export { prefixCommand, prefixChange };
