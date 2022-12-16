import express from "express";
import multer from "multer";
import {BlogController} from "../../controllers/blogController.js";
import {CommentController} from "../../controllers/commentController.js";
import blogValidation from "../../validations/blogValidation.js";
import {protectedRoute} from "../../middlewares/authProtected.js";
import {LikeController} from "../../controllers/likeController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

const upload = multer({ storage: storage });

router.get("/", BlogController.findAllBlog);

router.post("/",protectedRoute,upload.single('image'), BlogController.createBlog);

router.get("/:id", BlogController.getBlog);

router.patch("/:id",protectedRoute, BlogController.updateBlog);

router.delete("/:id",protectedRoute, BlogController.deleteBlog);
router.get("/:id/comments",BlogController.getAllComments)
router.post("/:id/comments", CommentController.addCommentFromBlog)
router.post("/:id/likes", LikeController.like);
router.get("/:id/likes", LikeController.countLike);

export default router;
