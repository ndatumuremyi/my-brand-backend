import {Requests} from "./requests.js";
import request from "supertest";
import app from "../server.js";
import setupDB from "../test-setup.js";


setupDB("testingComments", true);
describe("/comments", () => {
    it("should return 200 :GET /blogs/:id/comments",async () => {
        const {body:{data : randomBlog}} = await Requests.GetRandomBlog();
        expect(randomBlog).toBeDefined();

        const {statusCode, body} = await request(app).get(`/api/v1/blogs/${randomBlog._id}/comments`)
        expect(statusCode).toBe(200);
        expect(body).toHaveProperty("data");
    })
    it("should return 201 :POST /blogs/:id/comments",async () => {
        const userComment = {
            "email":"email@gmail.com",
            "names":"eric eamil",
            "comment":"comment here"
        }
        const {body:{data : randomBlog}} = await Requests.GetRandomBlog();
        expect(randomBlog).toBeDefined();

        const {statusCode, body} = await request(app).post(`/api/v1/blogs/${randomBlog._id}/comments`).send(userComment)
        expect(statusCode).toBe(201);
        expect(body).toHaveProperty("data");
    }, 20000)

})