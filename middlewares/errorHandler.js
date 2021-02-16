const errorHandler = (err, req, res, next) => {
  const { statusCode, message, data } = err;

  return res.status(statusCode).json({
    message,
    data,
  });
};

module.exports = errorHandler;
