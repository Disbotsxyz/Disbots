const app = require('express').Router();
const botsdata = require("../../../database/models/botlist/bots.js");
const apps = require("../../../database/models/botlist/report-apps.js");
const client = global.Client;

console.log("[disbots.xyz]: Botlist/Report router loaded.");

app.get("/:botID/report", global.checkAuth, async (req, res) => {
    const userbots = await botsdata.find({
        botID: req.params.botID
    })
    const checkreporter = await apps.find({
        reporterID: req.user.id
    })
    if (!userbots) return res.redirect('/error?code=401&message=There is no bot on our website with this id.');
    if (checkreporter) return res.redirect('/error?code=401&message=You have already reported this bot.');
	    res.render("botlist/apps/report.ejs", {
	        bot: global.Client,
	        path: req.path,
	        config: global.config,
	        user: req.isAuthenticated() ? req.user : null,
	        req: req,
	        roles:global.config.server.roles,
	        channels: global.config.server.channels,
	        userbots: userbots
	    })
});
app.post("/:botID/report", global.checkAuth, async (req, res) => {
    const rBody = req.body;
    let findBot = await apps.findOne({ botID: req.params.botID });
    new apps({
        reporterID : req.user.id,
        botID: req.params.botID,
        reason: rBody['reason'],
        report: "applied",
    }).save();
    res.redirect("/bots?success=true&message=You have reported the bot.&botID=" + req.params.botID)
    let botdata = await botsdata.findOne({
            botID: req.params.botID
        })
    client.channels.cache.get(global.config.server.channels.botlog).send(`User **${req.user.username}** has reported <@${req.params.botID}> on website.`)
});

module.exports = app;
