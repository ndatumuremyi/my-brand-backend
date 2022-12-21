import express from "express";
import {BlogController} from "../../controllers/blogController.js";
import {CommentController} from "../../controllers/commentController.js";
import {LikeController} from "../../controllers/likeController.js";
import Authenticate from "../../middlewares/passportAuthenticate.js";

const router = express.Router();

router.get("/", BlogController.findAllBlog);

router.post("/",Authenticate, BlogController.createBlog);


router.get("/:id", BlogController.getBlog);

router.patch("/:id",Authenticate, BlogController.updateBlog);

router.delete("/:id",Authenticate, BlogController.deleteBlog);
router.get("/:id/comments",BlogController.getAllComments)
router.post("/:id/comments", CommentController.addCommentFromBlog)
router.post("/:id/likes", LikeController.like);
router.get("/:id/likes", LikeController.countLike);

export default router;
