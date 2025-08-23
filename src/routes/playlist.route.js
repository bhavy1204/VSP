import { Router } from "express";
import { createPlaylist, getUserplaylist, getPlaylistById, addVideoToPlaylist, removeVideoFromPlaylist, deletePlaylist, updatePlaylist } from "../controllers/playlist.controller.js"

const router = Router();

router.route("/create").post(createPlaylist);

router.route("/u/getplaylist/:userId").get(getUserplaylist);

router.route("/getplaylist/:playlistId").get(getPlaylistById);

router.route("/p/addVideo/:playlistId/:videoId").patch(addVideoToPlaylist);

router.route("/p/removeVideo/:playlistId/:videoId").patch(removeVideoFromPlaylist);

router.route("/p/delete/:playlistId").delete(deletePlaylist);

router.route("/p/update/:playlistId").put(updatePlaylist);

export default router;