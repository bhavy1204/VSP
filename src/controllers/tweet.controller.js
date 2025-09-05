import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import { Tweet } from "../models/tweet.model.js"

const getAllTweet = asyncHandler(async(req,res)=>{
    const result = await Tweet.find();

    return res.status(200).json(
        new APIResponse(200, result, "all tweets fetched")
    )
})

const createTweet = asyncHandler(async (req, res) => {
    const { content } = req.body;
    const userId = req.user._id;

    if (!content) {
        throw new APIError(400, "content required")
    }

    const result = await Tweet.create({ content: content, creator: userId });

    return res.status(200).json(
        new APIResponse(200, { result }, "Tweet created")
    )
})

const getUserTweet = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    if (!userId) {
        throw new APIError(400, "userId required")
    }

    const result = await Tweet.find({ creator: userId })

    return res.status(200).json(
        new APIResponse(200, result, "Tweets fetched successfully")
    )

})

const updateTweet = asyncHandler(async (req, res) => {
    const {tweetId} = req.params;
    const { Newcontent } = req.body;

    if (!Newcontent) {
        throw new APIError(400, "content required")
    }

    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
        throw new APIError(404, "No tweet found")
    }

    const result = await Tweet.updateOne({ _id: tweetId }, { content: Newcontent }, { new: true })

    return res.status(200).json(
        new APIResponse(200, result, "Tweet created")
    )
})

const deleteTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;

    if (!tweetId) {
        throw new APIError(400, "tweet id required")
    }

    const result = await Tweet.findByIdAndDelete(tweetId);

    if (!result) {
        throw new APIError(404, "tweet not found")
    }

    return res.status(200).json(
        new APIResponse(200, result, "tweet deleted")
    )
})

export {
    getAllTweet,
    createTweet,
    getUserTweet,
    updateTweet,
    deleteTweet
}







