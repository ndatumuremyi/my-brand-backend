import request from 'supertest'
import {Requests} from "./requests.js";

const baseURL = "http://localhost:5000"
describe("GET /blogs", () => {

    it("should return 200", async () => {
        const response = await request(baseURL).get("/api/v1/blogs");
        expect(response.statusCode).toBe(200);
        expect(response.body.error).toBe(undefined);
    });
    it("should return blogs", async () => {
        const response = await request(baseURL).get("/api/v1/blogs");
        expect(response.body.length >= 1).toBe(true);
    });
});
describe("post /blog", () => {
    let tokenData = undefined
    beforeAll(async () => {
        const {body:{token}}  = await Requests.Login()
        tokenData = token;
    })
    it('should should return 200 ', async function () {
        const response = await Requests.CreateBlog(tokenData);
        expect(response.statusCode).toBe(200)
    });
})

describe("get /blogs/:id", () => {
    let data = undefined
    beforeAll(async () => {
        const {body}  = await Requests.GetRandomBlog()
        data = body
    })
    it('should should return 200 ', async function () {
        const response = await Requests.GetBlogById(data._id);
        expect(response.statusCode).toBe(200)
    });
})

describe("get /blogs/:id", () => {
    let data = undefined
    beforeAll(async () => {
        const {body}  = await Requests.GetRandomBlog()
        data = body
    })
    it('should should return 200 ', async function () {
        const response = await Requests.GetBlogCommentS(data._id);
        expect(response.statusCode).toBe(200)
    });
})