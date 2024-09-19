import { Router } from "express";
import { loginUser,  logoutUser, isAuthenticated} from "../controllers/user.controller.js";


const router = Router()

router.route("/login").post(loginUser);
router.route("/isAuthenticated").post(isAuthenticated);
router.route("/logout").post(logoutUser);

export default router;