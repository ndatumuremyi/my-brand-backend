import request from 'supertest'
import {Requests} from "./requests.js";
//https://circleci.com/blog/api-testing-with-jest/
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