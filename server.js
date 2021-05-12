const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const colors = require('colors');

//handle uncaughtException
process.on('uncaughtException', (err) => {
  console.log('uncaughtException, shutting down');
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require('./app');

//START SERVER
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () =>
  console.log(
    `App started in ${process.env.NODE_ENV} on ${PORT}...`.yellow.bold
  )
);

//handle unhandledRejection
process.on('unhandledRejection', (err) => {
  console.log('unhandledRejection, shutting down');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
