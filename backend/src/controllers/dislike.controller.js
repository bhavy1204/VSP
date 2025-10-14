import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import { Like } from "../models/like.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Video } from "../models/video.model.js";
import { Comment } from "../models/comment.model.js"
import { Tweet } from "../models/tweet.model.js";
import { Dislike } from "../models/dislike.model.js";
import { User } from "../models/user.model.js"

const toggleVideoDislike = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    if (!videoId) {
        throw new APIError(404, "Video ID required");
    }

    const video = await Video.findById(videoId);

    if (!video) {
        throw new APIError(404, "No such video found");
    }

    const existingLike = await Like.findOne({ video: videoId, likedBy: req.user?._id });
    let existingDislike = "";

    if (existingLike) {
        await Like.deleteOne({ _id: existingLike._id })
        await Dislike.create({ video: videoId, dislikedBy: req.user?._id })
    } else {
        existingDislike = await Dislike.findOne({ video: videoId, dislikedBy: req.user?._id });
        if (existingDislike) {
            await Dislike.deleteOne({ _id: existingDislike._id })
        } else {
            await Dislike.create({ video: videoId, dislikedBy: req.user?._id })
        }
    }

    const dislikesCount = await Dislike.countDocuments({ video: videoId });

    const isDisliked = await Dislike.exists({ video: videoId,  dislikedBy: req.user?._id });

    return res.status(200).json({
        data: {
            isDisliked: !!isDisliked,
            dislikesCount
        },
        message: existingDislike ? "Video not disliked" : "Video disliked",
        status: 200
    })


});

const toggleCommentDislike = asyncHandler(async (req, res) => {
    const { commentId } = req.params;

    if (!commentId) {
        new APIError(404, "Comment ID required");
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
        new APIError(404, "No such Comment found");
    }

    const existingLike = await Like.find({ likedBy: req.user?._id, comment: commentId })
    const existingDislike = await Dislike.find({ dislikedBy: req.user?._id, comment: commentId });

    if (existingLike) {
        Like.deleteOne({ _id: existingLike._id })
        Dislike.create({ dislikedBy: req.user?._id, comment: commentId })
    } else {
        if (existingDislike) {
            Dislike.deleteOne({ _id: existingDislike._id })
        } else {
            Dislike.create({ dislikedBy: req.user?._id, comment: commentId })
        }
    }

    const isDisliked = await Dislike.exists({ comment: commentId, dislikedBy: req.user?._id });

    return res.status(200).json({
        data: {
            isDisliked: !!isDisliked,
        },
        message: existingDislike ? "comment not disliked" : "comment disliked",
        status: 200
    })

})

const toggleTweetDislike = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;

    if (!tweetId) {
        new APIError(404, "tweet ID required");
    }

    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
        new APIError(404, "No such tweet found");
    }

    const existingLike = await Like.find({ likedBy: req.user?._id, tweet: tweetId })
    const existingDislike = await Dislike.find({ dislikedBy: req.user?._id, tweet: tweetId });

    if (existingLike) {
        Like.deleteOne({ _id: existingLike._id })
        Dislike.create({ dislikedBy: req.user?._id, tweet: tweetId })
    } else {
        if (existingDislike) {
            Dislike.deleteOne({ _id: existingDislike._id })
        } else {
            Dislike.create({ dislikedBy: req.user?._id, comment: tweetId })
        }
    }

    const isDisliked = await Dislike.exists({ tweet: tweetId, dislikedBy: req.user?._id });

    return res.status(200).json({
        data: {
            isDisliked: !!isDisliked,
        },
        message: existingDislike ? "tweet not disliked" : "tweet disliked",
        status: 200
    })
})

const getDislikedVideo = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    if (!userId) {
        new APIError(404, "user ID required")
    }

    const user = await User.findById(userId);

    if (!user) {
        new APIError(404, "No such user found");
    }

    const dislikedVideos = await Dislike.find({ likedBy: userId });

    return res.status(200).json(
        new APIResponse(200, dislikedVideos, "dislike videos fetched")
    )
})

export {
    toggleVideoDislike,
    toggleCommentDislike,
    toggleTweetDislike,
    getDislikedVideo
}