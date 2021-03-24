export default async function setUpWebHooks(msg, client, query) {
    try {
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

        if (webhook == null) {
            if (!doNotRespond) {
                msg.channel.send('Setting up WebHooks for this channel...');
            }

            channel
                .createWebhook(client.user.username, {
                    avatar: client.user.avatarURL(),
                })
                .then((webhook) => console.log(`Created webhook ${webhook}`))
                .catch(console.error);
            if (!doNotTrack) {
                msg.channel.send('DONE!');
            }
        } else {
            if (!doNotRespond) {
                msg.reply('webhooks are already setup');
            }
        }
    } catch (error) {
        console.log(error);
    }
}
