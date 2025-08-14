const StatusCodeEnum = require('../../common/enums/statusCode.enum');
// const StatusCode = require('../../../utils/StatusCodeResponse');

const sendResponse = (res, {
  code = StatusCodeEnum.success,
  message = 'Success',
  idReturn = null,
  returnData = null,
  accessToken = null,
  refreshToken = null,
  expiresIn = null, 
}) => {
  // Nếu code không hợp lệ thì fallback thành 500
  const safeCode = (typeof code === 'number' && code >= 100 && code < 600) ? code : 500;

   const body = {
    message,
  };

  if (idReturn !== null) body.idReturn = idReturn;
  if (returnData !== null) body.data = returnData;
  if (accessToken) body.accessToken = accessToken;
  if (refreshToken) body.refreshToken = refreshToken;
  if (expiresIn) body.expiresIn = expiresIn; 

  const response = {
    statusCode: safeCode,
    body: body,
  };

  res.status(safeCode).json(response);
};

module.exports = sendResponse;
