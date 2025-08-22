import { Router } from "express";
import { addComment,deleteComment,updateComment,getVideoComment } from "../controllers/comment.controller";
import {verifyJwt} from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJwt);

router.route("/v/:videoId").get(getVideoComment).post(addComment);
router.route("/c/:commentId").delete(deleteComment).patch(updateComment);

export default router;