import fs from 'fs';

function prefixCommand(msg) {
    const serverProperties = JSON.parse(
        fs.readFileSync('./serverproperties.json')
    );
    const guildInfo = serverProperties.find(
        (item) => item.guildID === msg.guild.id
    );
    const currentPrefix = guildInfo.prefix === '' ? 'BLANK' : guildInfo.prefix;

    msg.reply(`the current prefix is \`${currentPrefix}\``);
}

function prefixChange(msg, query) {
    const serverProperties = JSON.parse(
        fs.readFileSync('./serverproperties.json')
    );
    const guildInfo = serverProperties.find(
        (item) => item.guildID === msg.guild.id
    );

    console.log('in prefixchange');

    if (query[1] === 'BLANK') {
        guildInfo.prefix = 'BLANK';

        msg.channel.send(
            `:white_check_mark: **Done!** set \`BLANK\` as the new prefix`
        );
    } else {
        guildInfo.prefix = query[1];

        msg.channel.send(
            `:white_check_mark: **Done!** set \`${guildInfo.prefix}\` as the new prefix`
        );
    }

    fs.writeFileSync('serverproperties.json', JSON.stringify(serverProperties));
}

export {prefixCommand, prefixChange};
