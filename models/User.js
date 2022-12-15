const mongoose = require("mongoose")

const schema = mongoose.Schema({
    email:String,
    names:String,
    browserId:String,
})

module.exports = mongoose.model('User', schema)