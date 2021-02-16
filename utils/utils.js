exports.catchErr = (err) => {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  return next(err);
};
