// Catches anything passed to next(err) (including from asyncHandler) and
// returns a consistent JSON error shape instead of an HTML stack trace.
function notFoundHandler(req, res) {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  console.error(err);

  // Mongo duplicate-key error (e.g. two near-simultaneous registers with
  // the same email racing past the findByEmail check in the controller)
  if (err.code === 11000) {
    return res.status(409).json({ error: 'A record with that value already exists' });
  }
  // Mongoose validation error (missing/invalid required field)
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }
  // Malformed MongoDB ObjectId in a route param like /tasks/:id
  if (err.name === 'CastError') {
    return res.status(400).json({ error: `Invalid id: ${err.value}` });
  }

  const status = err.status || 500;
  res.status(status).json({
    error: err.message || 'Internal server error',
  });
}

module.exports = { notFoundHandler, errorHandler };
