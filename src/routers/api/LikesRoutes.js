import express from "express";
import Like from "../../models/Like.js";
import User from "../../models/User.js";

const router = express.Router();

router.patch("/", async (req, res) =>{
    try {
        let like = await Like.findOne({ blogId: req.body.blogId });
        let user = await User.findOne({ browserId: req.body.browserId });
        if(!user){
            user = new User({
                email:"",
                names:"",
                browserId:req.body.browserId
            })
            await  user.save()
        }
        if(!like){
            like = new Like({
                blogId:req.body.blogId,
                count: 1,
                lovers:[user._id]
            })
            await like.save()
        }else {
            let alreadyLike = await like.lovers.find(each => String(each) ===String(user._id) );
            if(alreadyLike){
                res.send({message:'user already likes blog'})
                return
            }else {
                like.count = like.count + 1
                like.lovers = [...like.lovers, user._id]

                await like.save()
            }
        }
        res.send(like)
    }catch (error) {
        res.status(404)
        res.send({ error: error || 'something went wrong' });
    }
})

export default router;