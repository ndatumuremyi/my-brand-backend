import Article from "../models/article.js";
import {ArticleServices} from "../services/articleService.js";

export class ArticleController {
    static async createArticle(req, res){
        try {
            const data = new Article({
                title:req.body.title,
                content:req.body.content,
                created_on: new Date(),
            });
            const article = await ArticleServices.createArticle(data);
            res.status(200).json({message:"Article created",data:article});
        }catch (error){
            console.log(error)
            return res.status(500).json({error:'internal server error'})
        }
    }
}