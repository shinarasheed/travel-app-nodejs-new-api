const Tour = require('../models/tour');
const APIFeatures = require('../utils/apiFeatures');

const aliasTopTous = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = 'price,-ratingsAverage';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

const getAllTours = async (req, res) => {
  try {
    //EXECUTE QUERY
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const tours = await features.query;

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'error', message: error });
  }
};

const getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    //this will do thesame as above
    // const tour = await Tour.findOne({ _id: req.params.id });
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'error', message: error });
  }
};

const createTour = async (req, res) => {
  try {
    const tour = await Tour.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'error', message: error });
  }
};

const updateTour = async (req, res) => {
  try {
    //this will only replace the fields that are different
    //put will replace all the fields
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'error', message: error });
  }
};

const deleteTour = async (req, res) => {
  try {
    // await Tour.findByIdAndRemove(req.params.id);
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'error', message: error });
  }
};

module.exports = {
  aliasTopTous,
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
};
