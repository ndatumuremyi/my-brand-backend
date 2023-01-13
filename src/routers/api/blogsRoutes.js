import express from "express";
import {BlogController} from "../../controllers/blogController.js";
import {CommentController} from "../../controllers/commentController.js";
import {LikeController} from "../../controllers/likeController.js";
import Authenticate from "../../middlewares/passportAuthenticate.js";
import blogValidation from "../../validations/blogValidation.js";
import likeValidation from "../../validations/likeValidation.js";
import commentValidation from "../../validations/commentValidation.js";

const router = express.Router();

router.get("/",BlogController.findAllBlog);

router.post("/",Authenticate,blogValidation, BlogController.createBlog);

router.get("/random", BlogController.getRandom)
router.get("/:id", BlogController.getBlog);

router.patch("/:id",Authenticate, BlogController.updateBlog);

router.delete("/:id",Authenticate, BlogController.deleteBlog);
router.get("/:id/comments",BlogController.getAllComments)
router.post("/:id/comments",commentValidation, CommentController.addCommentFromBlog)
router.post("/:id/like",likeValidation, LikeController.like);
router.post("/:id/unlike",likeValidation, LikeController.unLike);

router.get("/:id/likes", LikeController.countLike);

export default router;
