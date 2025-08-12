const StatusCodeEnum = require("../../../common/enums/statusCode.enum");
const AppError = require("../../../interfaces/services/AppError");
const { generateOTP } = require("../../../utils/otpGenerator");
const { sendConfirmationCode } = require("../../../interfaces/services/email.service");

module.exports = class RegisterUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(data) {
    const { email, password } = data;
    if (!email || !password)
      throw new AppError(
        "email and password required",
        StatusCodeEnum.badRequest
      );

    const confirmationCode = generateOTP();
    const now = new Date();
    const expiredAt = new Date(now.getTime() + 10 * 60 * 1000); // 10 phút

    const createUser = {
      ...data,
      confirmationCode,
      codeExpiredAt: expiredAt.toISOString(),
    }
    // console.log("createUser", data);

    await this.userRepository.createUserWithValidation(createUser);

    const result = await sendConfirmationCode(email, confirmationCode);

    return {
      code: StatusCodeEnum.created,
      message: result.message,
    };
  }
};
