const fs = require('fs');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

//Load env vars
dotenv.config({ path: './config.env' });

//load models
const Tour = require('./models/tourModel');
const User = require('./models/userModel');
const Review = require('./models/reviewModel');

//connect to DB
connectDB();

//Read JSON files
const tours = JSON.parse(
  fs.readFileSync('./dev-data/data/tours.json', 'utf-8')
);
//Read JSON files
const users = JSON.parse(
  fs.readFileSync('./dev-data/data/users.json', 'utf-8')
);
//Read JSON files
const reviews = JSON.parse(
  fs.readFileSync('./dev-data/data/reviews.json', 'utf-8')
);

//import into DB
const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);

    console.log('Data Imported...'.green.inverse);
    //exit from the process
    process.exit(1);
  } catch (error) {
    console.log(error);
  }
};

//Delete data
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();

    console.log('Data Destroyed...'.red.inverse);
    //exit from the process
    process.exit(1);
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
