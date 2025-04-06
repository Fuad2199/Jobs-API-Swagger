import { StatusCodes, getReasonPhrase } from "http-status-codes";

//=============== Error Mapping starts =================
const mapError = (err) => {
  // Handle ValidationError (e.g., missing required fields)
  if (err.name === "ValidationError") {
    const fieldErrors = {};
    for (const field in err.errors) {
      const message = err.errors[field].message;
      fieldErrors[field] = {  
        success: false,
        name: "ValidationError",
        error: message,
        type: "FieldValidation",
      };
    }
    return {
      fieldErrors,
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  // Handle CastError (e.g., invalid ID format)
  if (err.name === "CastError") {
    return {
      fieldErrors: {
        id: {
          success: false,
          name: "CastError",
          error: `No item found with id: ${JSON.stringify(err.value)}`,
          type: "InvalidID",
        }
      },
      statusCode: StatusCodes.NOT_FOUND,
    };
  }

  // Handle MongoDB Duplicate Key Error (e.g., unique constraint violation)
  if (err.name === "MongoError" && err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    const message = `${field.charAt(0).toUpperCase() + field.slice(1)} "${value}" has already been used.`;

    return {
      fieldErrors: {
        [field]: {
          success: false,
          name: "DuplicateKey",
          error: message,
          type: "UniqueConstraint",
        }
      },
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  // Default error handler for other types of errors
  return {
    fieldErrors: {
      general: {
        success: false,
        name: err.name || "UnknownError",
        error: err.message || "Something went wrong, try again later",
        type: "General",
      }
    },
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };
};
//=============== Error Mapping ends =================


//=============== Error Handler Middleware starts =================
const errorHandlerMiddleware = (err, req, res, next) => {
  // Map the error using mapError function
  const { fieldErrors, statusCode } = mapError(err);

  const errors = {};

  // Process each field error and add additional details
  for (const field in fieldErrors) {
    const fieldError = fieldErrors[field];
    errors[field] = {
      ...fieldError,
      statusCode,
      statusText: getReasonPhrase(statusCode),
      method: req.method,
      path: req.originalUrl,
      timestamp: new Date().toISOString(),
    };
  }

  // Prepare the response object
  const response = {
    err: {
      errors
    }
  };

  // Add stack trace in development environment
  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  // Send the error response with appropriate status code
  return res.status(statusCode).json(response);
};
//=============== Error Handler Middleware ends =================


export default errorHandlerMiddleware;
