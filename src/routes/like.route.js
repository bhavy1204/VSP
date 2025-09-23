import { Router } from "express";
import { getLikedVideos, toggleCommentLike, toggleVideoLike, toggleTweetLike } from "../controllers/like.controller.js"
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/toggle/v/:videoId").post(verifyJwt, toggleVideoLike);

// router.route("/toggle/v/:videoId").post((req,res)=>res.send("Hit route"))

router.route("/toggle/c/:commentId").post(verifyJwt, toggleCommentLike);

router.route("/toggle/t/:tweetId").post(verifyJwt, toggleTweetLike);

router.route("/like/videos").get(verifyJwt, getLikedVideos);

export default router;