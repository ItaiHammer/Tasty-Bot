import {Clock} from 'global-clock';

export default function (msg, query, prefix) {
    if (Array.isArray(query)) {
        try {
            msg.reply(
                `The time in ${
                    query[1].substr(0, 1).toUpperCase() + query[1].substr(1)
                } is ${Clock.getTime(query[1])}`
            );
        } catch (err) {
            msg.channel.send(
                `:x: **An Error has accured**, Please make sure you typed the command in this format: \`${prefix}time <Time Zone>\` and wrote a valid time zone`
            );
        }
    } else {
        msg.reply(Clock.getTime());
    }
}
