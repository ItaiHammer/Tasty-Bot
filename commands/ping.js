export default function (msg, query) {
    let doNotRespond = false;

    for (let i = 0; i < query.length; i++) {
        console.log('loop started');
        if (query[i] === '-r') {
            console.log('msg has -r');
            msg.content =
                msg.content.substr(0, msg.content.indexOf('-')) +
                msg.content.substr(msg.content.indexOf('-') + 2);

            query.splice(i, 1);
            doNotRespond = true;
        }
    }

    if (!doNotRespond) {
        msg.reply('pong');
    }
}
