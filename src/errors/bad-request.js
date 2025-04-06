import CustomAPIError from "./custom-api.js";
import { StatusCodes } from "http-status-codes";

class BadRequestError extends CustomAPIError {
    constructor(message = "Bad Request") {
        super(message);
        this.name = "BadRequestError";
        this.StatusCode = StatusCodes.BAD_REQUEST;
    }
}

export default BadRequestError