import { StatusCodes, getReasonPhrase } from "http-status-codes";

const mapError = (err) => {
  // Mövcud səhvlər üçün xəta xəritəsi
  const errorMap = {
    ValidationError: {
      msg: Object.values(err.errors).map((item) => item.message).join(", "),
      statusCode: StatusCodes.BAD_REQUEST,
    },
    CastError: {
      msg: `No item found with id: ${JSON.stringify(err.value)}`,
      statusCode: StatusCodes.NOT_FOUND,
    },
    MongoError: err.code === 11000
      ? {
          msg: `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`,
          statusCode: StatusCodes.BAD_REQUEST,
        }
      : null,
  };

  // Xəritədə olmayan səhvlər üçün default cavab
  return errorMap[err.name] || {
    msg: err.message || "Something went wrong, try again later",
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };
};

const errorHandlerMiddleware = (err, req, res, next) => {
  const { msg, statusCode } = mapError(err);

  const response = {
    err: {
      errors: {
        password: {
          success: false,
          type: String,
          statusCode,
          name: "ValidatorError",
          statusText: getReasonPhrase(statusCode), // Status kodun tam adı
          properties: {
            error: msg,
            type: msg.type
          },
          method: req.method, // POST, GET, PUT və s.
          path: req.originalUrl, // Xəta baş verən URL
          timestamp: new Date().toISOString(), // Zaman damğası
        }
      }
    }
  };

  // Development mühitində stack trace əlavə edilir
  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  return res.status(statusCode).json(response);
};

export default errorHandlerMiddleware;
