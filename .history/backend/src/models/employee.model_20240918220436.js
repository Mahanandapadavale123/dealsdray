import mongoose, { Schema } from "mongoose";

const employeeSchema = new Schema({
  uniqueId: {
    type: Number,
    unique: true
  },

  image: {
    url: String,
    filename: String
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
  },
  mobileNo: Number,
  designation: String,
  gender: String,
  course: String,
  status:{type:String, default:"active"}
});

export const Employee = mongoose.model("Employee", employeeSchema);
