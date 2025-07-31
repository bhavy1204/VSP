import { Router } from "express";
import { loginUser, refereshToken, registerUser } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 3
        }
    ]),
    registerUser
);

router.route("/login").post(loginUser);

// secured routes(verfied that user is logged in )
router.route("/logout").post(verifyJwt, loginUser);

router.route("/refreshToken",refereshToken);

export default router;