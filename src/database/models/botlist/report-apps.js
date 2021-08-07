const mongoose = require('mongoose')
const schema = new mongoose.Schema({
botID: String,
hundred: String,
reason: String,
username: String,
tags:Array
})
module.exports = mongoose.model('report', schema)