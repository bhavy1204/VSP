import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import { Comment } from "../models/comment.model.js";


const getVideoComment = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const pageNum = Number(page);
    const limitNum = Number(limit);

    const rawId = req.params.videoId.replace(":", "");

    const comments = await Comment.find({ video: rawId }).skip((pageNum - 1) * limitNum).limit(Number(limitNum));

    return res.status(200).json(
        new APIResponse(200, comments, "comments fetch successfully")
    )

})

const addComment = asyncHandler(async (req, res) => {
    const { ownerId, content, videoId } = req.body;

    if (!content || !ownerId || !videoId) {
        throw new APIError(400, "content, ownerId and videoId required")

    }

    const result = await Comment.create({
        content: content,
        video: videoId,
        owner: ownerId,
    })

    return res.status(200).json(
        new APIResponse(200, result, "comment added successfully")
    )

})

const updateComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const { newContent } = req.body;

    if (!newContent || !commentId) {
        console.log(commentId)
        console.log(newContent)
        throw new APIError(400, "content and commentId required")
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
        throw new APIError(404, "No such comment exists");
    }

    const result = await Comment.findByIdAndUpdate(commentId,
        {
            content: newContent
        },
        { new: true }
    )

    return res.status(200).json(
        new APIResponse(200, result, "comment updated successfully")
    )

})

const deleteComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    if (!commentId) {
        throw new APIError(400, "comment ID required");
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
        throw new APIError(400, "no such comment exists");
    }

    const result = await Comment.findByIdAndDelete(commentId);

    return res.status(200).json(
        new APIResponse(200, result, "comment deleted successfully")
    )
})

const findTotalComments = asyncHandler(async (req, res) => {
    const { videoId } = req.body;

    if (!videoId) {
        throw new APIError(400, "VideoId required");
    }

    const totalComments = await Comment.countDocuments({ video: videoId });

    return res.status(200).json(
        new APIResponse(200, totalComments, "comments number fetched")
    )

})

export {
    getVideoComment,
    addComment,
    updateComment,
    deleteComment,
    findTotalComments
}