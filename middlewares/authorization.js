const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('./catchAsyncError');
const JWT = require('jsonwebtoken');
const User = require('../models/userModel');

// Check that, Is User is Authenticated
exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const token = req.headers['authorization'] || req.cookies?.token;

  // console.log('token', token);

  if (!token) {
    return next(new ErrorHandler('Please login to access this resource', 401));
  }

  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    // console.log("decoded", decoded);
    req.user = await User.findById(decoded.id);

    // console.log('req.user', req.user);
    next();
  } catch (error) {
    return next(new ErrorHandler('Please login to access this resource', 401));
  }
});

// Check that, Is role is user
exports.isCreator = (req, res, next) => {
  if (req.user.role !== 'user') {
    return next(
      new ErrorHandler('You must an creator to access this resource')
    );
  }
  next();
};
