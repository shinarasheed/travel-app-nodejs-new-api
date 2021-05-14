const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    result: users.length,
    data: users,
  });
});

const updateMe = catchAsync(async (req, res, next) => {
  //1) create error if user POST password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use updatemypassword',
        400
      )
    );
  }

  //2) update user document. Be very careful when doing update for user data
  //make sure it only contains the data that you provide update for
  //filter out unwanted field names
  const filteredBody = filterObj(req.body, 'name', 'email');
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ status: 'success', user: updatedUser });
});

const getUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: null,
  });
};

const createUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: null,
  });
};

const updateUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: null,
  });
};

const deleteUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: null,
  });
};

module.exports = {
  getAllUsers,
  updateMe,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
