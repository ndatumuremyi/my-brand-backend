import {CommentService} from "../services/commentService.js";

export class CommentController {
    static async addCommentFromBlog(req, res){
        const blogId = req.params.id
        const {names, email, comment} = req.body
        const _comment = await CommentService
            .createComment({
                names,
                email,
                comment,
                blogId
            })
        return res.status(201).json({message:"Comment successful",data:_comment})
    }
}