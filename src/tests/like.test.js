import setupDB from "../test-setup.js";
import request from "supertest";
import app from "../server.js";
import {Requests} from "./requests.js";
import {v4 as getUniqueId } from 'uuid';

setupDB("testingLikes", true);

describe("/like", () => {
    it("should return 201 :POST /blogs/:id/like",async () => {
        const {body:{data : randomBlog}} = await Requests.GetRandomBlog();
        expect(randomBlog).toBeDefined();

        const {statusCode, body} = await request(app).post(`/api/v1/blogs/${randomBlog._id}/like`).send({browserId:getUniqueId()})
        expect(statusCode).toBe(201);
        expect(body).toHaveProperty("data");

    })
    it("should return 401 :POST /blogs/:id/like", async () => {
        const {body:{data : randomBlog}} = await Requests.GetRandomBlog();
        const browserId = getUniqueId();
        expect(randomBlog).toBeDefined();

        const {statusCode} = await request(app).post(`/api/v1/blogs/${randomBlog._id}/like`).send({browserId:browserId})
        expect(statusCode).toBe(201);

        const {statusCode : status} = await request(app).post(`/api/v1/blogs/${randomBlog._id}/like`).send({browserId:browserId})
        expect(status).toBe(401);


    })
    it("should return 201 :POST /blogs/:id/unlike",async () => {
        const {body:{data : randomBlog}} = await Requests.GetRandomBlog();
        expect(randomBlog).toBeDefined();
        const browserId = getUniqueId();

        const {statusCode, body} = await request(app).post(`/api/v1/blogs/${randomBlog._id}/like`).send({browserId:browserId})
        expect(statusCode).toBe(201);
        expect(body).toHaveProperty("data");

        const {statusCode : status, body: body2} = await request(app).post(`/api/v1/blogs/${randomBlog._id}/unlike`).send({browserId:browserId})
        expect(status).toBe(201);
        expect(body2).toHaveProperty("data");


    })
    it("should return 401 :POST /blogs/:id/unlike", async () => {
        const {body:{data : randomBlog}} = await Requests.GetRandomBlog();
        const browserId = getUniqueId();
        expect(randomBlog).toBeDefined();

        const {statusCode : status, body} = await request(app).post(`/api/v1/blogs/${randomBlog._id}/unlike`).send({browserId:browserId})
        expect(status).toBe(401);
        expect(body).toHaveProperty("error");
    })
    it("should return 200 :POST /blogs/:id/didILike", async () => {
        const {body:{data : randomBlog}} = await Requests.GetRandomBlog();
        expect(randomBlog).toBeDefined();
        const browserId = getUniqueId();

        const {statusCode, body} = await request(app).post(`/api/v1/blogs/${randomBlog._id}/like`).send({browserId})
        expect(statusCode).toBe(201);

        const response = await request(app).post(`/api/v1/blogs/${randomBlog._id}/didILike`).send({browserId})
        expect(response.statusCode).toBe(200)
    })


})