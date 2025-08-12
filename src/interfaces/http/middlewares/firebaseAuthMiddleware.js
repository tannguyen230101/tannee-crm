const { getAuth } = require('../../../infrastructures/firebase/firebase');
const AppError = require('../../services/AppError');
const StatusCodeEnum = require('../../../common/enums/statusCode.enum');

module.exports = async function firebaseAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw new AppError('Unauthorized', StatusCodeEnum.unauthorized);
    }

    const idToken = authHeader.split(' ')[1];
    const decodedToken = await getAuth().verifyIdToken(idToken);

    req.user = decodedToken; // { uid, email, ... }
    next();
  // eslint-disable-next-line no-unused-vars
  } catch (err) {
    next(new AppError('Invalid or expired token', StatusCodeEnum.unauthorized));
  }
};
