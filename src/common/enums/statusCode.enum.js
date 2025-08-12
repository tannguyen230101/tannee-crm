const { StatusCodes } = require('http-status-codes');

const StatusCodeEnum = {
  success: StatusCodes.OK,
  created: StatusCodes.CREATED,
  badRequest: StatusCodes.BAD_REQUEST,
  unauthorized: StatusCodes.UNAUTHORIZED,
  notFound: StatusCodes.NOT_FOUND,
  internal: StatusCodes.INTERNAL_SERVER_ERROR,
  noContent: StatusCodes.NO_CONTENT,
  tooManyRequests: StatusCodes.TOO_MANY_REQUESTS,
};

module.exports = StatusCodeEnum;