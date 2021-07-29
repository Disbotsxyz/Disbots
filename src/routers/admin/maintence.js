const app = require('express').Router();
const maintenceSchema = require("../../database/models/maintence.js");
const client = global.Client;
const channels = global.config.server.channels,
	  roles = global.config.server.roles;

console.log("[disbots.xyz]: Admin/Maintence router loaded.");

app.get("/admin/maintence", global.checkAuth, async (req, res) => {
    if (!config.bot.owners.includes(req.user.id)) return res.redirect('../admin');
    res.render("admin/administrator/maintence.ejs", {
        bot: global.Client,
        path: req.path,
        config: global.config,
        user: req.isAuthenticated() ? req.user : null,
        req: req,
        roles:global.config.server.roles,
        channels: global.config.server.channels
    })
});
app.post("/admin/maintence", global.checkAuth, async (req, res) => {
    if (!config.bot.owners.includes(req.user.id)) return res.redirect('../admin');
    let bakimdata = await maintenceSchema.findOne({
        server: config.server.id
    });
    if (bakimdata) return res.redirect('../admin/maintence?error=true&message=Maintenance mode has already been activated for this site.');
    client.channels.cache.get(global.config.server.channels.webstatus).send(`<a:dis_off:855688791434985472> DisBots has been switched to __Maintenance__ due to **${req.body.reason}** [||<@&861221279080120371>||]`).then(a => {
        new maintenceSchema({
            server: config.server.id,
            reason: req.body.reason,
            bakimmsg: a.id
        }).save();
    })
    return res.redirect('../admin/maintence?success=true&message=Maintence opened.');
});
app.post("/admin/unmaintence", global.checkAuth, async (req, res) => {
    const dc = require("discord.js");
    if (!config.bot.owners.includes(req.user.id)) return res.redirect('../admin');
    let bakimdata = await maintenceSchema.findOne({
        server: config.server.id
    });
    if (!bakimdata) return res.redirect('../admin/maintence?error=true&message=The website is not in maintenance mode anyway.');
    const bakimsonaerdikardesDisbots = new dc.MessageEmbed()
        .setAuthor("Disbots.xyz", client.user.avatarURL())
        .setThumbnail(client.user.avatarURL())
        .setColor("GREEN")
        .setDescription(`<a:online:833375738785824788> <a:dis_on:855688790391521290> DisBots are **active** again!\n[Click to redirect website](https://disbots.xyz)`)
        .setFooter("Disbots © All rights reserved.");
    await client.channels.cache.get(channels.webstatus).messages.fetch(bakimdata.bakimmsg).then(a => {
        a.edit(`~~ <a:online:833375738785824788> Disbots has been switched to __maintance__ due to **${bakimdata.reason}** ~~`, bakimsonaerdikardesDisbots)
    })
    client.channels.cache.get(channels.webstatus).send(".").then(b => {
        b.delete({
            timeout: 500
        })
    })
    await maintenceSchema.deleteOne({
        server: config.server.id
    }, function(error, server) {
        if (error) console.log(error)
    });
    return res.redirect('../admin/maintence?success=true&message=Maintenance mode has been shut down successfully.');
});

module.exports = app;