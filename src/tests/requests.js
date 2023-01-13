import request from "supertest";
import app from "../server.js";
export class Requests {
    static async Login(user){
        return request(app).post("/api/v1/users/login").send(user)
    }
    static async CreateBlogNoFields(tokenData){
        return request(app).post("/api/v1/blogs").set('Authorization', 'Bearer '+tokenData)
    /*
    * .attach("image", `${process.cwd()}/assets/images/clean_the_room.png`).field("description", blog.description)
            .field("category", blog.category).field("title", blog.title)
    *
    * */
    }

    static async GetRandomBlog(){
        return request(app).get("/api/v1/blogs/random")
    }
    static async GetBlogById(id){
        return request(app).get("/api/v1/blogs/"+id)
    }
    static async GetBlogCommentS(id){
        return request(app).get("/api/v1/blogs/"+id+"/comments")
    }
}