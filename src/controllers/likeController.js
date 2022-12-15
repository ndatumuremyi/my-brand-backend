import Like from "../models/Like.js";
import User from "../models/User.js";
import {LikeServices} from "../services/likeService.js";
import {UserServices} from "../services/userService.js";

export class LikeController {
    static async like(req, res){
        try {
            let like = await LikeServices.findLikesByBlogId(req.body.blogId)
            let user = await UserServices.findUserByBrowserId(req.body.browserId)
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
    }
    static async unLike(req, res){
        try {
            let like = await LikeServices.findLikesByBlogId(req.body.blogId)
            let user = await UserServices.findUserByBrowserId(req.body.browserId)
            if(!user || !like){
                return res.status(200).json({error:"user doesn't liked the blog"})
            }
            else {
                let alreadyLike = await like.lovers.find(each => String(each) ===String(user._id) );
                if(alreadyLike){
                    like.count = like.count - 1
                    like.lovers = like.lovers.filter( each => String(each) !==String(user._id))

                    await like.save()

                }else {
                    res.send({message:'user doesn\'t liked the blog'})
                    return
                }
            }
            res.send(like)
        }catch (error) {
            res.status(404)
            res.send({ error: error || 'something went wrong' });
        }
    }
}