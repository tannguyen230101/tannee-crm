// src/express/domains/usecases/auth/RefreshTokenUseCase.js
const axios = require('axios');
const StatusCodeEnum = require('../../../common/enums/statusCode.enum');
const AppError = require('../../../interfaces/services/AppError');
const config = require('../../../configs/env');

module.exports = class RefreshTokenUseCase {

  async execute(refreshToken) {
    try {
      const url = `https://securetoken.googleapis.com/v1/token?key=${config.firebaseApiKey}`;
      const res = await axios.post(url, {
        grant_type: 'refresh_token',
        refresh_token: refreshToken
      });

      return {
        code: StatusCodeEnum.success,
        idToken: res.data.id_token,
        refreshToken: res.data.refresh_token,
        expiresIn: res.data.expires_in,
        message: 'Token refreshed successfully'
      };
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      throw new AppError('Invalid refresh token', StatusCodeEnum.unauthorized);
    }
  }
};
