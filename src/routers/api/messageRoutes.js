import express from "express";
import {CommentController} from "../../controllers/commentController.js";
import commentValidation from "../../validations/commentValidation.js";
import {MessageController} from "../../controllers/messageController.js";
const router = express.Router()

router.get('/',  MessageController.getAll)

router.post('/', MessageController.addOne)

router.get("/:id", MessageController.findOne)

export default router