import {v2 as cloudinary} from 'cloudinary'
import  dotenv from 'dotenv'
dotenv.config()
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME_IMAGE,
    api_key: process.env.API_KEY_IMAGE,
    api_secret: process.env.API_SECRET_IMAGE
})

const uploadImageCloudinary =async(image)=>{
    if(!image || !image.buffer){
        throw new Error("No image provided or image buffer is empty")}
    const buffer= image.buffer || Buffer.from(await image.arrayBuffer())
    

    const uploadImage = await new Promise((resolve,reject)=>{
        cloudinary.uploader.upload_stream({folder: "shoptn"},(error,uploadresult)=>{
            if(error){
                console.log("Cloudinary error:",error)
                return reject(error)
            }
            return resolve(uploadresult)
        }).end(buffer)
    })
    return uploadImage
}
export default uploadImageCloudinary