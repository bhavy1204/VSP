import { asyncHandler } from "../utils/asyncHandler.js"
import { APIError } from "../utils/APIError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { APIResponse } from "../utils/APIResponse.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        user.save({ validateBefore: false });

        return { refreshToken, accessToken };

    } catch (error) {
        throw new APIError(500, "Something went wrong while generating tokens");
    }
}

const registerUser = asyncHandler(async (req, res) => {
    // User detail
    // console.log(req.body);
    const { username, email, fullName, password } = req.body;

    if ([username, fullName, password, email].some((field) => field?.trim() === "")) {
        throw new APIError(400, "ALl fields are required");
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
        throw new APIError(409, "username already exists");
    }
    // console.log(req.files); 
    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;

    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path;
    }

    if (!avatarLocalPath) {
        throw new APIError(400, "avatar is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if (!avatar) {
        throw new APIError(400, "avatar is required");
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        username: username.toLowerCase(),
        email,
        password,
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new APIError(505, "Something went wrong while registering")
    }

    return res.status(201).json(
        new APIResponse(201, createdUser, "user created successfuly")
    )

})

const loginUser = asyncHandler(async (req, res) => {
    console.log("login IN HIT");
    const { email, username, password } = req.body;

    if (!(email && username)) {
        throw new APIError(400, "Username and email required");
    }

    const user = await User.findOne({ $and: [{ username }, { email }] });

    if (!user) {
        throw new APIError(404, "user does not exists");
    }

    const isValidPassword = await user.isPasswordCorrect(password);

    if (!isValidPassword) {
        throw new APIError(400, "Password incorrect");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken ");

    console.log(loggedInUser);

    const accessTokenExpiry =7 * 24 * 60 * 60 * 1000;// 15 * 60 * 1000      // 15 minutes
    const refreshTokenExpiry = 7 * 24 * 60 * 60 * 1000; // 7 days

    const accessOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: accessTokenExpiry,  //make it persistent
    };

    const refreshOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: refreshTokenExpiry, //longer lifespan
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, accessOptions)
        .cookie("refreshToken", refreshToken, refreshOptions)
        .json(
            new APIResponse(200, { user: loggedInUser }, "UserLoggenIn successfully")
        )

})

const authMe = asyncHandler(async (req, res) => {

    const token = req.cookies?.accessToken || req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        throw new APIError(404, "Token required")
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decoded?._id).select("-password");

    if (!user) {
        throw new APIError(404, "No such user found")
    }

    res.status(200).json(
        new APIResponse(200, user, "user authenticated")
    );

})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, {
        $set: {
            refreshToken: null,
        }
    })

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new APIResponse(200, {}, "logout successfully"))
})

const refereshToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new APIError(401, "unauthorised request");
    }

    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

    const user = await User.findById(decodedToken?._id).select("-password");

    if (!user) {
        throw new APIError(401, "Invalid token")
    }

    if (user.refereshToken !== decodedToken) {
        throw new APIError(401, "Invalid token")
    }

    const options = {
        httpOnly: true,
        secure: true
    }

    const { accessToken, refereshToken } = await generateAccessAndRefreshToken(user._id);

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refereshToken, options)
        .json(
            new APIResponse(
                200,
                { accessToken, refereshToken, message: "AccessTokken refreshed" }
            )
        )

})

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user?._id);

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
        throw new APIError(400, "Incorrect password");
    }

    user.password = newPassword;

    await user.save({ validateBefore: false });

    return res.status(200)
        .json(new APIResponse(200, "password changed successfully"));

})

const getCurrentUser = asyncHandler(async (req, res) => {
    const user = req.user;
    return res.status(200)
        .json(200, user, "Fetched success");

})

const updateUserDetails = asyncHandler(async (req, res) => {
    const { fullName, email, username } = req.body;

    if (!fullName || !email || !username) {
        throw new APIError(400, "filed is empty");
    }

    const user = await User.findByIdAndUpdate(req.user?._id,
        {
            $set: {
                fullName: fullName,
                email: email,
                username: username,
            }
        },
        { new: true }
    ).select("-password");

    return res.status(200)
        .json(new APIResponse(200, user, "Updated successfully"))

})

