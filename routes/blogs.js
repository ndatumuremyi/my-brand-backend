const express = require("express");
const Blog = require("../models/Blog");
const Comment = require("../models/Comment")
const router = express.Router();

router.get("/blogs", async (req, res) => {
  const posts = await Blog.find();
  res.send(posts);
});

router.post("/blogs", async (req, res) => {
  const post = new Blog({
    title: req.body.title,
    category: req.body.category,
    description:req.body.description,
    image:req.body.image
  });
  await post.save();
  res.send(post);
});

router.get("/blogs/:id", async (req, res) => {
  try {
    const post = await Blog.findOne({ _id: req.params.id });
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Blog doesn't exist!" });
  }
});

router.patch("/blogs/:id", async (req, res) => {
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

router.delete("/blogs/:id", async (req, res) => {
  try {
    await Blog.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Blog doesn't exist!" });
  }
});
router.get("/blogs/:id/comments", async (req, res) => {
  try{
    const comments = await Comment.find({blogId:req.params.id})
    res.send(comments)
  }catch (error){
    res.status(404)
    res.send({error: error})
  }

})
router.patch("/blogs/:id/like", async (req, res) => {
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
router.patch("/blogs/:id/unlike", async (req, res) => {
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
module.exports = router;
