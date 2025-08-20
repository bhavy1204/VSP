import { Router } from "express";
import { addComment,deleteComment,updateComment,findTotalComments,getVideoComment } from "../controllers/comment.controller";

const router = Router();

router.route("/getVideoComment", getVideoComment);

router.route("/addComment", addComment);

router.route("/updateComment", updateComment);

router.route("/deleteComment", deleteComment);

router.route("/findTotalComments",findTotalComments);

export default router;