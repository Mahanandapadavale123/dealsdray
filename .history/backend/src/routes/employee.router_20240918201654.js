import { Router } from 'express'
import multer from "multer";

import {CreateEmployee, editEmployee, updateEmployee ,allEmployee, deleteEmployee} from "../controllers/employee.controller.js"

const router = Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})

// Initialize Multer with storage
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith('image/')) {
          cb(null, true); // Accept the file if it's an image
      } else {
          cb(new Error('Only image files are allowed!'), false); // Reject non-image files
      }
  }
});

//login user
// app.post('/login', async (req, res) => {
//   const { userName, password } = req.body;
//   try {
//     const user = await Login.findOne({ f_userName: userName });
//     if (!user || !bcrypt.compareSync(password, user.f_Pwd)) {
//       return res.status(401).json({ message: 'Invalid Credentials' });
//     }
//     const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
//     res.json({ token });
//   } catch (err) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// // Route to fetch all employees
// app.get('/employees', async (req, res) => {
//   try {
//     const employees = await Employee.find();
//     res.json(employees);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching employees' });
//   }
// });




// CREATE - Add a new employee
router.route('/').post(upload.fields([{ name: 'avatar', maxCount: 1 }]) ,CreateEmployee);

// READ - Get all employees
router.route('/').get(allEmployee);

// Edit an employee
router.route('/:id').get(editEmployee);

// UPDATE - Edit an employee
router.route('/:id').put(updateEmployee);

// DELETE - Remove an employee
router.route ('/:id').delete(deleteEmployee);

export default router;
