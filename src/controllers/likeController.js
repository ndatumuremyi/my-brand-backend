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
                user = await UserServices.createUser({email:"", names:"", browserId})
            }
            if(!like){
                like = await LikeServices.createLike({
                    blogId,
                    count: 1,
                    lovers:[user._id]
                })
            }else {
                let alreadyLike = await like.lovers.find(each => String(each) ===String(user._id) );
                if(alreadyLike){
                    throw {message:'user already likes blog', status:401}
                }else {
                    like.count = like.count + 1
                    like.lovers = [...like.lovers, user._id]

                    await like.save()
                }
            }
            return res.status(201).send({message:"Likes blog successful",data:like})
        }catch (error) {
            if(error.status){
                return res.status(error.status).json({error: error.message})
            }
            return res.status(500).json({ error: error?.message || 'something went wrong' });
        }
    }
    static async unLike(req, res){
        try {
            let blogId = req.params.id;
            const {browserId} = req.body
            let like = await LikeServices.findLikesByBlogId(blogId)
            let user = await UserServices.findUserByBrowserId(browserId)
            if(!user || !like){
                throw {status:401,message:'user doesn\'t liked the blog'}
            }
            else {
                let alreadyLike = await like.lovers.find(each => String(each) ===String(user._id) );
                if(alreadyLike){
                    like.count = like.count - 1
                    like.lovers = like.lovers.filter( each => String(each) !==String(user._id))

                    await like.save()

                }else {
                    throw {status:401,message:'user doesn\'t liked the blog'}
                }
            }
            return res.status(201).json({message:"unlike successful",data:like})
        }catch (error) {
            if(error.status){
                return res.status(error.status).json({error:error.message});
            }
            return res.status(500).json({ error: error?.message || 'something went wrong' });
        }
    }
}