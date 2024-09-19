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
    if (!['HR', 'Manager', 'Sales'].includes(designation)) {
        return res.status(400).json({ message: "Designation must be either HR, Manager, or Sales" });
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
            return res.status(400).json({ "status":false, message: "Employee already exist" });
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
        console.log(err);
        
        res.status(500).send("Error fetching employees");
    }
};

const editEmployee=async (req, res) => {
    if(!req.params.id || req.params.id === ""){
        return res.status(400).json({ "status":false, message: "Invalid employee Id" });
    }
    try {
        const employee = await Employee.findById(req.params.id);
        return res.status(200).json({"status":true, message: "Employee fetched successfully", "data": employee });
    } catch (err) {
        console.log(err);        
        res.status(500).send("Error fetching employee");
    }
};

const updateEmployee = async (req, res) => {
    const emp_id  = req.params.id;
    const { name, email, mobileNo, designation,gender,course,image } = req.body;
    console.log(req.body    );
    
    
    if (!name || !email || !mobileNo || !designation || !gender || !course ) {
        return res.status(400).json({"status":false, message: "All field are mandatory" });
    }

    if (typeof name !== 'string') {
        return res.status(400).json({"status":false, message: "Name must be a valid string" });
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        return res.status(400).json({"status":false, message: "A valid email is required" });
    }

    const mobileNoPattern = /^\d{10}$/; // Example for a 10-digit phone number
    if (!mobileNoPattern.test(mobileNo)) {
        return res.status(400).json({"status":false, message: "A valid mobile number is required (10 digits)" });
    }

    if (typeof designation !== 'string' ) {
        return res.status(400).json({"status":false, message: "Designation must be a valid string" });
    }

    if (!['HR', 'Manager', 'Sales'].includes(designation)) {
        return res.status(400).json({"status":false, message: "Designation must be either HR, Manager, or Sales" });
    }

    if (!['Male', 'Female', 'Other'].includes(gender)) {
        return res.status(400).json({"status":false, message: "Gender must be either Male, Female, or Other" });
    }

    if (!['MCA', 'BSC', 'BCA'].includes(course) ){
        return res.status(400).json({"status":false, message: "Course is must be a valid Courses" });
    }


    if (!mongoose.Types.ObjectId.isValid(emp_id)) {
        return res.status(400).json({"status":false, message: "Employee Id not Found"});
    }

    try {

        const existingEmployee = await Employee.findOne({ email, _id: { $ne: emp_id } });

        if (existingEmployee) {
            return res.status(400).json({"status":false, message: "Email already in use by another employee" });
        }

        const updateData = { name, email, mobileNo, designation, gender, course, image };

        const updatedEmployee = await Employee.findByIdAndUpdate(emp_id, updateData, { new: true });
        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not updated, Please try again" });
        }
        return res.status(200).json({"status":true, message: "Employee Updated successfully", "data": updatedEmployee });
    } catch (err) {
        console.log(err);
        return res.status(500).json({"status":false, message: "Error updating employee", error: err.message });
    }
};

const deleteEmployee =async (req, res) => {
    
    try {
        const employeeId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(employeeId)) {
            return res.status(400).json({"status":false, message: "Invalid Employee ID passed" });
        }

        const employee = await Employee.findByIdAndDelete(employeeId);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        if (employee.image) {
            const filePath = path.join(process.cwd(), 'uploads', employee.image);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath); // Deletes the image file
                console.log('Image deleted:', filePath);
            }
        }

        res.status(200).json({ "status":true, message: "Employee and associated image deleted successfully" });

    } catch (err) {
        console.error('Error details:', err); // Log the detailed error message
        res.status(500).json({ message: "Error deleting employee", error: err.message });
    }
};



export  {CreateEmployee, editEmployee,updateEmployee, allEmployee, deleteEmployee, changeEmployeeStatus}
