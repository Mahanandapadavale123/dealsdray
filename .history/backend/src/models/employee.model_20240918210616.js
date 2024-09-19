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
    unique: true
  },
  mobileNo: Number,
  designation: String,
  gender: String,
  course: String
});

export const Employee = mongoose.model("Employee", employeeSchema);
