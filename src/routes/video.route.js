import { Router } from "express";
import { getAllVideos, getVideoById, publishVideo, updateVideo, deleteVideo, togglePublishStatus } from "../controllers/Video.controller.js"
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/v1").get(getAllVideos).post( verifyJwt,
    upload.fields([
        {
            name: "video",
            maxCount: 1
        },
        {
            name: "thumbnail",
            maxCount: 1
        }
    ]), 
    publishVideo);

router.route("/get/:videoId").put(getVideoById);

router.route("/update/:videoId").put(updateVideo);

router.route("/delete").delete(deleteVideo);

router.route("togglePublish/:videoId").put(togglePublishStatus);

export default router;