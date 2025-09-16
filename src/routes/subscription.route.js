import { Router } from "express";
import { toggleSubscription, getSubscribedChannel, getUserChannelSubscriber, checkSubscriptionStatus } from "../controllers/subscription.controller.js"
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/toggleSubscribe/:channelId").post(verifyJwt, toggleSubscription);

router.route("/c/getSubscriber/:channelId").get(getUserChannelSubscriber);

router.route("/u/getSubscribed/:subscriberId").get( getSubscribedChannel);

// // GET /api/v1/subscribe/status/:channelId
router.get("/status/:channelId", verifyJwt, checkSubscriptionStatus);


export default router;