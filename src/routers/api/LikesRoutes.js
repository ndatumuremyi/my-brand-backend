import express from "express";
import Like from "../../models/Like.js";
import User from "../../models/User.js";
import {LikeController} from "../../controllers/likeController.js";

const router = express.Router();

router.patch("/", LikeController.like)
router.patch('/unlike', LikeController.unLike)

export default router;