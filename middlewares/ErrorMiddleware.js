const errorMiddleware = (err, _req, res, _next) => {
  if (err.errCode) {
    return res.status(err.errCode).json({
      message: err.message,
    });
  }
  return res.status(500).json({
    message: 'Internal server error',
  });
};

module.exports = {
  errorMiddleware,
};