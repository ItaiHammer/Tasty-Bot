async function botTalk(msg, client, Discord) {
    msg.content = msg.content.substring(8, msg.content.length);

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

        function getPosition(string, subString, index) {
            return string.split(subString, index).join(subString).length;
        }

        const tempPfp = msg.content.split(' ')[1];
        let tempName = msg.content.split(' ')[2].replace(/,/g, ' ');
        const tempText = msg.content.substr(getPosition(msg.content, ' ', 3));

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

        console.log(error);
    }
}

export {botTalk, customBotTalk};
