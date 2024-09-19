import { Router } from 'express'
import multer from "multer";

import {CreateEmployee, editEmployee, updateEmployee ,allEmployee, deleteEmployee} from "../controllers/employee.controller.js"

const router = Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/uploads/")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})

// Initialize Multer with storage
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
      cb(null, true); 
    } else {
      cb(new Error('Only .png and .jpg image files are allowed!'), false); 
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



router.route('/').get(allEmployee);

router.route('/').post(upload.fields([{ name: 'image', maxCount: 1 }]) ,CreateEmployee);

router.route('/:id').get(editEmployee);

router.route('/:id').put(upload.fields([{ name: 'image', maxCount: 1 }]) ,updateEmployee);

router.route ('/:id').delete(deleteEmployee);

router.route ('/:id/change-status').post(deleteEmployee);



export default router;
