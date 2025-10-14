import c from "./cloudinaryConfig.js";
import fs from "fs"

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            return null;
        }
        const response = await c.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        try {
            fs.unlinkSync(localFilePath); // cleanup
        } catch (err) {
            console.warn("File already deleted:", localFilePath);
        }
        return response;

    } catch (error) {
        try {
            fs.unlinkSync(localFilePath); // cleanup
        } catch (err) {
            console.warn("File already deleted:", localFilePath);
        }
        return error;
    }
}

export { uploadOnCloudinary };