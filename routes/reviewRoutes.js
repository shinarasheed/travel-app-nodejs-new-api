const express = require('express');
const reviewController = require('../controllers/reviewController');
const { authenticate, restrictTo } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(authenticate, reviewController.getAllReviews);

//jonas implemented this differently
router
  .route('/:id')
  .post(authenticate, restrictTo('user'), reviewController.createReview);

module.exports = router;