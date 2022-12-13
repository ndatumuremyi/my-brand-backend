const express = require("express")
const Comment = require("../models/Comment")
const router = express.Router()

router.get('/comments',  async (req, res) => {
    const comments = await Comment.find()
    res.send(comments)
})

router.post('/comments', async (req, res) => {
    const comment = new Comment({
        names:req.body.names,
        email:req.body.email,
        comment: req.body.comment,
        blogId:req.body.blogId
    })
    await comment.save()
    res.send(comment)
})

router.get("/comments/:id", async (req, res) => {
    try{
        const comment = await Comment.findOne({_id : req.params.id})
        res. send(comment)
    }catch(e) {
        res.status(404)
        res.send({error:"Comment doesn't exist"})
    }
})

module.exports = router