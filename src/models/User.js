import mongoose from 'mongoose'

const schema = mongoose.Schema({
    email:String,
    names:String,
    browserId:String,
})

export default mongoose.model('User', schema)