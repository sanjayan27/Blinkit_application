import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

if(!process.env.MONGODB_URI){
    throw new Error("Please provide a mongodb connection string")
}

const connectMongo=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('mongo db is connected')
    } catch (error) {
        console.log(error)
    }
}

export default connectMongo