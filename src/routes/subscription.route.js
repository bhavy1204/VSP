import { Router } from "express";
import { toggleSubscription, getSubscribedChannel, getUserChannelSubscriber } from "../controllers/subscription.controller.js"
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/toggleSubscribe/:channelId").post(verifyJwt, toggleSubscription);

router.route("/c/getSubscriber/:channelId").get(getUserChannelSubscriber);

router.route("/u/getSubscribed/:subscriberId").get( getSubscribedChannel);

export default router;