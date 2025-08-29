import { googleLogIn } from "../controllers/googleLogIn.controller.js"
import { Router } from "express"

const router = Router();

router.route("/google/callback").post(googleLogIn);

export default router;

