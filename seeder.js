const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

//Load env vars
dotenv.config({ path: './config.env' });

//load models
const Tour = require('./models/tour');

//connect to DB
connectDB();

//Read JSON files
const tours = JSON.parse(
  fs.readFileSync('./dev-data/data/tours-simple.json', 'utf-8')
);

//import into DB
const importData = async () => {
  try {
    await Tour.create(tours);

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
