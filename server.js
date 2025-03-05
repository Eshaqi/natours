const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);

  process.exit(1);
});

// const connectToDatabse = require('./db');

const port = process.env.PORT || 4000;

router.get('/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Server is running!' });
});

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

const connectToDatabse = require('./mongooseConfig');
connectToDatabse();
