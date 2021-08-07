const Discord = require('discord.js');
const client = new Discord.Client();
const bot = new Discord.Client();
const config = require("../../config.js");
const { Client, Util } = require('discord.js');
const botsdata = require("../database/models/botlist/bots.js");
const disbots = require("disbots-xyz");
const parseMilliseconds = require("parse-ms")
const { MessageButton } = require("discord-buttons");

module.exports.run = async (client, message, args) => {
  var bot = message.mentions.users.first()
  if (bot) {
    var bot = bot;
  } else {
    var bot = args[0];
    var bot = client.users.cache.get(bot)
  }
  if (!bot) {
        const embed = new Discord.MessageEmbed()
      .setDescription(`<:notcheck:853262343790526495> *You have given an invalid bot ID or mention.*\n<:check:853262343949254696> **Ex.** *d!votebot @bot or 123456789123456789*`)
       .setColor("#7289da")
      return message.channel.send(embed)
  }
  try {
  const votes = require("../database/models/botlist/vote.js");
  let botdata = await botsdata.findOne({ botID: bot.id });
  if (!botdata) {
    return message.channel.send("Not a bot");
  }
  let x = await votes.findOne({ user: message.author.id, bot: bot.id })
  var timeleft = await parseMilliseconds(x.ms - (Date.now() - x.Date));
  var hour = timeleft.hours;
  var minutes = timeleft.minutes;
  var seconds = timeleft.seconds;
    if (hour > 0) {
      return await message.channel.send(`You can vote again in ${hour}h ${minutes}m ${seconds}s`);
    }} catch (e) {
    const votes = require("../database/models/botlist/vote.js");
    let botdata = await botsdata.findOne({ botID: bot.id });
    await votes.findOneAndUpdate({ bot: bot.id, user: message.author.id }, { $set: { Date: Date.now(), ms: 43200000 } }, { upsert: true })
    await botsdata.findOneAndUpdate({ botID: bot.id }, { $inc: { votes: 1 } })
    client.channels.cache.get("859637442499969074").send(`**${botdata.username}** just got **+1 Vote** from **${message.author.username}** **\`(Total Votes ${botdata.votes + 1})\`**`)
    let web = new MessageButton()
      .setLabel("Visit bot page")
      .setStyle("url")
      .setURL("https://disbots.xyz/bot/"+botdata.botID)
    const vote = new Discord.MessageEmbed()
    .setTitle("Voted")
    .setColor("GREEN")
    .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
    .setDescription(`You have successfully voted for bot **${botdata.username}**.`)
    .setImage('https://cdn.discordapp.com/attachments/832615475878821939/863623417025527808/Vote.jpg')
    message.channel.send({ embed: vote, buttons: [ web ] })
  if (hour <= 0) {
  const votes = require("../database/models/botlist/vote.js");
  let botdata = await botsdata.findOne({ botID: bot.id });
  await votes.findOneAndUpdate({ bot: bot.id, user: message.author.id }, { $set: { Date: Date.now(), ms: 43200000 } }, { upsert: true })
  await botsdata.findOneAndUpdate({ botID: bot.id }, { $inc: { votes: 1 } })
  client.channels.cache.get("859637442499969074").send(`**${botdata.username}** just got **+1 Vote** from **${message.author.username}** **\`(Total Votes ${botdata.votes + 1})\`**`)
  let web = new MessageButton()
    .setLabel("Visit bot page")
    .setStyle("url")
    .setURL("https://disbots.xyz/bot/"+botdata.botID)
  const vote = new Discord.MessageEmbed()
	.setTitle("Voted")
	.setColor("GREEN")
	.setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
  .setDescription(`You have successfully voted for bot **${botdata.username}**.`)
  .setImage('https://cdn.discordapp.com/attachments/832615475878821939/863623417025527808/Vote.jpg')
  message.channel.send({ embed: vote, buttons: [ web ] })
  var votedbot = client.users.cache.get(botdata.botID);
  if (botdata.dcwebhook) {
    const webhook = require("webhook-discord");
    const Hook = new webhook.Webhook(botdata.dcwebhook);
    const msg = new webhook.MessageBuilder()
      .setName("Disbots Bot List Discord Webhooks")
      .setAvatar("https://cdn.discordapp.com/icons/852825880271257611/bf26f2b197897f38db173afb9b73a22e.webp?size=256")
      .setTitle(`${votedbot.username} Has just been Voted!!`)
      .setDescription(`Voter: ${message.author.username} Bot: ${votedbot.username} Total Votes: ${botdata.votes + 1}`)
      .setFooter(`Discord Default Webhook`)
      .setThumbnail(votedbot.displayAvatarURL)
    if (botdata.backURL)
      Hook.send(msg);
  }}
  if (botdata.webhook) {
    const fetch = require("node-fetch");
    fetch(botdata.webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "user": `${message.author.username}`,
        "bot": `${votedbot.username}`,
        "votes": `${botdata.votes + 1}`,
        "userid": `${message.author.id}`
      }),
    })
  }
}}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["v","v-b"],
};

exports.help = {
  name: "votebot",
  description: "Votes the bot",
  usage: ""
};