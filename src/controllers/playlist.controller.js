import { APIError } from "../utils/APIError";
import { APIResponse } from "../utils/APIResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { Playlist } from "../models/playlist.model";
import { User } from "../models/user.model";
import { Video } from "../models/video.model";

const createPlaylist = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    if (!name) {
        throw new APIError(400, "Playlist name required");
    }

    const duplicate = await Playlist.findOne({ name: name })

    if (duplicate) {
        throw new APIError(400, "Playlist with same name exists")
    }

    let result = await Playlist.create({
        name: name,
        description: description,
        creator: req.user._id
    })

    return res.status(200).json(
        new APIResponse(200, result, "playlist created")
    )

});

const getUserplaylist = asyncHandler(async (req, res) => {
    const { userId } = req.params

    if (!userId) {
        throw new APIError(400, "user Id required")
    }

    const user = await User.findById(userId);

    if (!user) {
        throw new APIError(400, "no such user exists")
    }

    const playlists = await Playlist.find({ creator: userId });

    return res.status(200).json(
        new APIResponse(200, playlists, "Playlist fetched successfully")
    )

})

const getPlaylistById = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;

    if (!playlistId) {
        throw new APIError(400, "Playlist ID required");
    }

    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
        throw new APIError(404, "No uch playlist exists")
    }

    return res.status(200).json(
        new APIResponse(200, playlist, "playlist fetched successfully")
    )

})

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.params;

    if (!playlistId || !videoId) {
        throw new APIError(400, "playlist and video id required");
    }

    const playlist = await Playlist.findById(playlistId);

    const video = await Video.findById(videoId);

    if (!playlist || !video) {
        throw new APIError(404, "No such video or playlist found");
    }

    let result = await Playlist.findByIdAndUpdate({ _id: playlistId }, { $addToSet: { videos: videoId } }, { new: true }).populate("videos");

    return res.status(200).json(
        new APIResponse(200, result, "video added to playlist")
    )

})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.params;

    if (!playlistId || !videoId) {
        throw new APIError(400, "Playlist and videoID required");
    }

    const playlist = await Playlist.findById(playlistId);
    const video = await Video.findById(videoId);

    if (!playlist || !video) {
        throw new APIError(404, "No such playlist or video required")
    }

    const result = await Playlist.updateOne({ _id: playlistId }, { $pull: { videos: videoId } }, { new: true })

    return res.status(200).json(
        new APIError(200, result, "video removed successfully")
    )

})

const deletePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;

    if (!playlistId) {
        throw new APIError(400, "playlist ID required")
    }

    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
        throw new APIError(404, "No such playlist found")
    }

    const result = await Playlist.findOneAndDelete(playlistId);

    return res.status(200).json(
        new APIResponse(200, result, "playlist deleted successfully")
    )

})

const updatePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;
    const { name, description } = req.body;

    if (!playlistId) {
        throw new APIError(400, "playlistId is required")
    }

    if (!name || !description) {
        throw new APIError(400, "name and description is required")
    }

    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
        throw new APIError(404, "No such playlist found")
    }

    const result = await Playlist.updateOne({ _id: playlistId }, { name: name, description: description }, { new: true });

    return res.status(200).json(
        new APIResponse(200, result, "playlist updates successfully")
    )

})

export {
    createPlaylist,
    getUserplaylist,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
};