import express from "express";
import articleRoutes from "./api/articleRoutes.js";
import blogsRoutes from "./api/blogsRoutes.js";
import commentsRoutes from "./api/commentsRoutes.js";
import LikesRoutes from "./api/LikesRoutes.js";


const routes = express.Router();
routes.use("/articles", articleRoutes)
routes.use("/blogs", blogsRoutes)
routes.use("/comments", commentsRoutes)
routes.use("/likes", LikesRoutes)


export default routes