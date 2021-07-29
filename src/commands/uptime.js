const Discord = require('discord.js')
const vcodes = require("vcodes.js");
const ms = require("parse-ms");
const db = require("quick.db");
const botsdata = require("../database/models/botlist/bots.js")
const config = require("../../config.js");
module.exports.run = async (client, message, args) => {
var bot = message.mentions.users.first()
    if(bot)
    {
      var bot = bot;
    } else {
      var bot = args[0];
     var bot = client.users.cache.get(bot)
    }
    if(!bot)
    {
      return message.channel.send("You have given an invalid bot id or mention")
    } 
      
    
         const votes = require("../database/models/botlist/vote.js");
      let botdata = await botsdata.findOne({ botID: bot.id });
      if(!botdata)
      {
        return message.channel.send("Not a bot");
      }
        var checking = db.fetch(`rate_${bot.id}`);
   if(!checking)
   {
     var checking = "100";
   }
       var check = db.fetch(`presence_${bot.id}`);
       if(!check)
       {
         var check = "Online";
       }
     let time = db.fetch(`timefr_${bot.id}`);
     var timeleft = await ms(Date.now() - time);
       var days = timeleft.days;
        var hour = timeleft.hours;
       var minutes = timeleft.minutes;
       var seconds = timeleft.seconds;
    var ochecks = db.fetch(`offlinechecks_${bot.id}`);
    let checks = db.fetch(`checks_${bot.id}`); 
 
   
message.channel.send(`Uptime - ${checking}% Checks - ${ochecks || 0}/${checks || 0} \n${check} Time - ${days}d ${hour}h ${minutes}m ${seconds}s`)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
};

exports.help = {
  name: "uptime",
  description: "uptime",
  usage: ""
};