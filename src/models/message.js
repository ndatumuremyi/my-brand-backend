import mongoose from 'mongoose'

const schema = mongoose.Schema({
    email:String,
    names:String,
    message:String,
})

export default mongoose.model('Message', schema)