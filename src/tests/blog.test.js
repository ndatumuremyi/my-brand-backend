import request from 'supertest'
import {Requests} from "./requests.js";
import setupDB from "../test-setup.js";
import app from "../server.js";

import Blog from "../models/Blog.js";
import users from "../seed/user.seed.js";

const user = users[0];

setupDB("endpointTesting", true);
describe("/blogs", () => {
    it("should return 200 :GET /blogs", (done) => {
        request(app).get("/api/v1/blogs").end((error, response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty("data");
            done()
        })

    }, 20000);
    it('should return 200 :POST /blogs ',async function () {
        let blog = {description: "testing division",
            category: "life",
            title:"testing title",
        }
        const {body:{token}}  = await Requests.Login(user)

        console.log(token)
        const response = await request(app).post("/api/v1/blogs").set('Authorization', 'Bearer '+token)
            .attach("image", `${process.cwd()}/assets/images/clean_the_room.png`).field("description", blog.description)
            .field("category", blog.category).field("title", blog.title);
        expect(response.statusCode).toBe(200)
    }, 20000);
    it('should return 401 <<UN AUTHORIZED>> :POST /blogs ',function (done) {
        let blog = {
            description: "testing division",
            category: "life",
            title:"testing title",
        }
        request(app).post("/api/v1/blogs").set('Authorization', 'Bearer '+"tokenData")
            .attach("image", `${process.cwd()}/assets/images/clean_the_room.png`).field("description", blog.description)
            .field("category", blog.category).field("title", blog.title).end((error, response) => {
            expect(response.statusCode).toBe(401)
            done()
        })
    });
    it('should return 400 <<MISSING FIELDS>> :POST /blogs ', async function () {

        const {body:{token}}  = await Requests.Login(user)

        const response = await Requests.CreateBlogNoFields(token);
        expect(response.statusCode).toBe(400)
    });
    it('should should return 200 :GET /blogs/:id ', async function () {

        let blogs = await Blog.find();
        console.log("randomBlog", blogs);
        const blog = blogs[0];
        const response = await Requests.GetBlogById(blog._id);
        expect(response.statusCode).toBe(200)
    });
    it('should should return 200 :GET /blogs/:id/comments', async function () {
        let blogs = await Blog.find();
        console.log("randomBlog", blogs);
        const blog = blogs[0];
        const response = await Requests.GetBlogCommentS(blog._id);
        expect(response.statusCode).toBe(200)
    });

})