import express from "express";
import {
  forgetPasswordController,
  passwordResetController,
  resetAccessToken,
  updateUserController,
  uploadAvatar,
  userLoginController,
  userLogoutController,
  userRegistration,
  verifyEmailOtpController,
  verifyUserController,
} from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";

const userRoutes = express.Router();
userRoutes.post("/register", userRegistration);
userRoutes.post("/verify-email", verifyUserController);
userRoutes.post("/login", userLoginController);
userRoutes.get("/logout", auth, userLogoutController);
userRoutes.put("/upload-avatar", auth, upload.single("avatar"), uploadAvatar);
userRoutes.put("/update-user", auth, updateUserController);
userRoutes.put('/forget-password',forgetPasswordController)
userRoutes.put('/verify-otp',verifyEmailOtpController)
userRoutes.put('/reset-password',passwordResetController)
userRoutes.post('/refresh-token',resetAccessToken)

export default userRoutes;
