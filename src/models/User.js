import mongoose from 'mongoose'

const schema = mongoose.Schema({
    email:String,
    names:String,
    browserId:String,
    password:String,
    status:{type:Boolean, default:false}
})

export default mongoose.model('User', schema)