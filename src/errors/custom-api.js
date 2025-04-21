//=============== CustomAPIError class starts =================
class CustomAPIError extends Error {
    constructor(message) {
        super(message); // Call the parent class (Error) constructor with the provided message
        this.name = this.constructor.name; // Set the name of the error to the class name (customAPIError)
    }
}
//=============== CustomAPIError class ends =================

export default CustomAPIError; // Export the customAPIError class for use in other parts of the application
