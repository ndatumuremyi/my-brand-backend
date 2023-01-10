import request from 'supertest'
import {Requests} from "./requests.js";
import {v4 as getUniqueId } from 'uuid';
import User from "../models/User.js";

const baseURL = "http://localhost:5000"
describe("post /users/login", () => {

    let user = {
        'email':"ndatumuremyi@gmail.com",
        'password':'password'
    }
    it("should return 200", async () => {
        const response = await request(baseURL).post("/api/v1/users/login").send(user);
        expect(response.statusCode).toBe(200);
        expect(response.body.token !== undefined).toBe(true);
    });
});

describe("patch /users/logout", () => {
    let tokenData = undefined
    beforeAll(async () => {
        const {body:{token}} = await Requests.Login()
        tokenData = token
    })
    it("should return 200", async () => {
        const response = await request(baseURL).patch("/api/v1/users/logout").set('Authorization', 'Bearer '+tokenData);
        expect(response.statusCode).toBe(200);
        expect(response.body.message !== undefined).toBe(true);
    });

})

describe("POST user/signup", () => {
    describe("Incorrect email or password", () => {
        it(" 403 status code", async () => {
            const response = await request(baseURL)
                .post("/api/v1/users/signup")
                .send({ email: "ndatumuremyi@gmail.com", password: "password" });
            expect(response.statusCode).toBe(403);
            // expect(response.body).not.toHaveProperty("token");
            expect(response.body).toHaveProperty("error");
        });
    });
    describe("New email and a valid password", () => {
        it("201 status code, and user in db", async () => {
            const email = `test${getUniqueId()}@gmail.com`;
            const response = await request(baseURL)
                .post("/api/v1/users/signup")
                .send({ email: email, password: "password" });
            const user = User.findOne({ email });
            expect(response.statusCode).toBe(201);
            expect(user).toBeDefined();
        });
    });
});