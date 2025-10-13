import { Router } from "express";
import { getAllVideos, getVideoById, publishVideo, updateVideo, updateThumbnail, updateVideoData, deleteVideo, togglePublishStatus, getAllPlatformVideo,getRecommendedVideos , search} from "../controllers/Video.controller.js"
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/v1/upload").get(getAllVideos).post( verifyJwt,
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

router.route("/get/all").get(getRecommendedVideos);

router.route("/get/:videoId").get(getVideoById);

router.route("/search").get(search);

router.route("/update/v/:videoId").put(verifyJwt, updateVideo);

router.route("/update/t/:videoId").put(verifyJwt, updateThumbnail);

router.route("/update/d/:videoId").put(verifyJwt, updateVideoData);

router.route("/delete/:videoId").delete(verifyJwt, deleteVideo);

router.route("togglePublish/:videoId").put(verifyJwt, togglePublishStatus);

export default router;