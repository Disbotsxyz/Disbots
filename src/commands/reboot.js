const Discord = require('discord.js');
const fetch = require("node-fetch");
const mySecret = process.env['mongo_url']

exports.run = (client, message, args) => {
    if(!global.config.bot.owners.includes(message.author.id)) return  message.reply('could not be granted access permission.')
    message.channel.send("Disbots: Bot Resarting Please Wait for sometime!.").then(msg => {
	  process.exit(1)
		console.log(`BOT : Restarting...`);
	})
};
exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: []
};
exports.help = {
	name: 'reboot',
	description: 'Botu Yeniden Başlatır.',
	usage: 'reboot'
};