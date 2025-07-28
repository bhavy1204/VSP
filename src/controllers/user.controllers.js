import { asyncHandler } from "../utils/asyncHandler.js"
import { APIError } from "../utils/APIError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { APIResponse } from "../utils/APIResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    // User detail
    console.log(req.body);
    const { username, email, fullName, password } = req.body;

    if ([username, fullName, password, email].some((field) => field?.trim() === "")) {
        throw new APIError(400, "ALl fields are required");
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
        throw new APIError(409, "username already exists");
    }
    console.log(req.files);
    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
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

export { registerUser }