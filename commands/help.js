import fs from 'fs';

function help(msg, Discord, query, prefix) {
    const commands = JSON.parse(fs.readFileSync('./commands.json'));

    if (query.length === 1 || query.constructor() !== Array) {
        let help = new Discord.MessageEmbed().setTitle('List of Commands:');

        for (let i = 0; i < commands.length; i++) {
            help.addFields({
                name: '.',
                value: `${commands[i].read} ${commands[i].permissions} - ${commands[i].description}`
            });
        }

        help.addFields({
            name: '.',
            value: `If you need any additional help you can go to the bot's github page: https://github.com/ItaiHammer/Tasty-Bot`
        });

        msg.author.send(help);
    } else if (query.length === 2) {
        let help = new Discord.MessageEmbed().setTitle('List of Commands:');

        for (let i = 0; i < commands.length; i++) {
            if (commands[i].permissions === '@' + query[1]) {
                help.addFields({
                    name: '.',
                    value: `${commands[i].read} ${commands[i].permissions} - ${commands[i].description}`
                });
            }
        }

        help.addFields({
            name: '.',
            value: `If you need any additional help you can go to the bot's github page: https://github.com/ItaiHammer/Tasty-Bot`
        });

        msg.author.send(help);
    } else {
        msg.channel.send(
            `:x: **An Error has accured**, Please make sure you typed the command in this format: \`${prefix}help <Optional: Rank Name>\` and wrote the rank name correctly`
        );
    }
}

function channelHelp(msg, Discord, query, prefix) {
    const commands = JSON.parse(fs.readFileSync('./commands.json'));

    console.log(query);

    if (query.length === 1) {
        let help = new Discord.MessageEmbed().setTitle('List of Commands:');

        for (let i = 0; i < commands.length; i++) {
            help.addFields({
                name: '.',
                value: `${commands[i].read} ${commands[i].permissions} - ${commands[i].description}`
            });
        }

        help.addFields({
            name: '.',
            value: `If you need any additional help you can go to the bot's github page: https://github.com/ItaiHammer/Tasty-Bot`
        });

        msg.channel.send(help);
    } else if (query.length === 2) {
        let help = new Discord.MessageEmbed().setTitle('List of Commands:');

        for (let i = 0; i < commands.length; i++) {
            if (commands[i].permissions === '@' + query[1]) {
                help.addFields({
                    name: '.',
                    value: `${commands[i].read} ${commands[i].permissions} - ${commands[i].description}`
                });
            }
        }

        help.addFields({
            name: '.',
            value: `If you need any additional help you can go to the bot's github page: https://github.com/ItaiHammer/Tasty-Bot`
        });

        msg.channel.send(help);
    } else {
        msg.channel.send(
            `:x: **An Error has accured**, Please make sure you typed the command in this format: \`${prefix}help <Optional: Rank Name>\` and wrote the rank name correctly`
        );
    }
}

export {help, channelHelp};
