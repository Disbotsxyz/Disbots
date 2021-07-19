const app = require('express').Router();
const botsdata = require("../../../../database/models/botlist/bots.js");
const codesSchema = require("../../../../database/models/codes.js");
const uptimedata = require("../../../../database/models/uptime.js");
const appsdata = require("../../../../database/models/botlist/certificate-apps.js");
let sitedatalari = require("../../../../database/models/analytics-site.js");
const roles = global.config.server.roles;
const channels = global.config.server.channels;
const client = global.Client;
console.log("[disbots.xyz]: Admin/Botlist/Certificate Decline router loaded.");



module.exports = app;