const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { authenticate, restrictTo } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgetpassword', authController.forgetPassword);
router.patch('/resetpassword/:token', authController.resetPassword);

//This will protect all the routes below this middlware
router.use(authenticate);

router.patch('/updatemypassword', authController.updatePassword);
router.get('/me', userController.getMe, userController.getUser);
router.patch('/updateme', userController.updateMe);
router.delete('/deleteme', userController.deleteMe);

//This will only authorize admins for the routes below
router.use(restrictTo('admin'));

router
  .route('/')
  .get(restrictTo('admin', 'lead-guide'), userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
