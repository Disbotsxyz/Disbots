const app = require('express').Router();
const botsdata = require("../database/models/botlist/bots.js");
const db = require("../database/models/servers/server.js");
const maintenceSchema = require('../database/models/maintence.js');
const profiledata = require("../database/models/profile.js");

console.log("[disbots.xyz]: Index router loaded.");


app.get("/", async (req,res) => {
    if (req.isAuthenticated()) {
      var prodata = await profiledata.findOne({
            userID: req.user.id
        });
    }
    res.render("index.ejs", {
      bots: global.clientSL,
    	bot: global.Client,
        path: req.path,
        config: global.config,
        user: req.isAuthenticated() ? req.user : null,
        req: req,
        botdata: await botsdata.find(),
        prodata: prodata,
        roles:global.config.server.roles,
        channels: global.config.server.channels,
        data: await db.find()
    })
})

module.exports = app;