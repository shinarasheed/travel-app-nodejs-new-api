const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const factory = require('../controllers/handlerFactory');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({});
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

  //2) Filter out unwanted field names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ status: 'success', user: updatedUser });
});

//the user deleting himself(just sets active to false)
const deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({ status: 'success', data: null });
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

//the admin only can totally delete a user
const deleteUser = factory.deleteOne(User);

module.exports = {
  getAllUsers,
  updateMe,
  deleteMe,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
