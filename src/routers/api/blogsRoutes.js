import express from "express";
import Blog from "../../models/Blog.js";
import Comment from "../../models/Comment.js";
import fs from "fs";
import path from "path";
import multer from "multer";
import {BlogController} from "../../controllers/blogController.js";

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

router.post("/",upload.single('image'), BlogController.createBlog);

router.get("/:id", BlogController.getBlog);

router.patch("/:id", BlogController.updateBlog);

router.delete("/:id", BlogController.deleteBlog);
router.get("/:id/comments",BlogController.getAllComments)
export default router;
