import { Router } from "express";
import { viewChannelStat, getChannelVideos } from "../controllers/dashboard.controller";
const router = Router();

router.route("/channelStat",viewChannelStat);
router.route("/getChannelVideo", getChannelVideos)

export default router;