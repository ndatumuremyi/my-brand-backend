import request from 'supertest'
import {Requests} from "./requests.js";
import useApp from "./jest_s.js";
import setupDB from "./test-setup.js";
const app = useApp;
const user = {
    'email':"ndatumuremyi@gmail.com",
    'password':'password'
}


describe("/blogs", () => {
    let tokenData = undefined
    setupDB("endpoint-testing");
    beforeAll(async () => {
        await request(app).post("/api/v1/users/signup").send(user);
        const {body:{token}}  = await Requests.Login(user)
        tokenData = token || "";
        const {body}  = await Requests.GetRandomBlog()
        blog = body
    })
    it("should return 200 :GET /blogs", (done) => {
        request(app).get("/api/v1/blogs").end((error, response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty("data");
            done()
        })

    }, 20000);
    it('should return 200 :POST /blogs ',function (done) {
        let blog = {
            description: "testing division",
            category: "life",
            title:"testing title",
        }
        console.log(tokenData)
        request(app).post("/api/v1/blogs").set('Authorization', 'Bearer '+tokenData)
            .attach("image", `${process.cwd()}/assets/images/clean_the_room.png`).field("description", blog.description)
            .field("category", blog.category).field("title", blog.title).end((error, response) => {
            expect(response.statusCode).toBe(200)
            done()
        })
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
        const response = await Requests.CreateBlogNoFields(tokenData);
        expect(response.statusCode).toBe(400)
    });
    let blog = undefined
    it('should should return 200 :GET /blogs/:id ', async function () {
        const response = await Requests.GetBlogById(blog._id);
        expect(response.statusCode).toBe(200)
    });
    it('should should return 200 :GET /blogs/:id/comments', async function () {
        const response = await Requests.GetBlogCommentS(blog._id);
        expect(response.statusCode).toBe(200)
    });

})