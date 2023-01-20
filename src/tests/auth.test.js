import request from 'supertest'
import User from "../models/User.js";
import app from "../server.js";
import setupDB from "../test-setup.js";
import users from "../seed/user.seed.js";


setupDB("loginTestingDb", true);
describe("/users", () => {
    it("should return 200 :POST /users/signup", async () => {
        let user = {email:"testing@gmail", password:"password"}
        const response = await request(app)
            .post("/api/v1/users/signup")
            .send(user);
        let userAfterSignup = User.findOne({ email:user.email });
        expect(response.statusCode).toBe(201);
        expect(userAfterSignup).toBeDefined();
    });
    it("should return 403 :POST / users/signup", async () =>{
        let user = users[0]
        const response = await request(app)
            .post("/api/v1/users/signup")
            .send(user);
        expect(response.statusCode).toBe(403);
    });
    it("should return 200 :POST /users/login", async () => {
        let user = users[0]
        const response = await request(app).post("/api/v1/users/login").send(user);
        expect(response.statusCode).toBe(200);
        expect(response.body.token !== undefined).toBe(true);
    });
    it("should return 403 <<INVALID-EMAIL>> :POST /users/login", async () => {
        let user = users[0]
        const response = await request(app).post("/api/v1/users/login").send({...user, email:"test@gmail"});
        expect(response.statusCode).toBe(403);
        expect(response.body.token !== undefined).toBe(false);
        expect(response.body).toHaveProperty("error");
    });
    it("should return 403 <<INVALID-PASSWORD>> :POST /users/login", async () => {
        let user = users[0]
        const response = await request(app).post("/api/v1/users/login").send({...user, password:"test_password"});
        expect(response.statusCode).toBe(403);
        expect(response.body.token !== undefined).toBe(false);
        expect(response.body).toHaveProperty("error");
    });
    it("should return 400 <<MISSING-PASSWORD>> :POST /users/login", async () => {
        let user = users[0]
        const response = await request(app).post("/api/v1/users/login").send({email:user.email});
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("message");
    });
    it("should return 400 <<MISSING-EMAIL>> :POST /users/login", async () => {
        let user = users[0]
        const response = await request(app).post("/api/v1/users/login").send({password:user.password});
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("message");
    });
    it("should return 201 :post /users/logout", async () => {
        let user = users[0]
        const response = await request(app).post("/api/v1/users/login").send(user);
        expect(response.body).toHaveProperty("token")
        const {body: {token}} = response;
        const logoutResponse = await request(app).post("/api/v1/users/logout").set('Authorization', `Bearer ${token}`).send()
        expect(logoutResponse.statusCode).toBe(200)
    })
    it("should return 402 :POST /users/logout", async () => {
        let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMzIwM2FhYS00N2MzLTRjYjItYjg4Zi1lNWNkMzEzNzMxMGIiLCJlbWFpbCI6ImVtbWFudWVsbmt1Yml0bzJAZ21haWwuY29tIiwic3RhdHVzIjoxLCJhY3RpdmUiOnRydWUsImFsbG93ZWQiOmZhbHNlLCJpYXQiOjE2NzQyMDIyODgsImV4cCI6MTY3NDI4ODY4OH0.qGvAl0IeWRM0h-zhGrYdjHT9X0Wi1hzEUkLCchxHF1A"
        const logoutResponse = await request(app).post("/api/v1/users/logout").set('Authorization', `Bearer ${token}`).send()
        expect(logoutResponse.statusCode).toBe(401)
    })

})