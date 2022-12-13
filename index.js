const express = require("express");
const mongoose = require("mongoose");
const blogsRoutes = require("./routes/blogs");
const commentsRoutes = require("./routes/comments");

mongoose
  .connect("mongodb://localhost:27017/mybrand", { useNewUrlParser: true })
  .then(() => {
    const app = express();
    app.use(express.json());
    app.use("/api/v1", blogsRoutes);
    app.use("/api/v1", commentsRoutes);

    app.listen(5000, () => {
      console.log("Server has started!");
    });
  });
