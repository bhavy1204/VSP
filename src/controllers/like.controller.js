import { mongoose, isValidObjectId } from "mongoose";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import { Like } from "../models/like.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Video } from "../models/video.model.js";
import { Comment } from "../models/comment.model.js"
import { Tweet } from "../models/tweet.model.js";
import { User } from "../models/user.model.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    if (!videoId) {
        throw new APIError(400, "Video Id required");
    }

    const video = await Video.findById(videoId);

    if (!video) {
        throw new APIError(404, "Video Id invalid");
    }

    const existingLike = await Like.findOne({ video: videoId, likedBy: req.user._id });

    if (existingLike) {
        // If liked, remove like
        await Like.deleteOne({ _id: existingLike._id });
    } else {
        // If not liked, create like
        await Like.create({ video: videoId, likedBy: req.user._id });
    }

    // Get updated total likes
    const likesCount = await Like.countDocuments({ video: videoId });

    // Check if user currently likes the video
    const isLiked = await Like.exists({ video: videoId, likedBy: req.user._id });

    return res.status(200).json({
        data: {
            likesCount,
            isLiked: !!isLiked
        },
        message: existingLike ? "Video unliked" : "Video liked",
        status: 200
    });
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
    const userId = req.user?._id;

    if (!userId) {
        throw new APIError(404, "user ID required");
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new APIError(404, "No such user found");
    }

    // fetch liked videos with aggregation
    const likedVideos = await Like.aggregate([
        { $match: { likedBy: userId } },
        {
            $lookup: {
                from: "videos",
                localField: "video",
                foreignField: "_id",
                as: "videoDetails"
            }
        },
        { $unwind: "$videoDetails" }, // automatically skips likes without a video
        { $replaceRoot: { newRoot: "$videoDetails" } } // return only video objects
    ]);

    // no need to map, aggregation already returns video objects
    return res.status(200).json(
        new APIResponse(200, likedVideos, "liked videos fetched successfully")
    );
});


export { toggleVideoLike, toggleCommentLike, toggleTweetLike, getLikedVideos }