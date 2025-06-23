import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require : [true,"provide name"]
    },
    email : {
        type: String,
        require : [true, "provide email"]
    },
    password : {
        type: String,
        require : [true, " provide password"]
    },
    avatar : {
        type : String,
        default : ""
    },
    mobile: {
        default :null,
        type: Number,
        require: [true, "provide number"]
    },
    refesh_token : {
        type: String ,
        default : ""
    },
    verify_email: {
        type : Boolean, 
        default: false
    },
    last_login_date: {
        type: Date,
        default: ""
    },
    status: {
        type: String ,
        enum : ["Active","Inactive","Suspended"],
        default: "Active"
    },
    address_details : [
        {
            type: mongoose.Schema.ObjectId,
            ref : 'address'
        }
    ],
    shoping_cart : [
        {
            type: mongoose.Schema.ObjectId,
            ref : 'cartProduct'
        }
    ],
    orderHistory: [
        {
            type: mongoose.Schema.ObjectId,
            ref : 'order'
        }
    ],
    forgot_password_otp:{

        type: String,
        default: false
    },
    forgot_password_expiry:{
        type:Date,
        default: ""
    },
    role: {
        type: String ,
        enum: ["ADMIN","USER"],
        default: "USER"
    }
},{
    timestamps: true
})

const UserModel = mongoose.model("ShopTNuser",userSchema)

export default UserModel