import sendEmailVerification from "../config/sendEmail.js";
import userModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import UserModel from "../models/user.model.js";
import generatedAccessToken from "../utils/generatedAccessToken.js";
import generatedRefreshToken from "../utils/generatedRefreshToken.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";
import  generatedOTP  from "../utils/generatedOTP.js";
import otpEmailTemplate from "../utils/otpEmailTemplate.js";
import jwt from 'jsonwebtoken'

export async function userRegistration(request, response) {
  try {
    const { name, email, password } = request.body;
    const normalizeEmail = email.toLowerCase();

    if (!name || !normalizeEmail || !password) {
      return response.status(400).json({
        message: "provide your name, email, password",
        error: true,
        success: false,
      });
    }
    const checkEmail = await userModel.findOne({ email: normalizeEmail });
    if (checkEmail) {
      return response.status(401).json({
        message: "this email id is already exists",
        error: true,
        success: false,
      });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const payload = {
      name,
      email: normalizeEmail,
      password: hashPassword,
    };

    const newUser = new userModel(payload);
    const saveUser = await newUser.save();

    const verifyUrl = `${process.env.FRONTEND_URI}/verify-email?code=${saveUser?._id}`;

    const verifyEmail = await sendEmailVerification({
      sendTo: normalizeEmail,
      subject: "thanks for registered in shopTN",
      html: verifyEmailTemplate({
        name: name,
        URL: verifyUrl,
      }),
    });
    return response.status(200).json({
      message: "user Registered sucessfully",
      error: false,
      success: true,
      data: saveUser,
    });
  } catch (err) {
    return response.status(500).json({
      message: "provide your mongodb uri coorectly",
      error: true,
      success: false,
    });
  }
}

export async function verifyUserController(req, res) {
  try {
    const { code } = req.body;

    const checkCode = await UserModel.findOne({ code });

    if (!checkCode) {
      return res.json({
        message: "your not valid to this site",
        error: true,
        success: false,
      });
    }
    const updateUser = await UserModel.updateOne(
      { _id: code },
      { verify_email: true }
    );

    if (updateUser) {
      return res.json({
        message: "user verified successfuly",
        error: false,
        success: true,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "cannot verify your email",
      error: true,
      success: false,
    });
  }
}

//user login controlller
export async function userLoginController(req,res) {
  try {
    const { email, password } = req.body;
    const checkEmail = await UserModel.findOne({ email });

    if (!email || !password) {
      return res.json({
        message: "provide your email and password",
        error: true,
        success: false,
      });
    }

    if (!checkEmail){
      return res.status(401).json({
        message: "your email is not registered",
        error: true,
        success: false,
      });
    }

    if(checkEmail.status !== "Active"){
      return res
        .status(400)
        .json({ message: "Contact to admin", error: true, success: false });
    }

    const passwordCompare = await bcryptjs.compare(
      password,
      checkEmail.password
    );

    if (!passwordCompare) {
      return res.json({
        message: "password is incorrect",
        error: true,
        success: false,
      });
    }

    const accessToken = await generatedAccessToken(checkEmail._id);
    const refreshToken = await generatedRefreshToken(checkEmail._id);
    const cookieOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.cookie("accessToken", accessToken, cookieOption);
    res.cookie("refreshToken", refreshToken, cookieOption);

    return res.status(200).json({
      message: "user login successfully",
      error: false,
      success: true,
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//logout controller
export async function userLogoutController(req, res) {
  try {
    const optionCookie = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.clearCookie("accessToken", optionCookie);
    res.clearCookie("refreshToken", optionCookie);

    return res.json({
      message: "logout successfuly",
      error: false,
      success: true,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "user cannot logout", error: true, success: false });
  }
}

//upload image
export async function uploadAvatar(req, res) {
  try {
    const userID = req.userID;
    const image = req.file;
    const response = await uploadImageCloudinary(image);

    const storeResponse = await userModel.findByIdAndUpdate(userID, {
      avatar: response.url,
    });
    return res.status(200).json({
      message: "profile picture updated",
      data: {
        userID: userID,
        image: response.url,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
      error: true,
      success: false,
    });
  }
}

//update user details
export async function updateUserController(req, res) {
  try {
    const userId = req.userID;
    const { name, email, mobile, password } = req.body;
    let hashPassword = "";
    if (password) {
      const salt = await bcryptjs.genSalt(10);
      hashPassword = await bcryptjs.hash(password, salt);
    }
    const updateUser = await UserModel.updateOne(
      { _id: userId },
      {
        ...(name && { name: name }),
        ...(email && { email: email }),
        ...(mobile && { mobile: mobile }),
        ...(password && { password: hashPassword }),
      }
    );
    return res.status(200).json({
      message: " user updated successfully",
      data: updateUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//forgetPassword controller
export async function forgetPasswordController(req,res){
  try {
    const {email} = req.body
    if(!email){
      return res.status(400).json({
        message : 'provide a email',
        error : true,
        success :false
      })
    
    }
    const userValid = await UserModel.findOne({email})
    if(!userValid){
      return res.status(400).json({
        message : 'user is not valid or registered',
        error : true,
        success :false
      })
    }
    const otp = generatedOTP()
    const expiresIn = new Date() + 60 * 60 * 1000 //1hr

    const updateOtp = await UserModel.findByIdAndUpdate(userValid._id,{
      forgot_password_otp: otp,
      forgot_password_expiry : new Date(expiresIn).toISOString()
    })



    await sendEmailVerification({
      sendTo : email,
      subject : 'forget password otp generation',
      html:otpEmailTemplate({
        name : userValid.name,
        otp : otp
      })
    })

    return res.status(200).json({
      message:'check your email and enter the otp',
      error: false,
      success : true
    })
    
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error : true,
      success: false
    })
  }
}

//verify email controller
export async function verifyEmailOtpController(req,res) {
  try {
    const { email , otp } = req.body;
    
    if(!email || !otp){

      return res.status(401).json({
        message: 'provide required feilds',
        error: true,
        success: false
      })
    }
    const checkEmail = await UserModel.findOne({email})

    if(!checkEmail){
      return res.status(401).json({
        message: 'your not registered',
        error: true,
        success: false
      })
    }
    let currentTime = new Date()
    if(otp !== checkEmail.forgot_password_otp){
      return res.status(401).json({
        message: "OTP is incorrect",
        error:true,
        success : false
      })
    }
    if(currentTime  <! checkEmail.forgot_password_expiry){
        return res.status(401).json({
          message: "your otp is expired",
          error:true,
          success : false
        })
      }
      
      return res.status(200).json({
        message: "your otp is validated, now you can reset your password",
        error:false,
        success : true
      })
  } catch (error) {
    return res.status(500).json({
      message: 'your not authorized',
      error: true,
      success: false
    })
  }
}

//reset password controller
export async function passwordResetController(req,res){
  try {
    const {email, password , confirmPassword} = req.body
    if(!password || !confirmPassword){
      return res.json({
        message : 'provide password and confirm password',
        error : true,
        success: false
      })
    }
    const checkEmail = await UserModel.findOne({email})
    if(!checkEmail){
      return res.json({
        message : 'provide a valid email address',
        error: true,
        success: false
      })
    }

    if(password !== confirmPassword){
      return res.json({
        message : 'your entered unmatched password',
        error: true,
        success: false
      })
    }
    //password hashing
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password,salt)
    //storing db
    const storeNewPass = await UserModel.updateOne({email: email},{
      password: hashPassword
    })
    
    return res.status(200).json({
      message: "password was successfully resseted",
      error: false,
      success: true,
      data : storeNewPass
    })    

  } catch (error) {
    return res.status(500).json({
      message: 'your server is down try again later',
      error : true,
      success: false
    })
  }
}

//reset access token using refresh token
export async function resetAccessToken(req,res){
  try {
    const refreshToken = req.cookies.refreshToken || req?.header?.authorization?.split(" ")[1]
    if(!refreshToken){
     return res.status(401).json({
        message: 'unauthorized user',
        error: true,
        success: false
      })
    }

    const checkToken = await jwt.verify(refreshToken,process.env.SECRET_REFRESH_TOKEN)
    const userID = checkToken.userID
    const newAccessToken = await generatedAccessToken(userID)
    const optionCookie = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.cookie('accessToken',newAccessToken,optionCookie)
    return res.status(200).json({
      message:"access token was generated",
      error: false,
      success: true,
      data:{
        accessToken: newAccessToken
      } 
    })

  } catch (error) {
    return res.status(501).json({
      message: error.message || error,
      error: true,
      success: false
    })
  }
}