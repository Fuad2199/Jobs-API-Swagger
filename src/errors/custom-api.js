import { StatusCodes } from "http-status-codes";
//=============== CustomAPIError class starts =================
class CustomAPIError extends Error {
    constructor(message, statusCode = StatusCodes.INTERNAL_SERVER_ERROR) {
        super(message); // Call the parent class (Error) constructor with the provided message
        this.name = this.constructor.name; // Set the name of the error to the class name (customAPIError)
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.captureStackTrace)
    }
}
//=============== CustomAPIError class ends =================

export default CustomAPIError; // Export the customAPIError class for use in other parts of the application
