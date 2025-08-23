import { Router } from "express";
import { toggleSubscription, getSubscribedChannel, getUserChannelSubscriber } from "../controllers/subscription.controller.js"
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").post(verifyJwt,toggleSubscription);

router.route("/").get(getUserChannelSubscriber);

router.route("/").get(verifyJwt, getSubscribedChannel);

export default router;