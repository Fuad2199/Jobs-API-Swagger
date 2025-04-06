import mongoose from "mongoose";

//=============== User Schema starts =================
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required!'], // Email field is required
      unique: true, // Email should be unique in the database
      match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Please provide a valid email!'], // Email format validation
    },
    password: {
      type: String,
      required: [true, 'Please provide password!'], // Password field is required
      minlength: [6, 'Password must be at least 6 characters long!'], // Password length validation
    },
    name: {
      type: String,
      required: [true, 'Username is required!'], // Username is required
      unique: true, // Username must be unique
      minlength: [3, 'Username must be at least 3 characters long!'], // Username length validation
    },
  },
  { timestamps: true } // Automatically add `createdAt` and `updatedAt` timestamps
);
//=============== User Schema ends =================

//=============== Mongoose Model starts =================
const User = mongoose.model('User', userSchema); // Create the User model using the schema
//=============== Mongoose Model ends =================

export default User; // Export the User model for use in other parts of the application
