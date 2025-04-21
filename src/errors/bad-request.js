import CustomAPIError from "../errors/custom-api.js";
import { StatusCodes } from "http-status-codes";

//=============== BadRequestError class starts =================
class BadRequestError extends CustomAPIError {
    // Constructor for BadRequestError with a default message
    constructor(message = "Bad Request") {
        super(message); // Call the parent class (CustomAPIError) constructor
        this.name = "BadRequestError"; // Set the error name
        this.StatusCode = StatusCodes.BAD_REQUEST; // Set the HTTP status code for bad request
    }
}
//=============== BadRequestError class ends =================

export default BadRequestError;
