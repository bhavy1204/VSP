import { asyncHandler } from "../utils/asyncHandler.js"
import { APIError } from "../utils/APIError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { APIResponse } from "../utils/APIResponse.js";
import jwt from "jsonwebtoken"

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
    const { email, username, password } = req.body;

    if (!(email && username)) {
        throw new APIError(400, "Username and email required");
    }

    const user = User.findOne({ $and: [{ username }, { email }] });

    if (!user) {
        throw new APIError(404, "user does not exists");
    }

    const isValidPassword = await user.isPasswordCorrect(password);

    if (!isValidPassword) {
        throw new APIError(404, "Password incorrect");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    const loggedInUser = user.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new APIResponse(200, { user: loggedInUser, accessToken, refreshToken }, "UserLoggenIn successfully")
        )

})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, {
        $set: {
            refreshToken: undefined,
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

    const user = await User.findById(decodedToken?._id);

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

export { 
    registerUser, 
    loginUser, 
    logoutUser, 
    refereshToken, 
    changeCurrentPassword, 
    getCurrentUser, 
    updateUserCoverImage, 
    updateUserPfp, 
    updateUserDetails 
}