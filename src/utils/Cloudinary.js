import { v2 } from "cloudinary";
import exp from "constants";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            return null;
        }
        
        const response = await v2.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        console.log("File uploaded to cloud" + response.url);
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath);
        return null;
    }
}

export { uploadOnCloudinary };