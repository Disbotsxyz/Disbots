const app = require('express').Router();
const sdata = require("../../../database/models/servers/server.js");
const client = global.clientSL;
const channels = global.config.server.channels;

console.log("[disbots.xyz/servers]: Edit router loaded.");

app.get("/:guildID/announcement", global.checkAuth, async (req, res) => {
    let serverData = await sdata.findOne({
        id: req.params.guildID
    });
    if (!serverData) return res.redirect("/error?code=404&message=You entered an invalid server id.");

    const guild = client.guilds.cache.get(req.params.guildID);
    if (!guild) return res.redirect("/error?code=404&message=You entered an invalid server id.");
    const member = guild.members.cache.get(req.user.id);
    if (!member) {
        try {
            await guild.members.fetch();
            member = guild.members.cache.get(req.user.id);
        } catch (err) {
            res.send({
                error: true,
                message: `Couldn't fetch the members of ${guild.id}: ${err}`
            })
        }
    }
    if (!member) return res.redirect("/error?code=403&message=Unauthorized.");
    if (!member.permissions.has("ADMINISTRATOR")) return res.redirect("/error?code=403&message=Unauthorized.");
    res.render("servers/server/announcement.ejs", {
        bot: global.Client,
        path: req.path,
        config: global.config,
        user: req.isAuthenticated() ? req.user : null,
        req: req,
        roles: global.config.server.roles,
        channels: global.config.server.channels,
        data: serverData
    })
});


app.post("/:guildID/announcement", global.checkAuth, async (req, res) => {
    let serverData = await sdata.findOne({
        id: req.params.guildID
    });
    if (!serverData) return res.redirect("/error?code=404&message=You entered an invalid server id.");
    let {
        title,
        content,
    } = req.body;
    const guild = client.guilds.cache.get(req.params.guildID);
    if (!req.params.guildID || !content || !title) return res.send({
        error: true,
        message: "Fill the must any blanks."
    });
    if (!guild) {
        await sdata.deleteOne({
            id: req.params.guildID
        })
        return res.send({
            error: true,
            message: "Server deleted on system because you kicked me."
        });
    }
    const member = guild.members.cache.get(req.user.id);
    if (!member) {
        try {
            await guild.members.fetch();
            member = guild.members.cache.get(req.user.id);
        } catch (err) {
            res.send({
                error: true,
                message: `Couldn't fetch the members of ${guild.id}: ${err}`
            })
        }
    }
    if (!member) return res.redirect(
    	'/error?code=403&message=You can only edit servers with ADMINISTRATOR authorization.'
    );
    if (!member.permissions.has("ADMINISTRATOR")) return res.redirect(
    	'/error?code=403&message=You can only edit servers with ADMINISTRATOR authorization.'
    );
    const datum = new Date().toLocaleString();
    await sdata.findOneAndUpdate({
        id: req.params.guildID
    }, {
        $set: {
            annoucementdesc: content,
            annoucementtitle: title,
            annoucementdate: datum,
        }
    }, function(err, docs) { })
    return res.send({
        success: true,
        message: "Successfully Announcemented"
    });
})

module.exports = app;