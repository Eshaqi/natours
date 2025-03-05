const dotenv = require('dotenv');
// dotenv.config({ path: './config.env' });
dotenv.config();
const app = require('./app');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  console.log(err);

  process.exit(1);
});

// const connectToDatabse = require('./db');
const connectToDatabse = require('./mongooseConfig');
connectToDatabse();

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED, Shutdown down gracefully');
  server.close(() => {
    console.log('💥 Process terminated');
  });
});
