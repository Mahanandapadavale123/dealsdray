import mongoose, { Schema } from "mongoose";

const employeeSchema = new Schema({
  uniqueId: {
    type: Number,
    unique: true
  },

  image: {
    type: String,
    required: true
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
  course: {
    type: [String],
    validate: {
      validator: function (arr) {
        return arr.length > 0;
      },
      message: 'At least one course is required'
    },
  },
  status:{type:String, default:"active"}
});

export const Employee = mongoose.model("Employee", employeeSchema);
