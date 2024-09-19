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
};


const isAuthenticated = async (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ isAuthenticated: true });
  } else {
    return res.json({ isAuthenticated: false });
  }
};



export { loginUser, isAuthenticated };
