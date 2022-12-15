const mongoose = require("mongoose")
const {Schema} = require("mongoose/lib/browser");

const schema = mongoose.Schema({
    blogId:{type:Schema.Types.ObjectId, ref:'Blog'},
    count:Number,
    lovers:[{type:Schema.Types.ObjectId, ref:'User'}],
})

module.exports = mongoose.model('Like', schema)