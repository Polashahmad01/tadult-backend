const colors = require("colors");
const ErrorResponse = require("../utils/error-response");

const errorHandler = (error, req, res, next) => {
  
  let errorCopy = { ...error };

  errorCopy.message = error.message;
    
  // Log to console for dev
  console.log(error.stack.red);
  
  // Log error name on console
  if(process.env.NODE_ENV === "development") {
    console.log(error.name);
  }
  
  // Mongoose invalid object id
  if(error.name === "CastError") {
    const message = "Resource not found.";
    errorCopy  = new ErrorResponse(message, 400);
  }
  
  // Mongoose duplicate key
  if(error.code === 11000) {
    const mesage = "Duplicate filed value entered";
    errorCopy = new ErrorResponse(mesage, 400);
  }
  
  // Mongoose validation error
  if (error.name === "ValidationError") {
    const message = Object.values(error.errors).map((val) => val.message);
    errorCopy = new ErrorResponse(message, 400);
  }
  
  res.status(errorCopy.statusCode || 500)
    .json({ success: false, error: errorCopy.message || "Server Error" });
}

module.exports = errorHandler;
