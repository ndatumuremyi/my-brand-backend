import express from "express";
import Comment from "../../models/Comment.js";
const router = express.Router()

router.get('/',  async (req, res) => {
    const comments = await Comment.find()
    res.send(comments)
})

router.post('/', async (req, res) => {
    const comment = new Comment({
        names:req.body.names,
        email:req.body.email,
        comment: req.body.comment,
        blogId:req.body.blogId
    })
    await comment.save()
    res.send(comment)
})

router.get("/:id", async (req, res) => {
    try{
        const comment = await Comment.findOne({_id : req.params.id})
        res. send(comment)
    }catch(e) {
        res.status(404)
        res.send({error:"Comment doesn't exist"})
    }
})

export default router