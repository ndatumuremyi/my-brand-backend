import request from "supertest";
import app from "../server.js";
export class Requests {
    static async Login(user){
        let sample = {
            'email':"ndatumuremyi@gmail.com",
            'password':'password'
        }
        if(!user){
            user = sample;
        }
        return request(app).post("/api/v1/users/login").send(user)
    }
    static async CreateBlog(tokenData){
        let blog = {
            description: "testing division",
            category: "life",
            title:"testing title",
        }
        return await request(app).post("/api/v1/blogs").set('Authorization', 'Bearer '+tokenData)
            .attach("image", `${process.cwd()}/assets/images/clean_the_room.png`).field("description", blog.description)
            .field("category", blog.category).field("title", blog.title)
    }
    static async CreateBlogNoFields(tokenData){
        return  await request(app).post("/api/v1/blogs").set('Authorization', 'Bearer '+tokenData)
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