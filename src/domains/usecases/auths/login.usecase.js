const StatusCodeEnum = require("../../../common/enums/statusCode.enum");
const AppError = require("../../../interfaces/services/AppError");
const config = require("../../../configs/env");

module.exports = class LoginUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ email, password }) {
    if (!email || !password) {
      throw new AppError("Email and password are required", StatusCodeEnum.badRequest);
    }
    // const { email, password } = data;
    // 1. Gọi Firebase REST API đăng nhập
    const signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${config.firebaseApiKey}`;
    let firebaseUser;

    try {
      const res = await fetch(signInUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      });

      // fetch không tự parse JSON như axios, nên phải gọi .json()
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      firebaseUser = await res.json();
      // { idToken, refreshToken, expiresIn, localId, email, ... }
    } catch (err) {
      console.error("Axios error details:", {
        status: err,
        data: err,
      });
      throw new AppError(err, StatusCodeEnum.unauthorized);
    }

    // 2. Lấy user từ MongoDB
    const user = await this.userRepository.findOne({
      firebaseUid: firebaseUser.localId,
    });
    if (!user) {
      throw new AppError("User not found", StatusCodeEnum.notFound);
    }

    // 3. Trả về dữ liệu
    return {
      code: StatusCodeEnum.success,
      message: "Login successful",
      user,
      idToken: firebaseUser.idToken,
      refreshToken: firebaseUser.refreshToken,
      expiresIn: firebaseUser.expiresIn,
    };
  }
};
