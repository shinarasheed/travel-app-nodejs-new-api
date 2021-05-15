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

const setTourUserIds = (req, res, next) => {
  //Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

const createReview = factory.createOne(Review);
const updateReview = factory.updateOne(Review);
const deleteReview = factory.deleteOne(Review);

module.exports = {
  getAllReviews,
  createReview,
  updateReview,
  deleteReview,
  setTourUserIds,
};
