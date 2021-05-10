const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const colors = require('colors');
const app = require('./app');

//START SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App started on ${PORT}...`.yellow.bold));
