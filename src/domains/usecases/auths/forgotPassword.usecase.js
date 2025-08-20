const StatusCodeEnum = require("../../../common/enums/statusCode.enum");
const AppError = require("../../../interfaces/services/AppError");
const { generateOTP } = require("../../../utils/otpGenerator");
const {
  sendConfirmationCode,
} = require("../../../interfaces/services/email.service");

module.exports = class ForgotPasswordUseCase {
  constructor(userRepository, UserEntity) {
    this.userRepository = userRepository;
    this.UserEntity = UserEntity;
  }

  async execute(email) {
    const user = await this.userRepository.findOne({ email });
    if (!user) throw new AppError("User not found", StatusCodeEnum.notFound);

    const confirmationCode = generateOTP();
    const now = new Date();
    const expiredAt = new Date(now.getTime() + 10 * 60 * 1000); // 10 phút

    const updatedUser = {
      confirmationCode,
      codeExpiredAt: expiredAt.toISOString(),
      updatedAt: now.toISOString(),
    };

    await this.userRepository.updateById(user.id, updatedUser);
    const result = await sendConfirmationCode(email, confirmationCode);

    return {
      code: result.code,
      message: result.message,
    };
  }

  async verifyOTP(data) {
    const { email, confirmationCode } = data;
    const user = await this.userRepository.findOne({ email });
    if (!user) throw new AppError("User not found", StatusCodeEnum.notFound);

    const now = new Date();

    // Verify confirmation code and expiration
    if (user.confirmationCode !== confirmationCode)
      throw new AppError(
        "Invalid confirmation code",
        StatusCodeEnum.badRequest
      );

    if (new Date(user.codeExpiredAt) < now)
      throw new AppError(
        "Expired confirmation code",
        StatusCodeEnum.badRequest
      );

    return {
      code: StatusCodeEnum.success,
      message: "Kiem tra thanh cong",
    };
  }

  async resetPassword(data) {
    const { email, confirmationCode, newPassword } = data;
    const user = await this.userRepository.findOne({ email });
    if (!user) throw new AppError("User not found", StatusCodeEnum.notFound);

    const now = new Date();

    // Verify confirmation code and expiration
    if (
      user.confirmationCode !== confirmationCode ||
      new Date(user.codeExpiredAt) < now
    )
      throw new AppError(
        "Invalid or expired confirmation code",
        StatusCodeEnum.badRequest
      );

    // Update password on FB
    const response = await this.userRepository.updatePassword(
      user.firebaseUid,
      newPassword
    );

    const updatedUser = {
      confirmationCode: null,
      codeExpiredAt: null,
    };

    await this.userRepository.updateById(user?.id, updatedUser);

    return {
      code: StatusCodeEnum.success,
      message: response.message,
    };
  }
};
