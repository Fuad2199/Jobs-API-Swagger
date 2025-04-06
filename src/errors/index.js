import CustomAPIError from "./custom-api"; // Import the base error class for custom errors
import UnauthenticatedError from "./unauthenticated"; // Import the UnauthenticatedError class
import NotFoundError from "./not-found"; // Import the NotFoundError class
import BadRequestError from "./bad-request"; // Import the BadRequestError class

//=============== Export error classes starts =================
export default () => {
    return {
        CustomAPIError, // Export the base error class
        UnauthenticatedError, // Export the UnauthenticatedError class
        NotFoundError, // Export the NotFoundError class
        BadRequestError // Export the BadRequestError class
    }
}
//=============== Export error classes ends =================
