import User from "../models/User.js"
import { StatusCodes } from "http-status-codes"
import BadRequestError from "../errors/bad-request.js"
import UnauthenticatedError from "../errors/unauthenticated.js";

//=============== Register user handler starts =================
export const register = async (req, res, next) => {
    try {
        const user = await User.create({ ...req.body })
        const token = user.createJWT()
        res
            .status(StatusCodes.CREATED)
            .json({ user: { name: user.name }, token });
    } catch (error) {
        next(error)
    }

};
//=============== Register user handler ends =================


//=============== Login user handler starts =================
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new BadRequestError('Please provide email and password')
        }
        const user = await User.findOne({ email })

        if (!user) {
            throw new UnauthenticatedError("Invalid Credentials")
        }

        const isPasswordCorrect = await user.comparePassword(password)
        if (!isPasswordCorrect) {
            throw new UnauthenticatedError('Invalid Credentials')
        }
        // compare password
        const token = user.createJWT();
        res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
    } catch (error) {
        next(error)
    }

};
//=============== Login user handler ends =================


const authHandlers = {
    register,
    login
}

export default authHandlers;
