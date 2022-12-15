import Article from "../models/article.js";

export class ArticleServices {
    static async createArticle(data){
        let article = new Article(data)
        await article.save()

        return article
    }
}