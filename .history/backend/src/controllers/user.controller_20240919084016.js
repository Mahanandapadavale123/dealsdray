import { User } from "../models/user.model.js";
import mongoose from "mongoose";

import passport from  "passport";
import LocalStrategy from "passport-local"


// Passport Local Strategy
passport.use(new LocalStrategy({
  usernameField: 'f_userName',
  passwordField: 'f_Pwd'
},
async function(f_userName, f_Pwd, done) {
  try {      
      const user = await User.findOne({ f_userName: f_userName, f_Pwd : f_Pwd });
      if (!user) {
          return done(null, false, { message: 'Incorrect username and password.' });
      }
      const loggedInUser = await User.findById(user._id);

    return done(null, loggedInUser);
  } catch (error) {
    return done(error);
  }
}
));

// Serialize and deserialize user
passport.serializeUser((user, done) => {
done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
try {
  const user = await User.findById(id);
  done(null, user);
} catch (error) {
  done(error, false);
}
});


const loginUser = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {

    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(400).json({ status: false, message: info.message });
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.json({ status: true, message: "Login successful", user });
    });
  })(req, res, next);


  // const { f_userName, f_Pwd } = req.body;
  // console.log(req.body);
  
  // if (!f_userName && !f_Pwd) {
  //   return res.status(200).json({status:false, message:"f_userName or password is required"});
  // }

  // const user = await User.findOne({ f_userName: f_userName, f_Pwd : f_Pwd });
  // if (!user) {
  //   return res.status(200).json({status:false, message:"Invalid username and password"});
  // }
  // const loggedInUser = await User.findById(user._id);

  // return res.status(200)
  //   .json({ status:true, user: loggedInUser, message: "User logged In Successfully" });
    // res.redirect('/employee.route');
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
