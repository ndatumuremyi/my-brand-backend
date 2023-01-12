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
               throw {status:403, message:"no such use"}
           }
           if(!user.verifyPassword(password)){
               throw {status:403, message:"password or email is incorrect"}
           }
           user.set("status", true)
           await user.save()

           // const token = await signinToken(payload)
           const token = genToken(user)
           console.log("token", token)
           return res.status(200).json({message: "login successful", token})

       }catch (error){
           if(error.status){
               return res.status(error.status).json({error:error.message})
           }
           console.log("message", error.message)
           return res.status(500).json({error:"server error"})
       }
   }
   static async logout(req, res){
       try {
           const {email, id} = req.user
           const user = await  User.findOne({email, _id:id})
           if(!user){
               throw {status:404, error:"user not found"}
           }
           user.set("status", false)
           await user.save()

           return res.status(200).json({message:"logout successful"})
       }catch (error){
           if(error?.status){
               return res.status(error.status).json({error:error.message})
           }
           return res.status(500).json({error:"server error"})
       }
   }

}