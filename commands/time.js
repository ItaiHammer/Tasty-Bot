import { Clock } from 'global-clock';

export default function (msg, query, prefix) {
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

    if (Array.isArray(query)) {
        try {
            if (!doNotRespond) {
                msg.reply(
                    `The time in ${
                        query[1].substr(0, 1).toUpperCase() + query[1].substr(1)
                    } is ${Clock.getTime(query[1])}`
                );
            }
        } catch (err) {
            if (!doNotRespond) {
                msg.channel.send(
                    `:x: **An Error has accured**, Please make sure you typed the command in this format: \`${prefix}time <Time Zone>\` and wrote a valid time zone`
                );
            }
        }
    } else {
        msg.reply(Clock.getTime());
    }
}
