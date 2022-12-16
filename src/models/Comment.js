import mongoose, {Schema} from 'mongoose'

const schema = mongoose.Schema({
    email:String,
    names:String,
    blogId:{type:Schema.Types.ObjectId, ref:'Blog'},
    comment:String,
})

export default mongoose.model('Comment', schema)