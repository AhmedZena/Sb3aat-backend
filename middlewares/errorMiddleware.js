let errorMiddleWare = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV == "development") {
    errHandleDev(err, res);
  } else {
    errHandleProd(err, res);
  }
};

let errHandleDev = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

let errHandleProd = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

module.exports = errorMiddleWare;
