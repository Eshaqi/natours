const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  // console.log(err);
  process.exit(1);
});

// const connectToDatabse = require('./db');
const connectToDatabse = require('./mongooseConfig');


const app = require('./app');

/* const PORT = process.env.PORT || 3001;

connectToDatabse()
  .then((client) => {
    console.log('Database connection successful.');

    // Start the server only after database connection is successful
    app.listen(PORT, () => {
      console.log(`App running on port ${PORT}...`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
    process.exit(1); // Exit the process if the database connection fails
  }); */

connectToDatabse();

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  // console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
