import express from "express";
import {UserController} from "../../controllers/userController.js";
import {protectedRoute} from "../../middlewares/authProtected.js";

const router = express.Router();

router.post("/login", UserController.login)
router.post('/signup', UserController.signUp)
router.patch("/logout",protectedRoute, UserController.logout)

export default router;