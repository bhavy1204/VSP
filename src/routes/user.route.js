import { Router } from "express";
import { loginUser, refereshToken, registerUser, logoutUser, changeCurrentPassword, getCurrentUser, updateUserDetails, updateUserPfp, updateUserCoverImage, getUserChannelProfile, getWAtchHistory } from "../controllers/user.controllers.js";
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
router.route("/logout").post(verifyJwt, logoutUser);

router.route("/refreshToken").post(refereshToken);

router.route("/changePassword").post(verifyJwt, changeCurrentPassword);

router.route("/curentUser").get(verifyJwt, getCurrentUser);

router.route("/updateAccountDetails").patch(verifyJwt, updateUserDetails);

router.route("/changeAvatar").patch(verifyJwt, upload.single("avatar"), updateUserPfp);

router.route("/changeCoverImage").patch(verifyJwt, upload.single("coverImage"), updateUserCoverImage);

router.route("/c/:username").get(verifyJwt, getUserChannelProfile);

router.route("/watchHistory").get(verifyJwt, getWAtchHistory);

export default router;