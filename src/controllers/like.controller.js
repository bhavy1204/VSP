import { mongoose, isValidObjectId } from "mongoose";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import { Like } from "../models/like.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Video } from "../models/video.model.js";
import { Comment } from "../models/comment.model.js"
import { Tweet } from "../models/tweet.model.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
    const { videoId, } = req.params;

    if (!videoId) {
        throw new APIError(400, "Video Id required");
    }

    const video = await Video.findById(videoId);

    if (!video) {
        throw new APIError(404, "Video Id invalid");
    }

    const isLiked = await Like.findOne({ video: videoId, likedBy: req.user._id });

    let result = null;

    if (isLiked) {
        result = await Like.findOneAndDelete({ video: videoId, likedBy: req.user._id });
        return res.status(200).json(
            new APIResponse(200, result, "Video unliked")
        )
    }

    result = await Like.create({ video: videoId, likedBy: req.user._id })

    return res.status(200).json(
        new APIResponse(200, result, "video Liked")
    )
})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const { commentId } = req.params;

    if (!commentId) {
        throw new APIError(400, "Comment ID required");
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
        throw new APIError(404, "Comment does not exists");
    }

    const isLiked = await Like.find({ likedBy: req.user._id, comment: commentId });

    let result = null;

    if (isLiked) {
        result = await Like.findOneAndDelete({ likedBy: req.user._id, comment: commentId })
        return res.status(200).json(
            new APIResponse(200, result, "unliked comment")
        )
    }

    result = await Like.create({ likedBy: req.user._id, comment: commentId })

    return res.status(200).json(
        new APIResponse(200, result, "liked comment")
    )

})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;

    if (!tweetId) {
        throw new APIError(400, "tweeet id required")
    }

    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
        throw new APIError(404, "No tweet found")
    }

    const isLiked = await Like.find({ tweet: tweetId, likedBy: req.user._id })

    let result = null;

    if (isLiked) {
        result = await Like.findOneAndDelete({ tweet: tweetId, likedBy: req.user._id })
        return res.status(200).json(
            new APIResponse(200, result, "unliked tweet")
        )
    }

    result = await Like.create({ likedBy: req.user._id, tweet: tweetId })

    return res.status(200).json(
        new APIResponse(200, result, "liked successfully")
    )
})

const getLikedVideos = asyncHandler(async (req, res) => {

})

export { toggleVideoLike, toggleCommentLike, toggleTweetLike, getLikedVideos }