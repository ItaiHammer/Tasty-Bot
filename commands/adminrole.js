import fs from 'fs';

function setAdminRole(query, msg, prefix, guildID) {
    const serverProperties = JSON.parse(
        fs.readFileSync('./serverproperties.json')
    );
    const guildInfo = serverProperties.find((item) => item.guildID === guildID);

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

    let role = query[1];
    let errorMessage = `:x: **An Error has accured**, Please make sure you typed the command in this format: \`${prefix}setadminrole <Role Name>\` and wrote the role name correctly`;

    try {
        if (role === guildInfo.adminRole) {
            if (!doNotRespond) {
                msg.channel.send(
                    `:grey_question: \`${role}\` is already the admin role`
                );
            }
        } else {
            if (msg.guild.roles.cache.some((r) => r.name === role)) {
                guildInfo.adminRole = role;
                fs.writeFileSync(
                    'serverproperties.json',
                    JSON.stringify(serverProperties)
                );

                if (!doNotRespond) {
                    msg.channel.send(
                        `:white_check_mark: **Done!** set \`${role}\` as admin role`
                    );
                }
            } else {
                if (!doNotRespond) {
                    msg.channel.send(errorMessage);
                }
            }
        }
    } catch (err) {
        console.log(err);
        if (!doNotRespond) {
            msg.channel.send(errorMessage);
        }
    }
}

function adminRole(msg, query, guildID) {
    const serverProperties = JSON.parse(
        fs.readFileSync('serverproperties.json')
    );
    const guildInfo = serverProperties.find((item) => item.guildID === guildID);

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
        msg.reply(`the admin role is \`${guildInfo.adminRole}\``);
    }
}

export { setAdminRole, adminRole };
