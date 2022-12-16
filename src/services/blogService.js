import Blog from "../models/Blog.js";

export class BlogService {
    static async createBlog(data){
        let blog = new Blog(data)
        await blog.save()

        return blog
    }
    static async getBlog(id){
        return Blog.findOne({_id: id})
    }
    static async deleteBlog(id){
        return Blog.deleteOne({ _id: id })
    }
    static async findAllBlog(){
        return Blog.find()
    }
}