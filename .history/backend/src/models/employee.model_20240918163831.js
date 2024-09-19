import mongoose, {Schema} from "mongoose";

const employeeSchema = new Schema({

    f_Id: Number,
    f_Image: String,
    f_Name: String,
    f_Email: String,
    f_Mobile: String,
    f_Designation: String,
    f_gender: String,
    f_Course: String,
    f_Createdate: Date,

    // uniqueId:{
    //     type:Number,
    //     unique:true,
        
    // },
    
    // image: {
    //     url:String,
    //     filename:String,
//     },
//     name:{
//         type:String,
//         required:true
//     },
//     email:{
//         type:String,
//         unique:true
// },
//     mobileNo:Number,
//     designation:String,
//     gender:String,
//     course:String,
});


export const Employee = mongoose.model("Employee", employeeSchema)