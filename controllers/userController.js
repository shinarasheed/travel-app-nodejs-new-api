const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    result: users.length,
    data: users,
  });
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

module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser };
