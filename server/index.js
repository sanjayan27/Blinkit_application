import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import connectMongo from './config/connectMongo.js'
import morgan from 'morgan'
import userRoutes from './router/userRouter.js'
import UserModel from './models/user.model.js'


const app = express()
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URI
}))

//middleware
app.use(express.json())
app.use(helmet())
app.use(cookieParser())
// app.use(morgan())

app.get('/',(req,res)=>{
    res.json({message:"message gotted"})

})
app.get('/api/user',async(req,res)=>{
    try{
        const dataR = await UserModel.find()
    res.json(dataR)
    }catch(err){
        console.log(err)
    }

})

app.use('/api/user',userRoutes)


const PORT = process.env.PORT || 5000

try{
    connectMongo().then(()=>{
        app.listen(PORT,()=>{
            console.log("port is running on ",PORT)
        })
    })
}catch(error){
    console.log(error.message)
    
}
