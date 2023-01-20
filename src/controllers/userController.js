import User from "../models/User.js";
import genToken from "../system/security/generateToken/index.js";


export class UserController {
   static async signUp(req, res){
       try {
           const obj = req.body
           const {email, password} = obj
           //Check If User Exists
           let foundUser = await User.findOne({ email });
           if (foundUser) {
               throw {message:'Email is already in use', status:403}
           }
           const user = await User.create(obj)
           return res.status(201).json(user)
       }catch (e) {
           if(e.status){
               return res.status(e.status).json({error:e.message})
           }
           return res.status(500).json({error:e.message || "server error"})
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
           return res.status(200).json({message: "login successful", token})

       }catch (error){
           if(error.status){
               return res.status(error.status).json({error:error.message})
           }
           return res.status(500).json({error:"server error"})
       }
   }
   static async logout(req, res){
       try {
           const {email, id} = req.user
           const user = await  User.findOne({email, _id:id})
           user.set("status", false)
           await user.save()

           return res.status(200).json({message:"logout successful"})
       }catch (error){
           return res.status(500).json({error:"server error"})
       }
   }

}