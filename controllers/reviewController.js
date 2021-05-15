const Review = require('../models/reviewModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();
  res.status(200).json({
    status: 'success',
    result: reviews.length,
    data: reviews,
  });
});

//jonas implemented this differently
const createReview = catchAsync(async (req, res, next) => {
  const { review, rating } = req.body;
  //   const newReview = await Review.create(req.body) jonas's implementation
  const newReview = await Review.create({
    review,
    rating,
    user: req.user.id,
    tour: req.params.id,
  });
  res.status(201).json({
    status: 'success',
    data: newReview,
  });
});

module.exports = {
  getAllReviews,
  createReview,
};
