import express from "express";
import articleRoutes from "./api/articleRoutes.js";

const routes = express.Router();
routes.use("/articles", articleRoutes)


export default routes