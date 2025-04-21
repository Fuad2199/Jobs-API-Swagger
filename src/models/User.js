import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

//=============== User Schema starts =================
const UserSchema = new mongoose.Schema(
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

UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id, name: this.name }, 
    process.env.JWT_SECRET, 
  {
    expiresIn: process.env.JWT_LIFETIME,
  }
 )
}

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password)
  return isMatch;
}
//=============== User Schema ends =================

//=============== Mongoose Model starts =================
const User = mongoose.model('User', UserSchema); // Create the User model using the schema
//=============== Mongoose Model ends =================

export default User; // Export the User model for use in other parts of the application
