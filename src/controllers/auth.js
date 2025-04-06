import User from "../models/User.js"
import { StatusCodes } from "http-status-codes"
import BadRequestError from "../errors/bad-request.js"
import bcrypt from "bcryptjs"

//=============== Register user handler starts =================
export const register = async (req, res) => {
    const { name, email, password } = req.body;

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new BadRequestError("Email already in use");
    }

    // Generate salt for bcrypt hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save the user in the database
    const newUser = await User.create({ name, email, password: hashedPassword });

    // Send response indicating success
    res.status(StatusCodes.CREATED).json({
        success: true,
        msg: "User registered successfully",
        user: { name: newUser.name, email: newUser.email, _id: newUser._id },
    });
};
//=============== Register user handler ends =================


//=============== Login user handler starts =================
export const login = async (req, res) => {
    const { email, password } = req.body;

    // Find user by email in the database
    const user = await User.findOne({ email });
    if (!user) {
        throw new BadRequestError("Invalid credentials");
    }

    // Compare passwords (hashed password in DB with user input)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new BadRequestError("Invalid credentials");
    }

    // If credentials are correct, send success response
    res.status(StatusCodes.OK).json({
        success: true,
        msg: "Login successful",
        user: { name: user.name, email: user.email, _id: user._id },
    });
};
//=============== Login user handler ends =================


export default {
    register,
    login
}
