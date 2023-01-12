import Comment from "../models/Comment.js";

export class CommentService {
    static async findCommentByBlogId(blogId){
        return Comment.find({blogId:blogId})
    }
    static async createComment(data){
        let comment = new Comment(data);
        await comment.save()
        return comment
    }
}