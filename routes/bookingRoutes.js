const express = require('express');
const bookingController = require('../controllers/bookingController');
const { authenticate, restrictTo } = require('../middleware/authMiddleware');

const router = express.Router();

router.get(
  '/checkout-session/:tourId',
  authenticate,
  bookingController.getCheckoutSession
);

module.exports = router;
