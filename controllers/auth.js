import User from "../models/User.js"
import { StatusCodes } from "http-status-codes"
import BadRequestError from "../errors/bad-request.js"

export const register = async (req, res) => {
    const {name, email, password} = req.body
    if (!name || !email || !password) {
        throw new BadRequestError('Please provide name, email and password')
    }
    const user = await User.create({...req.body})
    res.status(StatusCodes.CREATED).json({ user })
}
export const login = async (req, res) => {
    res.send('login user')
}

export default() => {
    register,
    login
}