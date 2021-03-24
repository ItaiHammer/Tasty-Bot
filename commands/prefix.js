import fs from 'fs';

function prefixCommand(msg) {
    const serverProperties = JSON.parse(
        fs.readFileSync('./serverproperties.json')
    );
    const guildInfo = serverProperties.find(
        (item) => item.guildID === msg.guild.id
    );
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

function prefixChange(msg, query) {
    const serverProperties = JSON.parse(
        fs.readFileSync('./serverproperties.json')
    );
    const guildInfo = serverProperties.find(
        (item) => item.guildID === msg.guild.id
    );

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

    fs.writeFileSync('serverproperties.json', JSON.stringify(serverProperties));
}

export { prefixCommand, prefixChange };
