import mongodb from "../database/mongodb.js";

test("database connection ", async () => {
    await mongodb.connect()
    expect(1).toBe(1)
});