import c from "./cloudinaryConfig.js";
import fs from "fs"

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            return null;
        }
        console.log("CLOUDINARY API KEY in Cloudinary.js:", process.env.CLOUDINARY_API_KEY);
        console.log("Cloudinary current config:", c.config());

        const response = await c.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        fs.unlinkSync(localFilePath);
        console.log(response);
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath);
        return error;
    }
}

export { uploadOnCloudinary };