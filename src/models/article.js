import mongoose from "mongoose"

const articleSchema = mongoose.Schema({
    title:{type:String, require:true},
    content:{type:String, require: true},
    created_on:{type:Date, default:new Date()}
})

const Article = mongoose.model("Article", articleSchema)

export default Article