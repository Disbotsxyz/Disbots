const app = require('express').Router();
const botsdata = require("../../../../database/models/botlist/bots.js");
const codesSchema = require("../../../../database/models/codes.js");
const uptimedata = require("../../../../database/models/uptime.js");
const appsdata = require("../../../../database/models/botlist/report-apps.js");
let sitedatalari = require("../../../../database/models/analytics-site.js");

console.log("[disbots.xyz]: Admin/Botlist/report Decline router loaded.");
const roles = global.config.server.roles;
const channels = global.config.server.channels;
const client = global.Client;
app.get("/admin/delete/:botID/report", global.checkAuth, async (req, res) => {
    let rBody = req.body; 
    const botdata = await botsdata.findOne({
        botID: req.params.botID
    });
    client.channels.cache.get(channels.reportlog).send(`<:notcheck:853262343790526495> The report applied on <@${botdata.ownerID}>'s bot has been deleted.`)
    await appsdata.deleteOne({
        botID: req.params.botID
    })
    return res.redirect(`/admin/report-apps?success=true&message=Report deleted.`)
});

module.exports = app;