import fs from 'fs';

function setAdminRole(query, msg, prefix) {
    const serverProperties = JSON.parse(
        fs.readFileSync('./serverproperties.json')
    );
    const guildInfo = serverProperties.find(
        (item) => item.guildID === msg.guild.id
    );

    let role = query[1];
    let errorMessage = `:x: **An Error has accured**, Please make sure you typed the command in this format: \`${prefix}setadminrole <Role Name>\` and wrote the role name correctly`;

    try {
        if (role === guildInfo.adminRole) {
            msg.channel.send(
                `:grey_question: \`${role}\` is already the admin role`
            );
        } else {
            if (msg.guild.roles.cache.some((r) => r.name === role)) {
                guildInfo.adminRole = role;
                fs.writeFileSync(
                    'serverproperties.json',
                    JSON.stringify(serverProperties)
                );

                msg.channel.send(
                    `:white_check_mark: **Done!** set \`${role}\` as admin role`
                );
            } else {
                msg.channel.send(errorMessage);
            }
        }
    } catch (err) {
        console.log(err);
        msg.channel.send(errorMessage);
    }
}

function adminRole(msg) {
    const serverProperties = JSON.parse(
        fs.readFileSync('serverproperties.json')
    );
    const guildInfo = serverProperties.find(
        (item) => item.guildID === msg.guild.id
    );

    msg.reply(`the admin role is \`${guildInfo.adminRole}\``);
}

export { setAdminRole, adminRole };
