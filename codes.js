const getAllTours = async (req, res) => {
  try {
    // BUILD THE QUERY
    // 1A) Filtering
    const queryObj = { ...req.query };

    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);

    // 1BB) Advanced Filtering
    // { difficulty: 'easy', duration: { gte: '5' } }
    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Tour.find(JSON.parse(queryStr));

    // 2) Sorting
    if (req.query.sort) {
      //we can sort my more fields
      //in our query we say .sort('price ratingsAverage')
      //so convert the query string to array using the comma as a delimeter
      //and convert the array to space seperated string like we want

      //the sorting after the first field does not work for me
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);

      //else if no sorting parameter order by date created
    } else {
      query = query.sort('-createdAt');
    }

    // 3) FIELDS LIMITING

    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      //the operation of selecting only some field names is called projecting
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // 4) PAGINATION
    // we leave the page and limit to the user
    // skip is determined by the limit

    // we nevertheless add pagination even if the user does
    // not specify

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) throw new Error('This page does not exist');
    }

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
