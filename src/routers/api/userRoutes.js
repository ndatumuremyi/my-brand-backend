import express from "express";
import {UserController} from "../../controllers/userController.js";
import Authenticate from "../../middlewares/passportAuthenticate.js";
import AuthValidation from "../../validations/signupValidation.js";

const router = express.Router();

router.post("/login",AuthValidation, UserController.login)
router.post('/signup',AuthValidation, UserController.signUp)
router.patch("/logout",Authenticate, UserController.logout)

export default router;