const Discord = require('discord.js');
const botdata = require('../database/models/botlist/bots.js');
const serverdata = require('../database/models/servers/server.js');
const config = require('../../config.js');
const serverid = config.server.id;
const roles = config.server.roles;
const channels = config.server.channels;
const owner = config.bot.owners;

module.exports.run = async (client, message, args) => {
  let guild = client.guilds.cache.get(config.server.id)
  if (guild.members.cache.has(message.author.id)) {
    const botsdata = await botdata.find();
    var botsdata1 = botsdata
      .sort((a, b) => b.votes - a.votes)
      .slice(0, 6)
      .map(
        a => `${a.username} **[ \`${a.votes}\` Votes ]**`
      )
      .join('\n');

    const serversdata = await serverdata.find();
    var serversdata1 = serversdata
      .sort((a, b) => b.votes - a.votes)
      .slice(0, 6)
      .map(
        a => `${a.name} | ${a.id} **[ \`${a.votes}\` Votes ]**`
      )
      .join('\n');

    if (!serversdata1) {
      var serversdata1 = 'no servers';
    }
    if (!botsdata1) {
      var botsdata1 = 'no bots';
    }

    const embed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
      .setColor("#7289da")
      .setDescription(`**Top 6 voted bots of the week!**\n${botsdata1}\n\n**Top 6 voted servers of the week!**\n${serversdata1}`)
    message.channel.send(embed)
  }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
};

exports.help = {
  name: "topvoted",
  description: "Get top voted bots/servers",
  usage: ""
};