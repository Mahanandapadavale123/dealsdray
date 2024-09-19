import { Router } from 'express'
import multer from "multer";

import {CreateEmployee, editEmployee, allEmployee, deleteEmployee} from "../controllers/employee.controller.js"

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




// CREATE - Add a new employee
router.route('/').post(upload.fields([{ name: 'avatar', maxCount: 1 }]) ,CreateEmployee);

// READ - Get all employees
router.route('/')
.get(allEmployee);

// UPDATE - Edit an employee
router.route('/:id').post(editEmployee);

// DELETE - Remove an employee
router.route ('/delete/:id')
.post(deleteEmployee);

export default router;
