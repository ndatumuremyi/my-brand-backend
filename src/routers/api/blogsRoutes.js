import express from "express";
import Blog from "../../models/Blog.js";
import Comment from "../../models/Comment.js";
import fs from "fs";
import path from "path";
import multer from "multer";

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

router.get("/", async (req, res) => {
  const posts = await Blog.find();
  res.send(posts);
});

router.post("/",upload.single('image'), async (req, res) => {
  const post = new Blog({
    title: req.body.title,
    category: req.body.category,
    description:req.body.description,
    image:{
      data: fs.readFileSync(path.join(process.cwd() + '/uploads/' + req.file.filename)),
      contentType: req.file.mimetype
    }
  });
  await post.save();
  res.send(post);
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Blog.findOne({ _id: req.params.id });
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Blog doesn't exist!" });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const post = await Blog.findOne({ _id: req.params.id });

    if (req.body.title) {
      post.title = req.body.title;
    }

    if (req.body.description) {
      post.description = req.body.description;
    }
    if(req.body.image){
      post.image = req.body.description;
    }
    if(req.body.category){
      post.category = req.body.category
    }

    await post.save();
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Blog doesn't exist!" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Blog.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Blog doesn't exist!" });
  }
});
router.get("/:id/comments", async (req, res) => {
  try{
    const comments = await Comment.find({blogId:req.params.id})
    res.send(comments)
  }catch (error){
    res.status(404)
    res.send({error: error})
  }

})
router.patch("/:id/like", async (req, res) => {
  try {
    const post = await Blog.findOne({ _id: req.params.id });

    if (post.likes) {
      post.likes = post.likes + 1
    }else{
      post.likes = 1
    }

    await post.save();
    res.send(post);
  } catch(error) {
    res.status(404);
    res.send({ error: error || 'blog does not exist' });
  }
})
router.patch("/:id/unlike", async (req, res) => {
  try {
    const post = await Blog.findOne({ _id: req.params.id });

    if (post.likes && post.likes >0) {
      post.likes = post.likes - 1
    }else{
      throw("can't unlike comment")
    }

    await post.save();
    res.send(post);
  } catch(error) {
    res.status(404);
    res.send({ error: error || 'blog does not exist' });
  }
})
export default router;
