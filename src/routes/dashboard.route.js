import { Router } from "express";
import { viewChannelStat, getChannelVideos } from "../controllers/dashboard.controller";
const router = Router();

router.route("/channelStat").get(viewChannelStat);
router.route("/getChannelVideo").get(getChannelVideos);

export default router;