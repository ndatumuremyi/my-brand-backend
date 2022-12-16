import User from "../models/User.js";
import { signinToken, decode } from '../system/security/jwt.js';

export class UserController {
   static async signUp(req, res){
       try {
           const obj = req.body
           const user = await User.create(obj)
           return res.status(201).json(user)
       }catch (e) {
           return res.status(500).json({error:"server error"})
       }
   }
   static async login(req, res){
       try {
           const {email, password} = req.body
           let user = await  User.findOne({email, password})
           if(!user){
               return res.status(403).json({error:"unAuthorized"})
           }
           user.set("status", true)
           await user.save()
           const payload = {email:user.email, id:user._id}
           const token = await signinToken(payload)
           console.log("token", token)
           return res.status(200).json({message: "login successful", token})

       }catch (error){
           console.log("message", error.message)
           return res.status(500).json({error:"server error"})
       }
   }
   static async logout(req, res){
       try {
           const {email, id} = req.me
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