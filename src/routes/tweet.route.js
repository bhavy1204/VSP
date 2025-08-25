import { Router } from "express";
import { createTweet, getUserTweet, updateTweet, deleteTweet } from "../controllers/tweet.controller.js"

const router = Router();

router.route("/u/getTweet").get(getUserTweet);

router.route("/create").post(createTweet);

router.route("/update/:tweetId").put(updateTweet);

router.route("/delete/:tweetId").delete(deleteTweet);

export default router;