import { query } from 'express';

async function botTalk(msg, client, Discord, query) {
    msg.content = msg.content.substring(8, msg.content.length);

    const channel = client.channels.cache.get(msg.channel.id);
    const webhooks = await channel.fetchWebhooks();
    const webhook = webhooks.first();

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

    try {
        // for (let i = 0; i < emojis.length; i++) {
        //     if (msg.content.includes(emojis[i].read)) {
        //         msg.content = msg.content.replace(
        //             emojis[i].read,
        //             emojis[i].write
        //         );
        //     }
        // }

        if (!doNotRespond) {
            webhook.send(msg.content, {
                username: msg.author.username,
                avatarURL: msg.author.avatarURL(),
            });
        }
    } catch (error) {
        const embed = new Discord.MessageEmbed();
        embed.setTitle('Error');
        embed.setColor(msg.member.displayColor);
        embed.setDescription(
            `Make sure the you typed the command in this format: [prefix]bottalk <text>, if it still doesn't work make sure the bot set webhooks in the channel by using the command: [prefix]setupwebhooks`
        );

        msg.reply(embed);
        console.log(error);
    }
}

async function customBotTalk(msg, client, Discord, query) {
    try {
        msg.content = msg.content.substring(14, msg.content.length);

        function getPosition(string, subString, index) {
            return string.split(subString, index).join(subString).length;
        }

        const tempPfp = query[1];
        let tempName = query[2];
        const tempText = msg.content.substr(getPosition(msg.content, ' ', 3));

        const channel = client.channels.cache.get(msg.channel.id);
        const webhooks = await channel.fetchWebhooks();
        const webhook = webhooks.first();

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

        // for (let i = 0; i < emojis.length; i++ ) {
        //     if (msg.content.includes(emojis[i].read)) {
        //         tempText = msg.content.replace(emojis[i].read, emojis[i].write);
        //     }
        // }

        if (!doNotRespond) {
            webhook.send(tempText, {
                username: tempName,
                avatarURL: tempPfp,
            });
        }
    } catch (error) {
        const embed = new Discord.MessageEmbed();
        embed.setTitle('Error');
        embed.setColor(msg.member.displayColor);
        embed.setDescription(
            `Make sure the image link you provided is valid that you got the spacing right and the you put it in this format: [prefix]custombottalk -p <link to image> -n <name> -t <text>, if it still doesn't work make sure the bot set webhooks in the channel by using the command: [prefix]setupwebhooks`
        );

        msg.reply(embed);

        console.log(error);
    }
}

export { botTalk, customBotTalk };
