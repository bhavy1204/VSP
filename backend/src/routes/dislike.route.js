// import { Router } from "express";
// import { toggleCommentDislike, toggleVideoDislike, toggleTweetDislike, getDislikedVideo } from "../controllers/dislike.controller.js";
// import { verifyJwt } from "../middlewares/auth.middleware.js";

// const router = Router();

// router.route("/toggle/v/:videoId").post(toggleVideoDislike)

// // router.route("/toggle/v/:videoId").post((req,res)=>res.send("Hit route"))

// router.route("/toggle/c/:commentId").post(verifyJwt,toggleCommentDislike)

// router.route("/toggle/t/:tweetId").post(verifyJwt, toggleTweetDislike)

// router.route("/dislike/videos").get(verifyJwt,getDislikedVideo)

// export default router

// src/routes/dislike.route.js
import { Router } from "express";
import {
  toggleCommentDislike,
  toggleVideoDislike,
  toggleTweetDislike,
  getDislikedVideo,
} from "../controllers/dislike.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

// Video dislike toggle
router.post("/toggle/v/:videoId", toggleVideoDislike);

// Comment dislike toggle
router.post("/toggle/c/:commentId", toggleCommentDislike);

// Tweet dislike toggle
router.post("/toggle/t/:tweetId", toggleTweetDislike);

// Get all disliked videos
router.get("/dislike/videos", getDislikedVideo);

// Optional quick test route to verify router works
router.post("/test", (req, res) => {
  res.send("Dislike router is working!");
});

export default router; // ⚠️ Make sure this exists
