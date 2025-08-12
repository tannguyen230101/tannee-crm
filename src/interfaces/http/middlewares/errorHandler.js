const sendResponse = require('../../services/responseHandler');

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;

  sendResponse(res, {
    code: statusCode,
    message: err.message || 'Internal Server Error',
  });
};

module.exports = errorHandler;
