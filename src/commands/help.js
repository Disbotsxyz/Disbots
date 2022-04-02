const Discord = require('discord.js');
const client = new Discord.Client();
const bot = new Discord.Client();
const cmds=require("./cmds.json")
const { Client, Util } = require('discord.js');

cmdss={
    "botinfo": {
      usage: "<SET_YOUR_PREFIX_HERE>botinfo <id>",
      longDescription: `Shows all info on a list bot`
    },
    "bots": {
      usage: `<SET_YOUR_PREFIX_HERE>bots`,
      longDescription: `shows all bots you have in the server`
    },
    "botvote": {
      usage: `<SET_YOUR_PREFIX_HERE>votebot <id/mention>`,
      longDescription: `votes mentioned bot on dislist`
    }
  }
exports.run = async (client, message, args) => {
  if(args==""){
    args=null
  }
  if(args==null){
    const embed=new Discord.MessageEmbed()
    embed.setTitle("Bot List Help");
    for(const i in cmds){
      embed.addField(i, cmds[i].shortDescription, false)
    }
    await message.channel.send(embed)
  }
  else {
    command=args.join(" ").toLowerCase();
    embed=new Discord.MessageEmbed();
    embed.setTitle("BotVote")
    embed.addField("Usage", cmds[command].usage, false)
    embed.addField("Description", cmds[command].longDescription, false)
    await message.channel.send(embed)
  }
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
};

exports.help = {
  name: "help",
  description: "",
  usage: ""
};
