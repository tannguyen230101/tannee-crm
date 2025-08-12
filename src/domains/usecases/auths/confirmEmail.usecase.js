const StatusCodeEnum = require("../../../common/enums/statusCode.enum");
const AppError = require("../../../interfaces/services/AppError");

module.exports = class ConfirmEmailUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(data) {
    const { email, confirmationCode } = data
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      throw new AppError("User not found", StatusCodeEnum.notFound);
    }

    if (user.isEmailConfirmed) {
      throw new AppError("Email already confirmed", StatusCodeEnum.badRequest);
    }

    console.log("User:", user);
    console.log("User _id:", user?.id);

    const now = new Date();

    if (
      user.confirmationCode !== confirmationCode ||
      new Date(user.codeExpiredAt) < now
    ) {
      throw new AppError(
        "Invalid or expired confirmation code",
        StatusCodeEnum.badRequest
      );
    }

    // Update user entity
    const updatedUser = {
      //   ...user,
      isEmailConfirmed: true,
      confirmationCode: null,
      codeExpiredAt: null,
    };

    const userId = user._id.toString();
    console.log("User _id:", userId);

    await this.userRepository.updateById(user?.id, updatedUser);

    return {
      code: StatusCodeEnum.success,
      message: "Email confirmed successfully",
    };
  }
};
