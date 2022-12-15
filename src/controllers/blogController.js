import Blog from "../models/Blog.js";
import fs from "fs";
import path from "path";
import {BlogService} from "../services/blogService.js";
import Comment from "../models/Comment.js";

export class BlogController {
    static async findAllBlog(req, res){
        const posts = await Blog.find();
        res.send(posts);
    }
    static async createBlog(req, res){
        try {
            const post = new Blog({
                title: req.body.title,
                category: req.body.category,
                description:req.body.description,
                image:{
                    data: fs.readFileSync(path.join(process.cwd() + '/uploads/' + req.file.filename)),
                    contentType: req.file.mimetype
                },
                created_on: new Date()
            });
            const blog = await BlogService.createBlog(post);
            res.status(200).json({message:"Blog created",data:blog});
        }catch (error){
            console.log(error)
            return res.status(500).json({error:'internal server error'})
        }
    }
    static async getBlog(req, res){
        try {
            res.send(BlogService.getBlog(req.params.id));
        } catch {
            res.status(404);
            res.send({ error: "Blog doesn't exist!" });
        }
    }
    static async updateBlog(req, res){
        try {
            const post = BlogService.getBlog(req.params.id)

            if (req.body.title) {
                post.title = req.body.title;
            }

            if (req.body.description) {
                post.description = req.body.description;
            }
            if(req.body.image){
                post.image = req.body.image;
            }
            if(req.body.category){
                post.category = req.body.category
            }

            await post.save();
            res.send(post);
        } catch {
            res.status(404);
            res.send({ error: "Blog doesn't exist!" });
        }
    }
    static async deleteBlog(req, res){
        try {
            await BlogService.deleteBlog(req.params.id);
            res.status(204).send();
        } catch {
            res.status(404);
            res.send({ error: "Blog doesn't exist!" });
        }
    }
    static async getAllComments(req, res){
        try{
            const comments = await Comment.find({blogId:req.params.id})
            res.send(comments)
        }catch (error){
            res.status(404)
            res.send({error: error})
        }

    }

}