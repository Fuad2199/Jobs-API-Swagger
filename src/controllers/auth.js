import User from "../models/User.js"
import { StatusCodes } from "http-status-codes"
import BadRequestError from "../errors/bad-request.js"
import bcrypt from "bcryptjs"

export const register = async (req, res) => {
    const {name, email, password} = req.body
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    const tampUser = {name,email,password:hashedPassword}

    const user = await User.create({...tampUser})
    res.status(StatusCodes.CREATED).json({ 
        success: true,
        msg: "User registered successfully",
        user
    })
}
export const login = async (req, res) => {
    res.send('login user')
}

export default{
    register,
    login
}