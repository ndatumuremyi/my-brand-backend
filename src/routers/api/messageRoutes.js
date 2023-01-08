import express from "express";
import {MessageController} from "../../controllers/messageController.js";
import messageValidation from "../../validations/messageValidation.js";
import Authenticate from "../../middlewares/passportAuthenticate.js";
const router = express.Router()
router.get('/',Authenticate,  MessageController.getAll)

router.post('/',messageValidation, MessageController.addOne)

router.get("/:id", MessageController.findOne)

export default router