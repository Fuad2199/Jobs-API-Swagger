import { StatusCodes } from "http-status-codes"; // Import the StatusCodes to use in error handling
import CustomAPIError from "../errors/custom-api.js"; // Import the custom base error class

//=============== UnauthenticatedError class starts =================
class UnauthenticatedError extends CustomAPIError {
    constructor(message) {
        super(message); // Call the constructor of the base class (CustomAPIError)
        this.statusCode = StatusCodes.UNAUTHORIZED; // Set the HTTP status code to 401 (Unauthorized)
    }
}
//=============== UnauthenticatedError class ends =================

export default UnauthenticatedError; // Export the UnauthenticatedError class for use in other parts of the application
