import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import User from '../models/user.model.js'; // Adjust the import based on your file structure

import userRouter from './routes/user.routes.js'
import employeeRouter from './routes/employee.router.js'


const app = express();

app.use(express.json());
app.use(cookieParser());

// Session middleware setup
app.use(session({
  secret: 'yourSecretKey',  // Replace with your own secret key
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 60000 }  // Set `secure: true` if using HTTPS
}));

// Login route
app.post('/api/v1/users/login', async (req, res) => {
  const { f_userName, f_Pwd } = req.body;
  
  if (!f_userName || !f_Pwd) {
    return res.status(400).json({ status: false, message: "Username or password is required" });
  }

  try {
    const user = await User.findOne({ f_userName, f_Pwd });

    if (!user) {
      return res.status(400).json({ status: false, message: "Invalid username or password" });
    }

    req.session.userId = user._id;  // Save user ID in session
    res.status(200).json({ status: true, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal server error" });
  }
});

// Check authentication middleware
app.get('/api/v1/users/isAuthenticated', (req, res) => {
  if (req.session.userId) {
    res.status(200).json({ isAuthenticated: true });
  } else {
    res.status(200).json({ isAuthenticated: false });
  }
});

// Logout route
app.post('/api/v1/users/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ status: false, message: "Failed to logout" });
    }
    res.status(200).json({ status: true, message: "Logged out successfully" });
  });
});





const router = Router();
app.use(router);

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true
}));


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/public', express.static('public'));
app.use(cookieParser())



app.get('/', (req, res)=>{
    res.send('Node Started With PORT 8000');
})



app.use("/api/v1/users", userRouter)
app.use("/api/v1/employees", employeeRouter)


export { app }