import express from "express";
import {ArticleController} from "../../controllers/articleController.js";

const route = express.Router();

route.post("/", ArticleController.createArticle)
export default route