import setupDB from "../test-setup.js";
import request from "supertest";
import app from "../server.js";
import {Requests} from "./requests.js";
import users from "../seed/user.seed.js";

setupDB("testingMessage", true);

describe("/message", () => {
    it("should return 201 :POST /messages",(done) => {
        const message = {
            "email":"ndatumuremyi@gmial.com",
            "names":"ndatumuremyi paterne",
            "message":"testing message"
        }
        request(app).post("/api/v1/messages").send(message).end((error, response) => {
            expect(response.statusCode).toBe(201);
            done();
        })
    })
    it("should return 200 :GET /messages", async () => {
        const {body:{token}} = await Requests.Login(users[0])
        const response = await request(app).get("/api/v1/messages").set('Authorization', 'Bearer '+token);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("data");
    })
    it("should return 401 :GET /messages", async () => {
        const response = await request(app).get("/api/v1/messages").set('Authorization', 'Bearer '+"token");
        expect(response.statusCode).toBe(401);
    })


})