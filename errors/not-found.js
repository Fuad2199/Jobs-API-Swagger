import { StatusCodes } from "http-status-codes";
import customAPIError from "../errors/custom-api";

class NotFoundError extends customAPIError {
    constructor(message) {
        super(message);
        this.StatusCodes = StatusCodes.NOT_FOUND;
    }
}

export default NotFoundError