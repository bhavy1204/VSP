import { Router } from "express";
import { viewChannelStat, getChannelVideos } from "../controllers/dashboard.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/channelStat").get(verifyJwt, viewChannelStat);
router.route("/getChannelVideo").get(verifyJwt, getChannelVideos);

export default router;