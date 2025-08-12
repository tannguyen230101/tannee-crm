class AppError extends Error {
  constructor(message, statusCode = 0) {
    super(message);
    this.name="AppError";
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
