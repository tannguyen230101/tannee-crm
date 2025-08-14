const StatusCodeEnum = require("../../../common/enums/statusCode.enum");
const AppError = require("../../../interfaces/services/AppError");
const config = require("../../../configs/env");

module.exports = class LoginUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ email, password }) {
    if (!email || !password) {
      throw new AppError(
        "Email and password are required",
        StatusCodeEnum.badRequest
      );
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
        const errorData = await res.json(); // Lấy nội dung lỗi từ Firebase
        const firebaseErrorMessage = errorData.error.message;

        // Phân tích và ném lỗi cụ thể
        if (
          firebaseErrorMessage === "EMAIL_NOT_FOUND" ||
          firebaseErrorMessage === "INVALID_PASSWORD"
        ) {
          throw new AppError(
            "Email hoặc mật khẩu không đúng.",
            StatusCodeEnum.badRequest
          );
        }
        // Có thể thêm các trường hợp khác như USER_DISABLED, ...

        // Nếu là lỗi khác, ném lỗi chung
        throw new AppError(
          firebaseErrorMessage || "Lỗi đăng nhập không xác định.",
          StatusCodeEnum.badRequest
        );
      }

      firebaseUser = await res.json();
      // { idToken, refreshToken, expiresIn, localId, email, ... }
    } catch (err) {
      // Bắt lỗi AppError đã ném ở trên hoặc các lỗi khác
      if (err instanceof AppError) {
        throw err;
      }
      // Xử lý các lỗi khác (ví dụ: lỗi mạng,...)
      console.error("Lỗi đăng nhập Firebase:", err);
      throw new AppError(
        "Đã có lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại sau.",
        StatusCodeEnum.internalServerError
      );
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
