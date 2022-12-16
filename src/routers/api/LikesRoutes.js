import express from "express";
import {LikeController} from "../../controllers/likeController.js";
import likeValidation from "../../validations/likeValidation.js";

const router = express.Router();

router.patch("/",likeValidation, LikeController.like)
router.patch('/unlike',likeValidation, LikeController.unLike)

export default router;