import Discord from "discord.js";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import mongoose from "mongoose";

//files
import Guild from "./models/Guild.js";
import { createGuild, deleteGuild, changeGuildVar } from "./dataBase/Guild.js";
import {
  help,
  channelHelp,
  prefixCommand,
  prefixChange,
  setAdminRole,
  adminRole,
  ping,
  time,
  react,
  setUpWebHooks,
  botTalk,
  customBotTalk,
  createRole,
  deleteRole,
  addRole,
  tastyrun,
} from "./commands.js";

dotenv.config();
const token = process.env.TOKEN;
const client = new Discord.Client();

client.on("guildCreate", (guild) => {
  let adminRole;
  try {
    adminRole = guild.roles.cache.find((role) =>
      role.permissions.has("ADMINISTRATOR")
    ).name;
  } catch (error) {
    console.log(error);
    adminRole = "admin";
  }

  createGuild(guild.id, guild.name, "!", adminRole);

  let defaultChannel;
  const joinMessage = new Discord.MessageEmbed()
    .setColor("#7289DA")
    .setTitle(":hand_splayed:Hello! I am Tasty Bot!")
    .setDescription(
      `
    **-** If you need any help or just looking for commands you can use the \`!help\` command.
    **-** The current prefix is \`!\`.
    **-** To change the prefix you can use \`!prefixchange <New Prefix>\`.
    **-** To view the current prefix you can use \`@Tasty Bot prefix\`.
    **-** To make the bot instantly delete your command you can pur a -d in the end of your command \`!bottalk Hello World! -d\`.
    **-** To make the bot delete it's own response to your command put -d in the end of your command \`!bottalk Hello World! -r\`.
    **-** You can use shortcuts like \`$/s\` to insert a space in places you can't, \`$/tag\` to insert your full name and tag, and \`$/numtag\` to insert your tag into a command.
    **-** To for the bottalk command to work properly use \`!setupwebhooks\`.
    **-** Everyone who has Administrator permisions and or the admin role can use admin commands.
    **-** The current admin role is <@&${
      guild.roles.cache.find((role) => role.name === adminRole).id
    }>, to change the admin role use the \`!setadminrole <Role Name>\` command.
    **-** For any additional help, support, or for any bug reports you can go to the bot's github page at: https://github.com/ItaiHammer/Tasty-Bot`
    )
    .setImage(
      "https://images-ext-1.discordapp.net/external/pOg4UB3nzzWxeXPz_2UMAZ9flnNtHtSIRhaSC1mFxxo/https/cdn.discordapp.com/avatars/357204752817192963/016616d966561ad13d5354acbc56e676.webp"
    )
    .setFooter("Developed by Tasty#0487");

  guild.channels.cache.forEach((channel) => {
    if (channel.type === "text") {
      if (channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
        defaultChannel = channel;
      }
    }
  });

  defaultChannel.send(joinMessage);
});

client.on("guildDelete", (guild) => {
  deleteGuild(guild.id);
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async (msg) => {
  if (msg.channel.type === "dm") return;
  if (msg.author.bot === true) return;

  try {
    const guild = msg.guild;
    const serverProperties = await Guild.findOne({ guildID: guild.id });
    const prefix = serverProperties.prefix;
    const prefixLength = prefix === "BLANK" ? 0 : prefix.length;
    const botMention = "<@!796239687010091048>";

    //*USER VARS
    const name =
      msg.member.nickname == null ? msg.author.username : msg.member.nickname;

    //*MSG VARS
    let query = msg.content.includes(" ")
      ? msg.content.substr(prefixLength).split(" ")
      : msg.content.substr(prefixLength);
    let word = msg.content.includes(" ")
      ? query[0]
      : msg.content.substr(prefixLength, msg.content.length);

    //if it has a mention
    if (msg.content.substr(0, botMention.length) === botMention) {
      switch (query[1]) {
        case "prefix":
          prefixCommand(msg);
          break;
      }
    }

    //if it has the prefix
    if (!prefix === "BLANK" && !msg.content.substr(0, prefix.length) === prefix)
      return;

    for (let i = 0; i < query.length; i++) {
      if (query[i].substr(0, 1) === "-") {
        if (query[i] === "-d") {
          msg.delete();

          msg.content =
            msg.content.substr(0, msg.content.indexOf("-")) +
            msg.content.substr(msg.content.indexOf("-") + 2);

          query.splice(i, 1);
        }
      }
    }

    for (let i = 0; i < query.length; i++) {
      if (query[i].includes("$/")) {
        while (query[i].includes("$/s")) {
          query[i] = query[i].replace("$/s", " ");
        }
        while (query[i].includes("$/lf")) {
          query[i] = query[i].replace("$/lf", "( ͡° ͜ʖ ͡°)");
        }
        while (query[i].includes("$/tag")) {
          query[i] = query[i].replace("$/tag", msg.author.tag);
        }
        while (query[i].includes("$/numtag")) {
          query[i] = query[i].replace(
            "$/numtag",
            msg.author.tag.substr(msg.author.tag.length - 5)
          );
        }
      }
    }

    function manageCommands(keyWord, setQuery) {
      switch (keyWord) {
        case "help":
          help(msg, Discord, setQuery, prefix);
          break;
        case "adminrole":
          adminRole(msg, setQuery, msg.guild.id);
          break;
        case "ping":
          ping(msg, setQuery);
          break;
        case "time":
          time(msg, setQuery, prefix);
          break;
        case "react":
          react(msg);
          break;
        case "setupwebhooks":
          setUpWebHooks(msg, client, setQuery);
          break;
        case "bottalk":
          botTalk(msg, client, Discord, setQuery);
          break;
        case "tastyrun":
          tastyrun(msg, manageCommands);
          break;
      }

      //if member has the admin role
      if (
        !msg.member.roles.cache.some(
          (r) => r.name === serverProperties.adminRole
        ) &&
        !msg.member.permissions.has("ADMINISTRATOR")
      )
        return;

      switch (keyWord) {
        case "channelhelp":
          channelHelp(msg, Discord, setQuery, prefix);
          break;
        case "prefixchange":
          prefixChange(msg, setQuery);
        case "setadminrole":
          setAdminRole(setQuery, msg, prefix, msg.guild.id);
          break;
        case "custombottalk":
          customBotTalk(msg, client, Discord, setQuery);
          break;
        case "createrole":
          createRole(msg, setQuery, msg.guild.id);
          break;
        case "deleterole":
          deleteRole(msg, setQuery);
          break;
        // case 'addrole':
        //     console.log(msg.content);
        //     addRole(msg, setQuery, client);
        //     break;
      }
    }
    manageCommands(word, query);
  } catch (error) {
    if (msg.author.bot === false) {
      console.log(error);
      // msg.reply(`an error has accured, make sure you typed the command correctly. If you still need any more help you can use the ${prefix}help command.`);
    }
  }
});

client.login(token);
