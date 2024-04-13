import fs from "fs"
import { v2 as cloudinary } from "cloudinary"
import { config } from "@/config/config";


cloudinary.config({
  cloud_name: config.cloudinaryCloudName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinaryApiSecret
});

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto"
    })
    // file has been uploaded successfull
    //console.log("file is uploaded on cloudinary ", response.url);
    fs.unlinkSync(localFilePath)
    return response;

  } catch (error) {
    fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
    return null;
  }
}
