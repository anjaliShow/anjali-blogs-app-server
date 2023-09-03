const ErrorHandler = require('../utils/errorHandler');

const errorMiddeware = (err, req, res, next) => {
  // console.log("err", err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  if (err.name === 'CastError') {
    const message = `Resource not found ${err.value}`;
    err = new ErrorHandler(message, 404);
  }
  if (err.code === 11000) {
    const message = `This ${Object.keys(err.keyValue)} is already exists`;
    err = new ErrorHandler(message, 400);
  }
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

module.exports = errorMiddeware;
