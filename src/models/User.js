import mongoose from 'mongoose'
import bcrypt from "bcryptjs"

const schema = mongoose.Schema({
    email:String,
    names:String,
    browserId:String,
    password:String,
    status:{type:Boolean, default:false}
})

// Hashes password automatically
schema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    const salt = bcrypt.genSaltSync(10)
    this.password = bcrypt.hashSync(this.password, salt)
})

schema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}


export default mongoose.model('User', schema)