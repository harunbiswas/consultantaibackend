const createError = require("http-errors");

function notFoundHandler(req, res, next) {
  next(createError(404, "Your requested contend was not found!"));
}

// default error handler
function errorHandler(err, req, res, next) {
  res.status(err.status || 500).json({ err: { message: err.message } });
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
