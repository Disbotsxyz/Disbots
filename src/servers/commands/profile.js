const Discord = require('discord.js')
const disbots = require("disbots-xyz");
const botdata = require("../../database/models/botlist/bots.js")
const serverdata = require("../../database/models/servers/server.js");
const pdata = require("../../database/models/profile.js");

module.exports.run = async (client, message, args) => {
  if (args[0]) {
  var users = message.mentions.users.first()
  let x = await botdata.find();
  let bots = await x.filter(a => a.ownerID ==users.id || a.coowners.includes(users.id))
  let y = await serverdata.find();
  let pd = await serverdata.find({ userID: users.id })
  let servers = await y.filter(b => b.ownerID == users.id)
  let pdatas = await pd.filter(ps => ps.userID == users.id)
  const embed = new Discord.MessageEmbed()
    .setTitle('Profile')
    .setAuthor(users.tag, users.avatarURL({ dynamic: true }))
    .setDescription(`\n[Click to View your Profile!](https://disbots.xyz/user/${users.id})\n\n**Analytics**\n You own **${bots.length || "0"} Bots** and **${servers.length} Servers**`)
    .setColor("#7289da")
    .addField("Bots [" + bots.length + "]", `${!bots ? "" : bots.map(a => "<@" + a.botID + ">  **[**[View " + a.username + "](https://disbots.xyz/bot/" + a.botID + ")**]**").join("\n")}\n\n **Servers [${servers.length}]** \n${!servers ? "" : servers.map(b => b.name + " **[**[View " + b.name + "](https://disbots.xyz/server/" + b.id + ")**]**").join("\n")}`, true)
  .setThumbnail(users.avatarURL({ dynamic: true }))
  message.channel.send(embed)
  }
  if (!args[0]) {
  var users = message.author
  let x = await botdata.find();
  let bots = await x.filter(a => a.ownerID ==users.id || a.coowners.includes(users.id))
  let y = await serverdata.find();
  let pd = await serverdata.find({ userID: users.id })
  let servers = await y.filter(b => b.ownerID == users.id)
  let pdatas = await pd.filter(ps => ps.userID == users.id)
  const embed = new Discord.MessageEmbed()
    .setTitle('Profile')
    .setAuthor(users.tag, users.avatarURL({ dynamic: true }))
    .setDescription(`\n[Click to View your Profile!](https://disbots.xyz/user/${users.id})\n\n**Analytics**\n You own **${bots.length || "0"} Bots** and **${servers.length} Servers**`)
    .setColor("#7289da")
    .addField("Bots [" + bots.length + "]", `${!bots ? "" : bots.map(a => "<@" + a.botID + ">  **[**[View " + a.username + "](https://disbots.xyz/bot/" + a.botID + ")**]**").join("\n")}\n\n **Servers [${servers.length}]** \n${!servers ? "" : servers.map(b => b.name + " **[**[View " + b.name + "](https://disbots.xyz/server/" + b.id + ")**]**").join("\n")}`, true)
    .setThumbnail(users.avatarURL({ dynamic: true }))
  message.channel.send(embed)
}};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
};

exports.help = {
  name: "profile",
  description: "",
  usage: ""
};