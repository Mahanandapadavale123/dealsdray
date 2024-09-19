import multer from 'multer';
import mongoose from 'mongoose';
import { Employee } from "../models/employee.model.js"

 const CreateEmployee= async (req, res) => {
    const { name, email, mobileNo, designation,gender,course,image } = req.body; 
    //f_Id, f_Image, f_Name, f_Email,f_Mobile, f_Designation, f_gender,f_Course,f_Createdate

    if (!name || !email || !mobileNo || !designation || !gender || !course ) {
        return res.status(400).json({ message: "All field are mandatory" });
    }

    if (typeof name !== 'string') {
        return res.status(400).json({ message: "Name must be a valid string" });
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        return res.status(400).json({ message: "A valid email is required" });
    }

    const mobileNoPattern = /^\d{10}$/; // Example for a 10-digit phone number
    if (!mobileNoPattern.test(mobileNo)) {
        return res.status(400).json({ message: "A valid mobile number is required (10 digits)" });
    }

    if (typeof designation !== 'string' ) {
        return res.status(400).json({ message: "Designation must be a valid string" });
    }

    if (!['Male', 'Female', 'Other'].includes(gender)) {
        return res.status(400).json({ message: "Gender must be either Male, Female, or Other" });
    }

    if (!['MCA', 'BSC', 'BCA'].includes(course) ){
        return res.status(400).json({ message: "Course is must be a valid Courses" });
    }

    try {


        const isExist =await Employee.findOne({email:email});
        if(isExist){
            console.log(isExist);
            
            return res.status(400).json({ message: "Employee already exist" });
        }

        const employee = new Employee({ name, email, mobileNo, designation,gender,course,image });
        const savedEmp = await employee.save();

        return res.status(200).json({ emp: savedEmp, message: "Employee saved In Successfully" });

    } catch (err) {
        console.log(err);        
        res.status(500).send("Error saving employee");
    }
};

const allEmployee = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.render('employees', { employees });
    } catch (err) {
        res.status(500).send("Error fetching employees");
    }
};

const editEmployee=async (req, res) => {
    const { _id } = req.body;
    try {
        await Employee.findById(req.params.id, { name, email, mobileNo, designation,Gender,course,image});
        res.redirect('/employees');
    } catch (err) {
        res.status(500).send("Error updating employee");
    }
    };
    const updateEmployee =async (req, res) => {

    try {
        const employeeId = req.params.id;
        const updateData = req.body;

        // Log for debugging
        console.log(`Updating employee with ID: ${employeeId}`);
        console.log('Update data:', updateData);

        // Validate ObjectID
        if (!mongoose.Types.ObjectId.isValid(employeeId)) {
            return res.status(400).json({ message: "Invalid Employee ID format" });
        }

        // Find the employee by ID and update
        const updatedEmployee = await Employee.findByIdAndUpdate(employeeId, updateData, { new: true });

        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        // Send the updated employee details in the response
        res.status(200).json({ employee: updatedEmployee, message: "Employee updated successfully" });
    } catch (err) {
        console.error('Error updating employee:', err);
        res.status(500).json({ message: "Error updating employee", error: err.message });
    }
};

const deleteEmployee =async (req, res) => {
    
    try {
        const employeeId = req.params.id;

        // Validate ObjectID
        if (!mongoose.Types.ObjectId.isValid(employeeId)) {
            return res.status(400).json({ message: "Invalid Employee ID format" });
        }

        // Find the employee by ID
        const employee = await Employee.findByIdAndDelete(employeeId);

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        console.log('Employee found:', employee); // Log the employee data

        // Check if the employee has an avatar (image) and delete the file from the uploads folder
        if (employee.avatar) {
            const filePath = path.join(process.cwd(), 'uploads', employee.avatar);

            // Check if the file exists and delete it
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath); // Deletes the image file
                console.log('Image deleted:', filePath);
            }
        }

        res.status(200).json({ message: "Employee and associated image deleted successfully" });
    } catch (err) {
        console.error('Error details:', err); // Log the detailed error message
        res.status(500).json({ message: "Error deleting employee", error: err.message });
    }
};

export  {CreateEmployee, editEmployee,updateEmployee, allEmployee, deleteEmployee}
