import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

const generatedRefreshToken = async (userID) => {
  const token = await jwt.sign({ userID }, process.env.SECRET_REFRESH_TOKEN, {
    expiresIn: "7d",
  });

  const updateRT = await UserModel.findByIdAndUpdate(
    userID,
    { refesh_token:token }
  );
  
  return token
};

export default generatedRefreshToken