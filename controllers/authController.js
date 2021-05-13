const { promisify } = require('util');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);

  res.status(201).json({ status: 'success', token, data: { user: newUser } });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new AppError('Invalid credentials', 401));
  }

  const passwordIsMatch = await user.correctPassword(password, user.password);
  if (!passwordIsMatch) {
    return next(new AppError('Invalid credentials', 401));
  }

  //I could have done this for the above two lines
  //   if (!user || !(await user.comparePassword(password, user.password))) {
  //     return next(new AppError('Invalid credentials', 401));
  //   }

  const token = signToken(user._id);

  res.status(200).json({
    status: 'success',
    token,
  });
});

const forgetPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with that email address', 404));
  }
});

const resetPassword = (req, res, next) => {};

module.exports = { signup, login, forgetPassword, resetPassword };
