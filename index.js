import Discord from 'discord.js';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

import {
    help,
    channelHelp,
    prefixCommand,
    prefixChange,
    setAdminRole,
    adminRole,
    ping
} from './commands.js';

const __dirname = path.resolve(path.dirname(''));
dotenv.config();
const token = process.env.TOKEN;
const client = new Discord.Client();

console.log(token);

client.on('guildCreate', (guild) => {
    const serverProperties = JSON.parse(
        fs.readFileSync('./serverproperties.json')
    );
    let adminRole;
    try {
        adminRole = guild.roles.cache.find((role) =>
            role.permissions.has('ADMINISTRATOR')
        ).name;
    } catch (error) {
        console.log(error);
        adminRole = 'admin';
    }

    serverProperties.push({
        guildName: guild.name,
        guildID: guild.id,
        prefix: '!',
        adminRole: adminRole
    });

    fs.writeFileSync('serverproperties.json', JSON.stringify(serverProperties));

    let defaultChannel;
    const joinMessage = new Discord.MessageEmbed()
        .setColor('#7289DA')
        .setTitle(':hand_splayed:Hello! I am Tasty Bot!')
        .setDescription(
            `
    **-** If you need any help or just looking for commands you can use the \`!help\` command.
    **-** The current prefix is \`!\`.
    **-** To change the prefix you can use \`!prefixchange <New Prefix>\`.
    **-** To view the current prefix you can use \`@Tasty Bot prefix\`.
    **-** Everyone who has Administrator permisions and or the admin role can use admin commands.
    **-** The current admin role is <@&${
        guild.roles.cache.find((role) => role.name === adminRole).id
    }>, to change the admin role use the \`!setadminrole <Role Name>\` command.
    **-** For any additional help, support, or for any bug reports you can go to the bot's github page at: https://github.com/ItaiHammer/Tasty-Bot`
        )
        .setImage(
            'https://images-ext-1.discordapp.net/external/pOg4UB3nzzWxeXPz_2UMAZ9flnNtHtSIRhaSC1mFxxo/https/cdn.discordapp.com/avatars/357204752817192963/016616d966561ad13d5354acbc56e676.webp'
        )
        .setFooter('Developed by Tasty#0487');

    guild.channels.cache.forEach((channel) => {
        if (channel.type === 'text') {
            if (channel.permissionsFor(guild.me).has('SEND_MESSAGES')) {
                defaultChannel = channel;
            }
        }
    });

    defaultChannel.send(joinMessage);
});

client.on('guildDelete', (guild) => {
    const serverProperties = JSON.parse(
        fs.readFileSync('./serverproperties.json')
    );
    let index;
    const guildIndex = serverProperties.findIndex(
        (item) => item.guildID === guild.id
    );

    serverProperties.splice(guildIndex, 1);

    fs.writeFileSync('serverproperties.json', JSON.stringify(serverProperties));
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {
    if (msg.channel.type === 'dm') return;
    if (msg.author.bot === true) return;

    try {
        const guild = msg.guild;
        const serverProperties = JSON.parse(
            fs.readFileSync('./serverproperties.json')
        );
        const guildIndex = serverProperties.find(
            (item) => item.guildID === guild.id
        );
        const prefix = guildIndex.prefix;
        const prefixLength = prefix === 'BLANK' ? 0 : prefix.length;
        const botMention = '<@!796239687010091048>';

        //*USER VARS
        const name =
            msg.member.nickname == null
                ? msg.author.username
                : msg.member.nickname;

        //*MSG VARS
        let query = msg.content.includes(' ')
            ? msg.content.substr(prefixLength).split(' ')
            : msg.content.substr(prefixLength);
        let keyWord = msg.content.includes(' ')
            ? query[0]
            : msg.content.substr(prefixLength, msg.content.length);

        //if it has a mention
        if (msg.content.substr(0, botMention.length) === botMention) {
            switch (query[1]) {
                case 'prefix':
                    prefixCommand(msg);
                    break;
            }
        }

        //if it has the prefix
        if (
            !prefix === 'BLANK' &&
            !msg.content.substr(0, prefix.length) === prefix
        )
            return;

        switch (keyWord) {
            case 'help':
                help(msg, Discord, query, prefix);
                break;
            case 'adminrole':
                adminRole(msg);
                break;
            case 'ping':
                ping(msg);
                break;
        }

        //if member has the admin role
        if (
            !msg.member.roles.cache.some(
                (r) => r.name === guildIndex.adminRole
            ) &&
            !msg.member.permissions.has('ADMINISTRATOR')
        )
            return;

        switch (keyWord) {
            case 'channelhelp':
                channelHelp(msg, Discord, query, prefix);
                break;
            case 'prefixchange':
                prefixChange(msg, query);
            case 'setadminrole':
                setAdminRole(query, msg, prefix);
                break;
        }
    } catch (error) {
        if (msg.author.bot === false) {
            console.log(error);
            // msg.reply(`an error has accured, make sure you typed the command correctly. If you still need any more help you can use the ${prefix}help command.`);
        }
    }
});

client.login(token);