const updateUserPfp = asyncHandler(async (req, res) => {
    const localPfpPath = req.file?.path;

    if (!localPfpPath) {
        throw new APIError(400, "file missing");
    }

    const userPfp = await uploadOnCloudinary(localPfpPath);

    if (!userPfp.url) {
        throw new APIError(400, "error while uploading");
    }

    const user = await User.findByIdAndUpdate(req.user?._id,
        {
            $set: { avatar: userPfp.url }
        }, { new: true }
    ).select("-password");

    return res.status(200)
        .json(200, user, "Avatar updated successfully");

})

const updateUserCoverImage = asyncHandler(async (req, res) => {
    const localCoverImgPath = req.file?.path;

    if (!localCoverImgPath) {
        throw new APIError(400, "File missing");
    }

    const coverImage = await uploadOnCloudinary(localCoverImgPath);

    if (!coverImage.url) {
        throw new APIError(400, "Error while uploading on cloud");
    }

    const user = await User.findByIdAndUpdate(req.user?._id,
        {
            $set:
            {
                coverImage: coverImage.url
            }
        },
        { new: true }
    ).select("-passord");

    return res.status(200)
        .json(200, user, "coverImage updated successfully");
})

const getUserChannelProfile = asyncHandler(async (req, res) => {
    const { username } = req.params;

    if (!username?.trim()) {
        throw new APIError(400, "username missing");
    }

    const channel = await User.aggregate([
        {
            $match: {
                username: username?.toLowerCase()
            }
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "channels",
                as: "subscribers"
            }
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "subscriber",
                as: "subscribedTo"
            }
        },
        {
            $addFields: {
                subcribersCount: {
                    $size: "$subscribers"
                },
                channelSunscribedToCount: {
                    $size: "$subscribedTo"
                },
                isSubsribed: {
                    $cond: {
                        if: { $in: [req.user?._id, ["subscribers.subscriber"]] },
                        then: true,
                        else: false
                    }
                }
            }
        },
        {
            $project: {
                fullName: 1,
                username: 1,
                subcribersCount: 1,
                channelSunscribedToCount: 1,
                isSubsribed: 1,
                email: 1,
                coverImage: 1,
                avatar: 1,
            }
        }
    ])

    if (!channel?.length) {
        throw new APIError(404, "Channel does not exists")
    }

    return res.status(200)
        .json(new APIResponse(200, channel[0], "user channel fetched success"));
})

const getWAtchHistory = asyncHandler(async (req, res) => {
    // Req.user._id gives us a string insted of the id as we are using mongoose. Originallly the _id is "objectid(idsometbbbckab)".
    // To ye chiz aggregate piplines me nhi use ho payegi kyuki pipeline me mongoose ese convert nhi kar sakta. 
    // to apne ko fir is id ko convert karna padta hai.
    const user = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $lookup: {
                from: "videos",
                localField: "watchHistory",
                foreignField: "_id",
                as: "watchHistory",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "owner",
                            foreignField: "_id",
                            as: "owners",
                            pipeline: [
                                {
                                    $project: {
                                        fullName: 1,
                                        username: 1,
                                        avatar: 1,
                                    }
                                }
                            ]
                        },
                    },
                    {
                        $addFields: {
                            owner: {
                                // giving first field of array which is returned. nothing much
                                $first: "$owner"
                            }
                        }
                    }
                ]
            }
        }
    ])

    return res.status(200)
        .json(
            new APIResponse(200, user[0].watchHistory, "history fteched success")
        )

})

export {
    authMe,
    registerUser,
    loginUser,
    logoutUser,
    refereshToken,
    changeCurrentPassword,
    getCurrentUser,
    updateUserCoverImage,
    updateUserPfp,
    updateUserDetails,
    getUserChannelProfile,
    getWAtchHistory
}