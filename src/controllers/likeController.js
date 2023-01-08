import {LikeServices} from "../services/likeService.js";
import {UserServices} from "../services/userService.js";

export class LikeController {
    static async countLike(req, res){
        try {
            let blogId = req.params.id;
            let like = await LikeServices.findLikesByBlogId(blogId)

            return res.status(200).json({count:like.count})
        }catch (e) {
            res.status(404)
            return res.json({ error: e || 'something went wrong' });
        }
    }
    static async like(req, res){
        try {
            let blogId = req.params.id;
            const {browserId} = req.body
            if(!blogId){
                blogId = req.body.blogId
            }
            let like = await LikeServices.findLikesByBlogId(blogId)
            let user = await UserServices.findUserByBrowserId(browserId)
            if(!user){
                user = UserServices.createUser({
                    email:"",
                    names:"",
                    browserId
                })
            }
            if(!like){
                like = LikeServices.createLike({
                    blogId,
                    count: 1,
                    lovers:[user._id]
                })
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
            return res.json({ error: error || 'something went wrong' });
        }
    }
    static async unLike(req, res){
        try {
            const {blogId, browserId} = req.body
            let like = await LikeServices.findLikesByBlogId(blogId)
            let user = await UserServices.findUserByBrowserId(browserId)
            if(!user || !like){
                return res.status(401).json({error:"user doesn't liked the blog"})
            }
            else {
                let alreadyLike = await like.lovers.find(each => String(each) ===String(user._id) );
                if(alreadyLike){
                    like.count = like.count - 1
                    like.lovers = like.lovers.filter( each => String(each) !==String(user._id))

                    await like.save()

                }else {
                    return res.json({message:'user doesn\'t liked the blog'})
                }
            }
            return res.json(like)
        }catch (error) {
            return res.status(500).json({ error: error || 'something went wrong' });
        }
    }
}