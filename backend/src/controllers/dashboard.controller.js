import { Video } from "../models/video.model.js"
import { Subscription } from "../models/subscription.model.js"
import { Playlist} from "../models/playlist.model.js"
import { Tweet } from "../models/tweet.model.js"
import { User } from "../models/user.model.js"
import { Like } from "../models/like.model.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import {APIError} from "../utils/APIError.js"
import {APIResponse }from "../utils/APIResponse.js"

const viewChannelStat = asyncHandler(async (req, res) => {

    const { channelId } = req.body;

    if (!channelId) {
        throw new APIError(400, "channelId required");
    }

    const channel = await User.findById(channelId);

    if (!channel) {
        throw new APIError(404, "no such channel exists");
    }


    const totalSubscriber = await Subscription.countDocuments({ channel: channelId });

    const playlists = await Playlist.find({ creator: channelId });

    const totalVideos = await Video.countDocuments({ owner: channelId });

    const totalViews = await Video.aggregate([
        {
            $match: {
                channel: channelId
            }
        },
        {
            $group: {
                _id: "$owner",
                totalViews: { $sum: "$views" }
            }
        }
    ])

    const totalVideoLike = await Like.aggregate([
        {
            $lookup: {
                from: "videos",
                localField: "video",
                foreignField: "_id",
                as: "videoDoc"
            }
        },
        {
            $unwind: "$videoDoc"
        },
        {
            $match: {
                "videoDoc.owner": channelId
            }
        },
        {
            $group: {
                _id: "$videoDoc.owner",
                totalLikes: { $sum: 1 }
            }
        }
    ])

    const totalTweetLike = await Like.aggregate([
        {
            $lookup: {
                from: "tweets",
                localField: "tweet",
                foreignField: "_id",
                as: "tweetDoc"
            }
        },
        {
            $unwind: "$tweetDoc"
        },
        {
            $match: {
                "tweetDoc.creator": channelId
            }
        },
        {
            $group: {
                _id: "$tweetDoc.creator",
                totalTweetlikes: { $sum: 1 }
            }
        }
    ])


    res.status(200).json(
        new APIResponse(200,
            {
                totalSubscriber,
                totalVideos,
                totalViews,
                playlists,
                totalTweetLike,
                totalVideoLike,
            },
            "data fetched successfully")
    )

})

const getChannelVideos = asyncHandler(async (req, res) => {
    // All videos uploaded by channel
    const {channelId} = req.params;

    if (!channelId) {
        throw new APIError(400, "channel id required");
    }

    const channel = await User.findById(channelId);

    if (!channel) {
        throw new APIError(404, "no such channel exists")
    }

    const videos = await Video.find({ owner: channelId });

    return res.status(200).json(
        new APIResponse(200, videos, "video fetched successfully")
    )

})

export {
    viewChannelStat,
    getChannelVideos
}