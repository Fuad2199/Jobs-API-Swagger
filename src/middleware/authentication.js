import User from "../models/User.js";
import jwt from "jsonwebtoken"
import UnauthenticatedError from "../errors/unauthenticated.js";


const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWidth('Bearer')) {
        throw new UnauthenticatedError('Authenticated invalid')
    }
    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        // attach the user to the job routes

        const user = User.findById(payload.id).select('-password')
        req.user = user

        req.user = { userId: payload.userId, name: payload.name };
        next()
    } catch (error) {
        throw new UnauthenticatedError('Authentication invalid')
    }
}

export default auth;