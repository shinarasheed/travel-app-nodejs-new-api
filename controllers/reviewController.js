const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');

const factory = require('../controllers/handlerFactory');

//This gets all reviews for in the app/reviews for a particular tour
const getAllReviews = catchAsync(async (req, res, next) => {
  let filter;
  if (req.params.tourId) filter = { tour: req.params.tourId };
  const reviews = await Review.find(filter);
  res.status(200).json({
    status: 'success',
    result: reviews.length,
    data: reviews,
  });
});

//jonas implemented this differently
const createReview = catchAsync(async (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  const newReview = await Review.create(req.body);
  res.status(201).json({
    status: 'success',
    data: newReview,
  });
});

const deleteReview = factory.deleteOne(Review);

module.exports = {
  getAllReviews,
  createReview,
  deleteReview,
};
