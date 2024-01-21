class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    console.log(String(statusCode)[0]); // 4
    this.status = String(statusCode)[0] == 4 ? "fail" : "error";
    this.isOperational = true;
  }
}
module.exports = ApiError;
