const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
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

//set secure http headers
app.use(helmet());

//development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//100 request in 1 hour
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 10000,
  message: 'Too many requests from this IP, please try again in an hour',
});

app.use('/api', limiter);

//Bodyparser.  parse body data
app.use(express.json({ limit: '10kb' }));

//Data sanitization against NOSQL query injection
app.use(mongoSanitize);

//Data sanitization against XSS
app.use(xss());

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
