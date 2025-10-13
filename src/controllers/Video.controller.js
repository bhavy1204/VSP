import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import { Video } from "../models/video.model.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { Like } from "../models/like.model.js";
import { User } from "../models/user.model.js";

const getAllPlatformVideo = asyncHandler(async (req, res) => {
    const page = 1, limit = 12;

    const result = await Video.find().select("title thumbnail views createdAt");

    return res.status(200).json(
        new APIResponse(200, result, "videos fetched")
    )
})

const search = asyncHandler(async (req, res) => {
  const q = req.query.q?.trim() || "";
  if (!q) {
    return res.status(200).json({ success: true, data: [] }); // empty search returns nothing
  }

  const regex = new RegExp(q, "i");
  const videos = await Video.find({
    $or: [
      { title: regex },
      { description: regex },
      { tags: regex },
    ],
  }).limit(50);

  res.status(200).json({
    success: true,
    data: videos,
  });
});


const getRecommendedVideos = asyncHandler(async (req, res) => {
    const user = await User.findById(req?.user?._id);

    // Find videos that have matching tags but are not uploaded by the user
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    if (!user) {

        let result = (await Video.find().skip((page - 1) * limit).limit(Number(limit)));

        return res.status(200).json(
            new APIResponse(200, result, "videos fetched successfully")
        )

    };

    // Convert Map to plain object for easier use
    const interests = Object.fromEntries(user.interests);

    // Sort tags by their score
    const topTags = Object.entries(interests)
        .sort(([, a], [, b]) => b - a)   // descending
        .slice(0, 5)                     // pick top 5 tags
        .map(([tag]) => tag);

    const recommendedVideos = await Video.find({
        owner: { $ne: req.user._id },   // don’t show own videos
        tags: { $in: topTags }          // match at least one tag
    })
        .skip((page - 1) * limit)
        .limit(limit);

    res.status(200).json({
        success: true,
        data: recommendedVideos,
        message: "Recommended videos fetched"
    });
});


const getAllVideos = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const page = 1, limit = 10;

    const result = (await Video.find({ owner: userId }).skip((page - 1) * limit).limit(Number(limit)));

    return res.status(200).json(
        new APIResponse(200, result, "videos fetched successfully")
    )

})

const publishVideo = asyncHandler(async (req, res) => {
    const { title, description, tags } = req.body;

    const userId = req.user._id;

    if (!title || !description) {
        throw new APIError(400, "title and description required")
    }

    if (!Array.isArray(tags)) {
        return res.status(400).json({ message: "Tags must be an array" });
    }

    // console.log("This is req files : ",req);

    const videoLocalPath = req.files?.video[0]?.path;

    const thumbnailLocalPath = req.files?.thumbnail[0]?.path;

    if (!videoLocalPath || !thumbnailLocalPath) {
        throw new APIError(400, "video and thumbnail path required")
    }

    const videoURL = await uploadOnCloudinary(videoLocalPath);

    const thumbnailURL = await uploadOnCloudinary(thumbnailLocalPath);

    if (!videoURL || !thumbnailURL) {
        throw new APIError(500, "Error while uploading to cloudinary")
    }

    const result = await Video.create({
        videoFile: videoURL?.url,
        thumbnail: thumbnailURL?.url,
        title: title,
        description: description,
        owner: userId,
        isPublished: true,
        tags: tags,
        views: 0,
        duration: videoURL?.duration
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

    const rawId = req.params.videoId.replace(":", "");

    const result = await Video.findByIdAndUpdate(rawId, { $inc: { views: 1 } }, { new: true }).populate("owner", "username avatar");

    if (!result) {
        throw new APIError(404, "No such video found id")
    }

    // Likes 
    const like = await Like.countDocuments({ video: videoId });

    const isLiked = await Like.findOne({
        video: videoId,
        likedBy: req.user?._id
    })

    return res.status(200).json(
        new APIResponse(200, { result, like, isLiked }, "video fetched success")
    )

})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    const newVideoPath = req.file?.newVideo[0].path;

    if (!newVideoPath) {
        throw new APIError(400, "video required")
    }

    if (!videoId) {
        throw new APIError(400, "Video ID required")
    }

    const videoExists = await Video.findById(videoId);

    if (!videoExists) {
        throw new APIError(404, "No such video found");
    }

    const newVideoURL = await uploadOnCloudinary(newVideoPath);

    if (!newVideoURL) {
        throw new APIError(500, "error while uploading to cloud")
    }

    const result = await Video.findByIdAndUpdate(videoId, {
        videoFile: newVideoURL?.url,
        duration: newVideoURL?.duration
    }, {
        new: true
    })

    return res.status(200).json(
        new APIResponse(200, result, "Video updated")
    )

})

const updateThumbnail = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    const { newThumbnailPath } = req.file?.newThumbnail[0]?.path;

    if (!newThumbnailPath) {
        throw new APIError(400, "thumbnail required");
    }

    if (!videoId) {
        throw new APIError(400, "video ID required")
    }

    const newThumbnailURL = await uploadOnCloudinary(newThumbnailPath);

    if (!newThumbnailURL) {
        throw new APIError(500, "Error while uploading thumbnail")
    }

    const result = await Video.findByIdAndUpdate(videoId, {
        thumbnail: newThumbnailURL.url
    }, {
        new: true
    })

    if (!result) {
        throw new APIError(404, "Video does not exists");
    }

    return res.status(200).json(
        new APIResponse(200, result, "thumbnail updated successfully")
    )

})

const updateVideoData = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    const { newTitle, newDesc } = req.body;


    if (!newTitle && !newDesc) {
        throw new APIError(400, "title or description required")
    }

    const updateFields = {};

    if (newTitle)
        updateFields.title = newTitle
    if (newDesc)
        updateFields.description = newDesc

    if (!videoId) {
        throw new APIError(400, "video ID required")
    }

    const result = await Video.findByIdAndUpdate(videoId, updateFields
        , {
            new: true
        })

    if (!result) {
        throw new APIError(404, "Video does not exists")
    }

    return res.status(200).json(
        new APIResponse(200, result, "video data updated")
    )

})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    if (!videoId) {
        throw new APIError(400, "Video id required")
    }

    const result = await Video.findByIdAndDelete(videoId);

    if (!result) {
        throw new APIError(404, "Video not found");
    }

    return res.status(200).json(
        new APIResponse(200, result, "video deleted")
    )

})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    if (!videoId) {
        throw new APIError(400, "video ID required");
    }

    const result = await Video.findByIdAndUpdate(videoId, {
        $bit: { isPublished: { xor: 1 } }
    }, {
        new: true
    })

    if (!result) {
        throw new APIError(404, "video not found")
    }

    return res.status(200).json(
        new APIResponse(200, result, "publish status toggled")
    )

})

export {
    getAllPlatformVideo,
    getAllVideos,
    publishVideo,
    getVideoById,
    updateVideo,
    updateThumbnail,
    updateVideoData,
    deleteVideo,
    togglePublishStatus,
    getRecommendedVideos,
    search
}
