import fs from 'fs';

function help(msg, Discord, query, prefix) {
    const commands = JSON.parse(fs.readFileSync('./commands.json'));

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

    if (query.length === 1 || query.constructor() !== Array) {
        let help = new Discord.MessageEmbed().setTitle('List of Commands:');

        for (let i = 0; i < commands.length; i++) {
            help.addFields({
                name: '.',
                value: `${commands[i].read} ${commands[i].permissions} - ${commands[i].description}`,
            });
        }

        help.addFields({
            name: '.',
            value: `If you need any additional help you can go to the bot's github page: https://github.com/ItaiHammer/Tasty-Bot`,
        });

        if (!doNotRespond) {
            msg.author.send(help);
        }
    } else if (query.length === 2) {
        let help = new Discord.MessageEmbed().setTitle('List of Commands:');

        for (let i = 0; i < commands.length; i++) {
            if (commands[i].permissions === '@' + query[1]) {
                help.addFields({
                    name: '.',
                    value: `${commands[i].read} ${commands[i].permissions} - ${commands[i].description}`,
                });
            }
        }

        help.addFields({
            name: '.',
            value: `If you need any additional help you can go to the bot's github page: https://github.com/ItaiHammer/Tasty-Bot`,
        });

        if (!doNotRespond) {
            msg.author.send(help);
        }
    } else {
        if (!doNotRespond) {
            msg.channel.send(
                `:x: **An Error has accured**, Please make sure you typed the command in this format: \`${prefix}help <Optional: Rank Name>\` and wrote the rank name correctly`
            );
        }
    }
}

function channelHelp(msg, Discord, query, prefix) {
    const commands = JSON.parse(fs.readFileSync('./commands.json'));

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

    if (query.length === 1 || query.length > 2) {
        let help = new Discord.MessageEmbed().setTitle('List of Commands:');

        for (let i = 0; i < commands.length; i++) {
            help.addFields({
                name: '.',
                value: `${commands[i].read} ${commands[i].permissions} - ${commands[i].description}`,
            });
        }

        help.addFields({
            name: '.',
            value: `If you need any additional help you can go to the bot's github page: https://github.com/ItaiHammer/Tasty-Bot`,
        });

        if (!doNotRespond) {
            msg.channel.send(help);
        }
    } else if (query.length === 2) {
        let help = new Discord.MessageEmbed().setTitle('List of Commands:');

        for (let i = 0; i < commands.length; i++) {
            if (commands[i].permissions === '@' + query[1]) {
                help.addFields({
                    name: '.',
                    value: `${commands[i].read} ${commands[i].permissions} - ${commands[i].description}`,
                });
            }
        }

        help.addFields({
            name: '.',
            value: `If you need any additional help you can go to the bot's github page: https://github.com/ItaiHammer/Tasty-Bot`,
        });

        if (!doNotRespond) {
            msg.channel.send(help);
        }
    } else {
        if (!doNotRespond) {
            msg.channel.send(
                `:x: **An Error has accured**, Please make sure you typed the command in this format: \`${prefix}channelhelp <Optional: Rank Name>\` and wrote the rank name correctly`
            );
        }
    }
}

export { help, channelHelp };
