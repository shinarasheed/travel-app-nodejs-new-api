const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authController.isLoggedIn, viewsController.getOverView);
router.get('/tour/:slug', authController.isLoggedIn, viewsController.getTour);
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/me', authController.authenticate, viewsController.getAccount);

module.exports = router;
