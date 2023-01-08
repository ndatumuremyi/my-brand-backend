import User from "../models/User.js";
import { signinToken, decode } from '../system/security/jwt.js';
import bcrypt  from "bcryptjs"
import genToken from "../system/security/generateToken/index.js";


export class UserController {
   static async signUp(req, res){
       try {
           const obj = req.body
           const {email, password} = obj
           //Check If User Exists
           let foundUser = await User.findOne({ email });
           if (foundUser) {
               return res.status(403).json({ error: 'Email is already in use'});
           }
           obj.password = bcrypt.hashSync(obj.password, 10)
           const user = await User.create(obj)
           return res.status(201).json(user)
       }catch (e) {
           console.log()
           return res.status(500).json({error:"server error"})
       }
   }
   static async login(req, res){
       try {
           let {email, password} = req.body
           let user = await  User.findOne({email})
           if(!user){
               return res.status(403).json({error:"no such user"})
           }
           if(!bcrypt.compareSync(password, user.password)){
               return res.status(403).json({error:"password or email is incorrect"})
           }
           user.set("status", true)
           await user.save()
           const payload = {email:user.email, id:user._id}
           // const token = await signinToken(payload)
           const token = genToken(user)
           console.log("token", token)
           return res.status(200).json({message: "login successful", token})

       }catch (error){
           console.log("message", error.message)
           return res.status(500).json({error:"server error"})
       }
   }
   static async logout(req, res){
       try {
           const {email, id} = req.user
           const user = await  User.findOne({email, _id:id})
           if(!user){
               return res.status(401).json({error:"user not found"})
           }
           user.set("status", false)
           await user.save()

           return res.json({message:"logout successful"})
       }catch (error){
           return res.status(500).json({error:"server error"})
       }
   }

}