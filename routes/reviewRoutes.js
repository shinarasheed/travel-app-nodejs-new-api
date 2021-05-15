const express = require('express');
const reviewController = require('../controllers/reviewController');
const { authenticate, restrictTo } = require('../middleware/authMiddleware');
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(authenticate, reviewController.getAllReviews)
  .post(
    authenticate,
    restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview
  );

router
  .route('/:id')
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);

module.exports = router;
