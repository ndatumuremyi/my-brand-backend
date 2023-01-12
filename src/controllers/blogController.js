import fs from "fs";
import path from "path";
import {BlogService} from "../services/blogService.js";
import {CommentService} from "../services/commentService.js";
import cloudinari from "../utils/cludinary.js";
export class BlogController {
    static async findAllBlog(req, res){
        try {
            const blogs = await BlogService.findAllBlog();
            return res.status(200).json({
                message:"fetch blog successful",
                data:blogs
            });
        }catch (error){
            return res.status(500).json({error:"something went wrong"})
        }
    }
    static async createBlog(req, res){
        try {
            // console.log("message", req.body)
            const {title, category, description} = req.body;
            const imageUrl = await cloudinari.uploadPhoto(req,res,req.files.image);
            // console.log("image url ----", imageUrl);
            const post = {
                title,
                category,
                description,
                image:imageUrl.url,
                created_on: new Date()
            }
            const blog = await BlogService.createBlog(post);
            res.status(200).json({message:"Blog created",data:blog});
        }catch (error){
            console.log(error)
            return res.status(500).json({message:'something went wrong',error:error.message})
        }
    }
    static async getBlog(req, res){
        try {
            let blog  = await BlogService.getBlog(req.params.id)
            return res.json(blog);
        } catch {
            return res.status(404).json({ error: "Blog doesn't exist!" });
        }
    }
    static async getRandom(req, res){
        try {
            const blogs = await BlogService.findAllBlog();
            let index = Math.floor(Math.random() * blogs.length)
            return res.status(200).json({message:"random blog", data:blogs[index]});
        }catch (error){
            return res.status(500).json({error:"something went wrong"})
        }
    }
    static async updateBlog(req, res){
        try {
            const post = await BlogService.getBlog(req.params.id)
            const {title, description, category} = req.body
            if(!post){
                throw {error:404, message:"blog not found"}
            }
            if (title) {
                post.title = title;
            }

            if (description) {
                post.description = description;
            }
            if(category){
                post.category = category
            }

            await post.save();
            return res.status(201).json({message:"Blog updated successful",data:post});
        } catch {
            return res.status(500).json({ error: "Blog doesn't exist!" });
        }
    }
    static async deleteBlog(req, res){
        try {
            const blog = await BlogService.deleteBlog(req.params.id);
            if(blog.deletedCount === 0){
                throw {status:403, message:"blog does not exist"}
            }
            return res.status(201).json({message:"delete success", data:blog});
        } catch(err) {
            if(err?.status){
                return res.status(err.status).json({error:err.message});
            }
            return res.status(400).json({ error: "Blog doesn't exist!" });
        }
    }
    static async getAllComments(req, res){
        try{
            const comments = await CommentService.findCommentByBlogId(req.params.id)
            return res.status(200).json({message:"get all comments",data:comments})
        }catch (error){
            return res.status(500).json({error: error})
        }

    }

}