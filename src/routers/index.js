import express from "express";
import articleRoutes from "./api/articleRoutes.js";
import blogsRoutes from "./api/blogsRoutes.js";
import commentsRoutes from "./api/commentsRoutes.js";
import LikesRoutes from "./api/LikesRoutes.js";
import UserRoutes from "./api/userRoutes.js";
import MessageRoutes from "./api/messageRoutes.js";
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from "../docs/swaggerOptions.js";


const routes = express.Router();
routes.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions),)
routes.use("/articles", articleRoutes)
routes.use("/blogs", blogsRoutes)
routes.use("/comments", commentsRoutes)
routes.use("/likes", LikesRoutes)
routes.use("/users", UserRoutes)
routes.use("/messages", MessageRoutes)



export default routes