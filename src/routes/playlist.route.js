import { Router } from "express";
import { createPlaylist, getUserplaylist, getPlaylistById, addVideoToPlaylist, removeVideoFromPlaylist, deletePlaylist, updatePlaylist } from "../controllers/playlist.controller.js"
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create").post(verifyJwt, createPlaylist);

router.route("/u/getplaylist/:userId").get(getUserplaylist);

router.route("/getplaylist/:playlistId").get(getPlaylistById);

router.route("/p/addVideo/:playlistId/:videoId").patch(verifyJwt, addVideoToPlaylist);

router.route("/p/removeVideo/:playlistId/:videoId").patch(verifyJwt, removeVideoFromPlaylist);

router.route("/p/delete/:playlistId").delete(verifyJwt, deletePlaylist);

router.route("/p/update/:playlistId").put(verifyJwt, updatePlaylist);

export default router;