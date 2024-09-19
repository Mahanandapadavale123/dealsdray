import { Router } from "express";
import { loginUser,  isAuthenticated} from "../controllers/user.controller.js";


const router = Router()

router.route("/login").post(loginUser);
router.route("/isAuthenticated").post(isAuthenticated);

export default router;