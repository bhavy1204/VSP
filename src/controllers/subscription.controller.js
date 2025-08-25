import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import { Subscription } from "../models/subscription.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";

const toggleSubscription = asyncHandler(async (req, res) => {
    const { channelId } = req.params;
    const userId = req.user._id;

    if (!channelId) {
        throw new APIError(400, "channel ID required")
    }

    const channel = await User.findById(channelId);

    if (!channel) {
        throw new APIError(404, "No such channell found");
    }

    if (channel._id.toString() === userId.toString()) {
        throw new APIError(400, "can not subscribe to ypurself")
    }

    const isSubscribed = await Subscription.findOne({ subscriber: userId, channel: channelId });

    let result, msg;

    if (isSubscribed) {
        result = await Subscription.deleteOne({ subscriber: userId, channel: channelId });

        msg = "unsubscribed";
    } else {
        result = await Subscription.create({ subscriber: userId, channel: channelId })

        msg = "subscribed";
    }

    return res.status(200).json(
        new APIResponse(200, result, msg)
    )

})

const getUserChannelSubscriber = asyncHandler(async (req, res) => {
    const { channelId } = req.params;
    const userId = req.user._id;

    if (!channelId) {
        throw new APIError(400, "channel id required");
    }

    const channel = await User.findById(channelId);

    if (!channel) {
        throw new APIError(404, "No such channel exists");
    }

    const result = await Subscription.aggregate([
        {
            $match: {
                channel: mongoose.Types.ObjectId(channelId)
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "subscriber",
                foreignField: "_id",
                as: "subscribers"
            }
        },
        {
            $unwind: "$subscribers",
        },
        {
            $group: {
                _id: "$channel",
                subscribers: { $push: "$subscribers" },
                subscriberCount: { $sum: 1 }
            }
        },
        {
            $project: {
                "subscribers.password": 0,
                "subscribers.refreshToken": 0,
            }
        }
    ])

    const data = result.length ?
        {
            channelId,
            subscriberCount: result[0].subscriberCount,
            subscribers: result[0].subscribers
        } :
        {
            channelId,
            subscriberCount: 0,
            subscribers: []
        }

    return res.status(200).json(
        new APIResponse(200, data, "subscribers fetched successfully")
    )

})

const getSubscribedChannel = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params;

    if (!subscriberId) {
        throw new APIError(400, "subscriber ID required")
    }

    const subscriber = await User.findById(subscriberId);

    if (!subscriber) {
        throw new APIError(404, "user not found");
    }

    const result = await Subscription.aggregate([
        {
            $match: {
                subscriber: mongoose.Types.ObjectId(subscriberId)
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "channel",
                foreignField: "_id",
                as: "channels"
            }
        },
        {
            $unwind: "$channels"
        },
        {
            $group: {
                _id: "$subscriber",
                channels: { $push: "$channels" },
                channelCount: { $sum: 1 }
            }
        },
        {
            $project: {
                "channels.password": 0,
                "channels.refreshToken": 0,
            }
        }
    ])

    const data = result.length ? {
        subscriberId,
        channelCount: result[0].channelCount,
        channels: result[0].channels
    }
        : {
            subscriberId,
            channelCount: 0,
            channels: []
        };

    return res.status(200).json(
        new APIResponse(200, data, "channels fetched successfully")
    )

})

export {
    toggleSubscription,
    getUserChannelSubscriber,
    getSubscribedChannel
}