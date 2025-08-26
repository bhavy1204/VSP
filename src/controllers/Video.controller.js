import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { Video } from "../models/video.model.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";


const getAllVideos = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const page = 1, limit = 10;

    const result = (await Video.find({ owner: userId }).skip((page - 1) * limit).limit(Number(limit)));

    return res.status(200).json(
        new APIResponse(200, result, "videos fetched successfully")
    )

})

const publishVideo = asyncHandler(async (req, res) => {
    const { title, description } = req.body;

    const userId = req.user._id;

    if (!title || !description) {
        throw new APIError(400, "title and description required")
    }

    const videoLocalPath = req.files?.video[0]?.path;
    const thumbnailLocalPath = req.files?.thumbnail[0]?.path;

    if (!videoLocalPath || !thumbnailLocalPath) {
        throw new APIError(400, "video and thumbnail path required")
    }

    const videoURL = await uploadOnCloudinary(videoLocalPath);

    const thumbnailURL = await uploadOnCloudinary(thumbnailLocalPath);

    const result = await Video.create({
        videoFile: videoURL?.url || "404",
        thumbnail: thumbnailURL?.url || "404",
        title: title,
        description: description,
        owner: userId,
        isPublished: true,
        views: 0,
        duration: videoURL?.duration || "404"
    })

    return res.status(200).json(
        new APIResponse(200, { videoURL, thumbnailURL, result }, "success")
    )

})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    if (!videoId) {
        throw new APIError(400, "video ID required")
    }

    const result = await Video.findByIdAndUpdate(videoId, { views: (views + 1) }, { new: true });

    if (!result) {
        throw new APIError(404, "No such video found")
    }

    return res.status(200).json(
        new APIResponse(200, result, "video fetched success")
    )

})

const updateVideo = asyncHandler(async (req, res) => {
    const { video, thumbnail, videoId } = req.files;

    const userId = req.user._id;

    if (!videoId) {
        throw new APIError(400, "Video ID required")
    }

    if (!thumbnail && !video) {
        throw new APIError(400, "video or thumbnail required")
    }

    const videoExists = await Video.findById(videoId);

    await findByIdAndUpdate(videoId)

})

const deleteVideo = asyncHandler(async (req, res) => {

})

const togglePublishStatus = asyncHandler(async (req, res) => {

})

export {
    getAllVideos,
    publishVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}
