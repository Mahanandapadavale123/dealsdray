import { User } from "../models/user.model.js";
import mongoose from "mongoose";

const loginUser = async (req, res) => {
  const { f_userName, f_Pwd } = req.body;
  console.log(req.body);
  
  if (!f_userName && !f_Pwd) {
    return res.status(200).json({status:false, message:"f_userName or password is required"});
  }

  const user = await User.findOne({ f_userName: f_userName, f_Pwd : f_Pwd });
  if (!user) {
    return res.status(200).json({status:false, message:"Invalid username and password"});
  }
  const loggedInUser = await User.findById(user._id);

  return res.status(200)
    .json({ status:true, user: loggedInUser, message: "User logged In Successfully" });
};


const logoutUser = async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1 // this removes the field from document
      }
    },
    {
      new: true
    }
  );

  const options = {
    httpOnly: true,
    secure: true
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
};

const getCurrentUser = async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User fetched successfully"));
};

export { loginUser, logoutUser, getCurrentUser };
