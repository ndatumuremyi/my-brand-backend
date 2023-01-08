import Message from "../models/message.js";

export class MessageService {
    static async findAll(){
        return Message.find()
    }
    static async findOne(id){
        return Message.findOne({_id : id})
    }
    static async createMessage(data){
        let message = new Message(data);
        await message.save()
        return message
    }
}