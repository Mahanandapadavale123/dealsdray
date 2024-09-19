import mongoose from "mongoose";

mongoose.connect('mongodb://localhost/dealsdray', { useNewUrlParser: true, useUnifiedTopology: true });


// const userSchema = new Schema(
//     {
//         username: {
//             type: String,
//             required: true,
//             unique: true,
//             lowercase: true,
//             trim: true, 
//             index: true
//         },
//         password: {
//             type: String,
//             required: [true, 'Password is required']
//         },
//     },
//     {
//         timestamps: true
//     }
// )
const userSchema = new mongoose.Schema({
    f_sno: Number,
    f_userName: String,
    f_Pwd: String,
  });

  const User = mongoose.model('User', userSchema);

  export default User;