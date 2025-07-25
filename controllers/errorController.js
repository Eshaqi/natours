const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

//Error in Development
const sendErrorDev = (err, req, res) => {
  //A) API
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
  //B) Rendered Website
  console.error('ERROR 💥', err);
  return res.status(err.statusCode).render('error', {
    ttile: 'Smoething went wrong!',
    msg: err.message,
  });
};

const sendErrorProduction = (err, req, res) => {
  //API
  if (req.originalUrl.startsWith('/api')) {
    //A) Operational , trusted error: send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    //B) Programming or other unknown error: don't leak details
    //1) Log error
    console.error('ERROR 💥', err);
    //2) Send generic message
    return res.status(500).json({
      status: 'error',
      message: `Something went wrong!`,
    });
  }
  // Rendered Website
  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      ttile: 'Smoething went wrong!',
      msg: err.message,
    });
  }
  // Programming or other unknown error: don't leak details
  //1) Log error
  console.error('ERROR 💥', err);
  //2) Send generic message
  return res.status(err.statusCode).render('error', {
    ttile: 'Smoething went wrong!',
    msg: 'Please try again later',
  });
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errorResponse.errmsg.match(/(["'])(\\?.)*?\1/)[0];

  const message = `Duplicate field value: ${value}. Please use another value`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () => {
  return new AppError('Invalid token, Please log in again!', 401);
};

const handleJWTExpiredError = () => {
  return new AppError('Your toekn has expired! Please log in again', 401);
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;
    if (error.name === 'CastError') {
      error = handleCastErrorDB(error);
    }
    if (error.code === 11000) {
      error = handleDuplicateFieldsDB(error);
    }

    if (err.errors && Object.values(err.errors)[0]?.name === 'ValidatorError') {
      error = handleValidationErrorDB(error);
    }

    if (error.name === 'JsonWebTokenError') {
      error = handleJWTError();
    }

    if (error.name === 'TokenExpiredError') {
      error = handleJWTExpiredError();
    }
    sendErrorProduction(error, req, res);
  }
};
