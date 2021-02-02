export default async function setUpWebHooks(msg, client) {
    try {
        const channel = client.channels.cache.get(msg.channel.id);
        const webhooks = await channel.fetchWebhooks();
        const webhook = webhooks.first();

        if (webhook == null) {
            msg.channel.send('Setting up WebHooks for this channel...');

            channel
                .createWebhook(client.user.username, {
                    avatar: client.user.avatarURL()
                })
                .then((webhook) => console.log(`Created webhook ${webhook}`))
                .catch(console.error);
            msg.channel.send('DONE!');
        } else {
            msg.reply('webhooks are already setup');
        }
    } catch (error) {
        console.log(error);
    }
}
