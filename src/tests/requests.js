import request from "supertest";

const baseURL = "http://localhost:5000"
export class Requests {
    static async Login(){
        let user = {
            'email':"ndatumuremyi@gmail.com",
            'password':'password'
        }
        return  await request("http://localhost:5000").post("/api/v1/users/login").send(user)
    }
    static async CreateBlog(tokenData){
        let blog = {
            description: "testing division",
            category: "life",
            title:"testing title",
        }
        return  await request(baseURL).post("/api/v1/blogs").set('Authorization', 'Bearer '+tokenData)
            .attach("image", `${process.cwd()}/assets/images/clean_the_room.png`).field("description", blog.description)
            .field("category", blog.category).field("title", blog.title)
    }
    static async GetRandomBlog(){
        return  await request(baseURL).get("/api/v1/blogs/random")
    }
    static async GetBlogById(id){
        return  await request(baseURL).get("/api/v1/blogs/"+id)
    }
    static async GetBlogCommentS(id){
        return await request(baseURL).get("/api/v1/blogs/"+id+"/comments")
    }
}