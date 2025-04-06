import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required!'],
      unique: true,
      match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Please provide a valid email!'],
    },
    password: {
      type: String,
      required: [true, 'Please provide password!'],
      minlength: [6, 'Password must be at least 6 characters long!'],
    },
    name: {
      type: String,
      required: [true, 'Username is required!'],
      unique: true,
      minlength: [3, 'Username must be at least 3 characters long!'],
    },
  },
  { timestamps: true }
);

// Mongoose model
const User = mongoose.model('User', userSchema);

export default User;
