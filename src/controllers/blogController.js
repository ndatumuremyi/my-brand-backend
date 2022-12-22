import fs from "fs";
import path from "path";
import {BlogService} from "../services/blogService.js";
import {CommentService} from "../services/commentService.js";
import cloudinari from "../utils/cludinary.js";
export class BlogController {
    static async findAllBlog(req, res){
        try {
            const blogs = await BlogService.findAllBlog();
            res.json(blogs);
        }catch (error){
            return res.status(500).json({message:"something went wrong"})
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
            res.json(blogs[index]);
        }catch (error){
            return res.status(500).json({message:"something went wrong"})
        }
    }
    static async updateBlog(req, res){
        try {
            const post = BlogService.getBlog(req.params.id)
            const {title, description, category} = req.body
            if (title) {
                post.title = title;
            }

            if (description) {
                post.description = description;
            }
            // if(req.body.image){
            //     post.image = req.body.image;
            // }
            if(category){
                post.category = category
            }

            await post.save();
            return res.json(post);
        } catch {
            return res.status(404).json({ error: "Blog doesn't exist!" });
        }
    }
    static async deleteBlog(req, res){
        try {
            await BlogService.deleteBlog(req.params.id);
            return res.status(204).json({message:"delete success"});
        } catch {
            return res.status(404).json({ error: "Blog doesn't exist!" });
        }
    }
    static async getAllComments(req, res){
        try{
            const comments = await CommentService.findCommentByBlogId(req.params.id)
            return res.json(comments)
        }catch (error){
            return res.status(404).json({error: error})
        }

    }

}