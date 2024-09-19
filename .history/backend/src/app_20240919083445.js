import express from "express"
import cookieParser from "cookie-parser"
import { Router } from "express";

import cors from 'cors';

import passport from  "passport";
import session from "express-session"
import LocalStrategy from "passport-local"
import bcrypt from "bcryptjs";


const app = express()
const router = Router();
app.use(router);

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
}));


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/public', express.static('public'));
app.use(cookieParser())


app.use(session({
    secret: 'mystrongSecretKey', 
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());



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



app.get('/', (req, res)=>{
    res.send('Node Started With PORT 8000');
})

import userRouter from './routes/user.routes.js'
import employeeRouter from './routes/employee.router.js'

app.use("/api/v1/users", userRouter)
app.use("/api/v1/employees", employeeRouter)


export { app }