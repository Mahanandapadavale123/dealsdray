import { User } from "../models/user.model.js";
import mongoose from "mongoose";

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username && !password) {
    return res.status(400).json("username or email is required");
  }

  const user = await User.findOne({ username: username });
  if (!user) {
    return res.status(400).json("User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    return res.status(400).json("User does not exist");
  }

  const loggedInUser = await User.findById(user._id);

  return res
    .status(200)
    .json({ user: loggedInUser, message: "User logged In Successfully" });
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
