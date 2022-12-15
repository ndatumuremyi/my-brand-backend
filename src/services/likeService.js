import Like from "../models/Like.js";

export class LikeServices {
    static async findLikesByBlogId(blogId){
        return Like.findOne({ blogId: blogId });
    }
}