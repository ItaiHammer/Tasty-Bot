async function botTalk(msg, client, Discord) {
    msg.content = msg.content.substring(8, msg.content.length);

    if (msg.content.includes('-')) {
        msg.content =
            msg.content.substr(0, msg.content.lastIndexOf('-')) +
            msg.content.substr(msg.content.lastIndexOf('-') + 2);
    }

    const channel = client.channels.cache.get(msg.channel.id);
    const webhooks = await channel.fetchWebhooks();
    const webhook = webhooks.first();

    try {
        // for (let i = 0; i < emojis.length; i++) {
        //     if (msg.content.includes(emojis[i].read)) {
        //         msg.content = msg.content.replace(
        //             emojis[i].read,
        //             emojis[i].write
        //         );
        //     }
        // }

        webhook.send(msg.content, {
            username: msg.author.username,
            avatarURL: msg.author.avatarURL()
        });
    } catch (error) {
        const embed = new Discord.MessageEmbed();
        embed.setTitle('Error');
        embed.setColor(msg.member.displayColor);
        embed.setDescription(
            `Make sure the you typed the command in this format: [prefix]bottalk <text>, if it still doesn't work make sure the bot set webhooks in the channel by using the command: [prefix]setwebhooks`
        );

        msg.reply(embed);
        console.log(error);
    }
}

async function customBotTalk(msg, client, Discord) {
    try {
        msg.content = msg.content.substring(14, msg.content.length);

        if (msg.content.includes('-')) {
            msg.content =
                msg.content.substr(0, msg.content.lastIndexOf('-')) +
                msg.content.substr(msg.content.lastIndexOf('-') + 2);
        }

        const tempPfp = msg.content.substring(
            msg.content.indexOf('-p') + 3,
            msg.content.indexOf('-n') - 1
        );
        const tempName = msg.content.substring(
            msg.content.indexOf('-n') + 3,
            msg.content.indexOf('-t') - 1
        );
        const tempText = msg.content.substring(
            msg.content.indexOf('-t') + 3,
            msg.content.length
        );

        const channel = client.channels.cache.get(msg.channel.id);
        const webhooks = await channel.fetchWebhooks();
        const webhook = webhooks.first();

        // for (let i = 0; i < emojis.length; i++ ) {
        //     if (msg.content.includes(emojis[i].read)) {
        //         tempText = msg.content.replace(emojis[i].read, emojis[i].write);
        //     }
        // }

        webhook.send(tempText, {
            username: tempName,
            avatarURL: tempPfp
        });
    } catch (error) {
        const embed = new Discord.MessageEmbed();
        embed.setTitle('Error');
        embed.setColor(msg.member.displayColor);
        embed.setDescription(
            `Make sure the image link you provided is valid that you got the spacing right and the you put it in this format: [prefix]custombottalk -p <link to image> -n <name> -t <text>, if it still doesn't work make sure the bot set webhooks in the channel by using the command: [prefix]setwebhooks`
        );

        msg.reply(embed);
    }
}

export {botTalk, customBotTalk};
