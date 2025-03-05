// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;

const connectToDatabase = async () => {
  /*  try {
    await mongoose.connect(DB);
    console.log('Database connection successful!');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1); // Exit the process with failure
  } */
  await mongoose.connect(DB);
  console.log('Database connection successful!');
};

module.exports = connectToDatabase;
