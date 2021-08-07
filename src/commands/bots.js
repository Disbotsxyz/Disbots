const disbots = require("disbots-xyz");
const Discord = require('discord.js')
const botdata = require("../database/models/botlist/bots.js")
module.exports.run = async (client,message,args) => {
   let x = await botdata.find();
   
   let bots = await x.filter(a => a.ownerID == message.author.id || a.coowners.includes(message.author.id))
   const embedsearch = new Discord.MessageEmbed()
   .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
   .setDescription(`<:blurple_search:853259976834547723> *Searching your account*\n\n<:blurple_support:853259976767176704> *This may take a second be patient*`)
   .setColor("#7289da")
   esitthis = await message.channel.send(embedsearch)
   await sleep(3000)
   const embed = new Discord.MessageEmbed()
   .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
   .setDescription(`<:blurple_search:853259976834547723> *Searched Your account*\n\n*You Own* \`\`${bots.length}\`\` *Discord Bot(s) in Disbots*`)
   .setColor("#7289da")
   .addField("Bots", `${!bots ? "" : bots.map(a => "<@"+a.botID+">").join("\n")}`, true)
   esitthis.edit(embed)
};
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
} 
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
  };
  
  exports.help = {
    name: "bots",
    description: "",
    usage: ""
  };