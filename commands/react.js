export default function react(msg, query) {
    msg.channel.messages.fetch(query[1]).then((message) => {
        message.react(query[2]);
    });
}
