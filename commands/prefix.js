import fs from 'fs';

function prefixCommand(msg) {
    const serverProperties = JSON.parse(
        fs.readFileSync('./serverproperties.json')
    );
    const guildInfo = serverProperties.find(
        (item) => item.guildID === msg.guild.id
    );

    msg.reply(`the current prefix is \`${guildInfo.prefix}\``);
}

function prefixChange(msg, query) {
    const serverProperties = JSON.parse(
        fs.readFileSync('./serverproperties.json')
    );
    const guildInfo = serverProperties.find(
        (item) => item.guildID === msg.guild.id
    );

    guildInfo.prefix = query[1];

    fs.writeFileSync('serverproperties.json', JSON.stringify(serverProperties));

    msg.channel.send(
        `:white_check_mark: **Done!** set \`${guildInfo.prefix}\` as the new prefix`
    );
}

export { prefixCommand, prefixChange };
