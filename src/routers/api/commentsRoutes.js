import express from "express";
import {CommentController} from "../../controllers/commentController.js";
import commentValidation from "../../validations/commentValidation.js";
const router = express.Router()

router.get('/',  CommentController.getAllComments)

router.post('/', commentValidation, CommentController.addComment)

router.get("/:id", CommentController.findOne)

export default router