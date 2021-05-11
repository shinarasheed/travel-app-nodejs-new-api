const express = require('express');
const tourController = require('../controllers/tourController');
const router = express.Router();

//should something like this work for explore

//this is good for a request that is frequently made
router
  .route('/top-5-cheap-tours')
  .get(tourController.aliasTopTous, tourController.getAllTours);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
