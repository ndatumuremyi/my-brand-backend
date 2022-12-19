import express from "express";
import {MessageController} from "../../controllers/messageController.js";
import messageValidation from "../../validations/messageValidation.js";
const router = express.Router()
router.get('/',  MessageController.getAll)

router.post('/',messageValidation, MessageController.addOne)

router.get("/:id", MessageController.findOne)

export default router