const mongoose = require("mongoose")
const {Schema} = require("mongoose/lib/browser");

const schema = mongoose.Schema({
    email:String,
    names:String,
    blogId:{type:Schema.Types.ObjectId, ref:'Blog'}
})

module.exports = mongoose.model('Comment', schema)