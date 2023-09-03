const catchAsyncError = require('../middlewares/catchAsyncError');
const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/sendToken');

// User Register
exports.register = catchAsyncError(async (req, res, next) => {
  const userData = { ...req.body };
  console.log('req.body', req.body);
  console.log('req.file', req.file);

  const newUser = await User.create({
    ...userData,
    avatar: req.file?.location,
  });

  res.status(201).json({
    success: true,
    message: 'Register successfully',
    // user: newUser,
  });
});

// User Login
exports.login = catchAsyncError(async (req, res, next) => {
  const { identifier, password } = req.body;

  const user = await User.findOne({
    $or: [{ email: identifier }, { username: identifier }],
  });

  if (!identifier || !password) {
    return next(new ErrorHandler('Enter Your Credenetials', 401));
  }
  if (!user) {
    return next(new ErrorHandler('Enter Your Valid Credenetials', 401));
  }

  const checkPassword = await user.comparePassword(password);

  if (!checkPassword) {
    return next(new ErrorHandler('Enter Your Valid Credenetials', 401));
  }

  sendToken(res, user, 'Logged in Successfully');
});

// User Logout
exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });
  res.status(200).json({
    success: true,
    message: 'Logout Successfully',
  });
});

// Get User Profile
exports.getProfile = catchAsyncError(async (req, res, next) => {
  // console.log("hit getProfile controller");
  const user = await User.findById(req.user.id).select('-password -updatedAt');

  res.status(200).json({
    success: true,
    user,
  });
});
