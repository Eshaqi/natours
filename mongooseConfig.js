// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;

const connectToDatabase = async () => {
  await mongoose.connect(DB);
  console.log('Database connection successful!');
};

module.exports = connectToDatabase;
