const Discord=require("discord.js")
const {MessageButton} = require("discord-buttons")
const { registerFont, createCanvas } = require('canvas');
const serverData = require("../../database/models/servers/server.js");

exports.run=async (client, message, args) => {
  const Embed=new Discord.MessageEmbed();
  Embed.setTitle("Server List Help");
  Embed.addField("Bump", "Bumps your server in the list [<SET_YOUR_PREFIX_HERE>bump]", false)
  Embed.addField("Link", "Sends link of server + info [<SET_YOUR_PREFIX_HERE>link]", false)
  Embed.addField("profile", "Shows your Disbots.xyz profile [<SET_YOUR_PREFIX_HERE>profile @user]", false)
  Embed.addField("Vote", "Votes your server on Disbots.xyz [<SET_YOUR_PREFIX_HERE>vote]", false)
  await message.channel.send(Embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["commands"],
};

exports.help = {
  name: "help",
  description: "shows commands",
  usage: "sl.help"
};
