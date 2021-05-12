const express = require('express');
const morgan = require('morgan');
const connectDb = require('./config/db');

//error handlers
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

//routes
const userRouter = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoutes');

//connect to database
connectDb();

const app = express();

//MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
//serve static files
app.use(express.static(`${__dirname}/public`));

//just showing how we can use a middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//mount routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//unhandled routes response/url that does not exist
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

//use global error handler
app.use(globalErrorHandler);

module.exports = app;
