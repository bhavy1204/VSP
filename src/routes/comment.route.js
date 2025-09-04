import { Router } from "express";
import { addComment,deleteComment,updateComment,getVideoComment } from "../controllers/comment.controller.js";
import {verifyJwt} from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJwt);

router.route("/v/:videoId").get(getVideoComment).post(verifyJwt, addComment);

router.route("/c/:commentId").delete(verifyJwt, deleteComment).patch(verifyJwt, updateComment);

export default router;