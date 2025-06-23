import {v2 as cloudinary} from 'cloudinary'
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME_IMAGE,
    api_key: process.env.API_KEY_IMAGE,
    api_secret: process.env.API_SECRET_IMAGE
})

const uploadImageCloudinary =async(image)=>{
    const buffer= image.buffer || Buffer.from(await image.arrayBuffer())
    

    const uploadImage = await new Promise((resolve,reject)=>{
        cloudinary.uploader.upload_stream({folder: "shoptn"},(error,uploadresult)=>{
            return resolve(uploadresult)
        }).end(buffer)
    })
    return uploadImage
}
export default uploadImageCloudinary