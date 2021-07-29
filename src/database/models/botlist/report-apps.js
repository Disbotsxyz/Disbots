const mongoose = require('mongoose')
const schema = new mongoose.Schema({
botID: String,
hundred: String,
reason: String,
})
module.exports = mongoose.model('report', schema)