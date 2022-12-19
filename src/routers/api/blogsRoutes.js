import express from "express";
import multer from "multer";
import {BlogController} from "../../controllers/blogController.js";
import {CommentController} from "../../controllers/commentController.js";
import blogValidation from "../../validations/blogValidation.js";
import {LikeController} from "../../controllers/likeController.js";
import Authenticate from "../../middlewares/passportAuthenticate.js";

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

router.post("/",Authenticate,
    // blogValidation,
    upload.single('image'), BlogController.createBlog);


router.get("/:id", BlogController.getBlog);

router.patch("/:id",Authenticate, BlogController.updateBlog);

router.delete("/:id",Authenticate, BlogController.deleteBlog);
router.get("/:id/comments",BlogController.getAllComments)
router.post("/:id/comments", CommentController.addCommentFromBlog)
router.post("/:id/likes", LikeController.like);
router.get("/:id/likes", LikeController.countLike);

export default router;
