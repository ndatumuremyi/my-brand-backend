/* globals expect it */
import User from "../models/User.js";
import Blog from "../models/Blog.js";
import setupDB from "../test-setup.js";
import blogs from "../seed/blog.seed.js";


setupDB('seedTesting', true)

it('Seeding test', async () => {
    const users = await User.find()

    expect(users.length).toBe(2)
    // Make sure password is hashed
    const firstUser = users[0]
    const isCorrectlyHashed = firstUser.verifyPassword('password')
    expect(isCorrectlyHashed).toBe(true)

    const blogsFetch = await Blog.find()
    expect(blogsFetch.length).toBe(blogs.length)

})