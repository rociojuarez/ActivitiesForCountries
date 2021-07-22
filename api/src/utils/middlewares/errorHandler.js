const errorHandler = ((err, req, res, next) => {
    const status = error.status || 500;
    const message = err.message || err;
    console.error(err)
    return res.status(status).send(message);
  });

module.exports = errorHandler;