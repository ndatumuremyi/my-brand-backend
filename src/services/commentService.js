import Comment from "../models/Comment.js";

export class CommentService {
    static async findAll(){
       return Comment.find()
    }
    static async findCommentByBlogId(blogId){
        return Comment.find({blogId:blogId})
    }
    static async findOneComment(id){
        return Comment.findOne({_id : id})
    }
    static async createComment(data){
        let comment = new Comment(data);
        await comment.save()
        return comment
    }
}