const express = require('express');
const reviewController = require('../controllers/reviewController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(authenticate, reviewController.getAllReviews);
router.route('/:id').post(authenticate, reviewController.createReview);

module.exports = router;
