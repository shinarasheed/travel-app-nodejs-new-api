const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const getOverView = catchAsync(async (req, res, next) => {
  //1) Get tour data from collection
  const tours = await Tour.find();
  //2) Build template
  //3) render the template from the tour data
  res.status(200).render('overview', { title: 'All Tours', tours });
});

const getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    select: 'review rating user',
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name', 404));
  }

  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
  });
});

const getLoginForm = catchAsync(async (req, res, next) => {
  res.status(200).render('login', { title: 'Log into your account' });
});

const getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account',
  });
};

module.exports = { getOverView, getTour, getLoginForm, getAccount };
