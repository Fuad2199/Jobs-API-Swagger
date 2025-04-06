import { StatusCodes } from "http-status-codes";
import customAPIError from "./custom-api";

//=============== NotFoundError class starts =================
class NotFoundError extends customAPIError {
    // Constructor for NotFoundError with a custom message
    constructor(message) {
        super(message); // Call the parent class (customAPIError) constructor
        this.name = "NotFoundError"; // Set the error name to "NotFoundError"
        this.StatusCodes = StatusCodes.NOT_FOUND; // Set the HTTP status code for Not Found (404)
    }
}
//=============== NotFoundError class ends =================

export default NotFoundError;
