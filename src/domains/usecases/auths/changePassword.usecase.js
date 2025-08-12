const StatusCodeEnum = require("../../../common/enums/statusCode.enum");
const AppError = require("../../../interfaces/services/AppError");
const axios = require("axios");
const config = require("../../../configs/env");

module.exports = class ChangePasswordUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async excute(data) {
    const { email, oldPassword, newPassword } = data;

    // 1. Gọi Firebase REST API đăng nhập
    const signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${config.firebaseApiKey}`;
    let firebaseUser;

    try {
      const res = await axios.post(signInUrl, {
        email,
        password: oldPassword,
        returnSecureToken: true,
      });
      firebaseUser = res.data;
      // { idToken, refreshToken, expiresIn, localId, email, ... }
    } catch (err) {
      throw new AppError(err, StatusCodeEnum.unauthorized);
    }

    // 2. Lấy user từ MongoDB
    const user = await this.userRepository.findOne({
      firebaseUid: firebaseUser.localId,
    });
    if (!user) {
      throw new AppError("User not found", StatusCodeEnum.notFound);
    }

    const response = await this.userRepository.updatePassword(user?.firebaseUid, newPassword);

    return {
      code: StatusCodeEnum.success,
      message: response.message,
    };
  }
};
