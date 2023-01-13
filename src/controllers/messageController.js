import {MessageService} from "../services/messageService.js";

export class MessageController {
    static async getAll(req, res){
        try {
            const messages = await MessageService.findAll()
            return res.status(200).json({message:" get messages", data:messages})
        }catch (e) {
            return res.status(500).json({message:"something went wrong",error:e})
        }
    }
    static async addOne(req, res){
        try {
            const {names, email, message} = req.body
            const _comment = await MessageService
                .createMessage({
                    names,
                    email,
                    message,
                })

            return res.status(201).json({data:_comment, message:"message received"})
        }catch (err){
            return res.status(500).json({error:"something went wrong"})
        }
    }
    static async findOne(req, res){
        try{
            const comment = await MessageService.findOne(req.params.id)
            return res.json(comment)
        }catch(e) {
            return res.status(404).json({error:"Comment doesn't exist"})
        }
    }
}