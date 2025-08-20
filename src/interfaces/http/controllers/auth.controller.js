const sendResponse = require("../../services/responseHandler");
const StatusCodeEnum = require("../../../common/enums/statusCode.enum");
const UserRepository = require("../../../domains/repositories/userRepository");
const RegiserUser = require("../../../domains/usecases/auths/register.usecase");
const ConfirmEmail = require("../../../domains/usecases/auths/confirmEmail.usecase");
const RefreshTokenUseCase = require("../../../domains/usecases/auths/refreshToken.usecase");
const LoginUseCase = require("../../../domains/usecases/auths/login.usecase");
const ForgotPasswordUseCase = require("../../../domains/usecases/auths/forgotPassword.usecase");
const ChangePasswordUseCase = require("../../../domains/usecases/auths/changePassword.usecase");

const userRepo = new UserRepository();

exports.login = async (req, res) => {
  try {
    const loginUser = new LoginUseCase(userRepo);
    const result = await loginUser.execute(req.body);

    return sendResponse(res, {
      code: result.code,
      message: result.message,
      idReturn: result.user.id,
      accessToken: result.idToken,
      refreshToken: result.refreshToken,
      expiresIn: result.expiresIn,
    });
  } catch (error) {
    return sendResponse(res, {
      code: error.statusCode || StatusCodeEnum.internalServerError,
      message: error.message || "Internal server error",
    });
  }
};

exports.register = async (req, res) => {
  try {
    const registerUser = new RegiserUser(userRepo);
    const result = await registerUser.execute(req.body);

    return sendResponse(res, {
      code: result.code,
      message: result.message,
    });
  } catch (error) {
    return sendResponse(res, {
      code: error.statusCode || StatusCodeEnum.internalServerError,
      message: error.message || "Internal server error",
    });
  }
};

exports.confirmEmail = async (req, res) => {
  try {
    const confirmEmail = new ConfirmEmail(userRepo);
    const result = await confirmEmail.execute(req.body);

    return sendResponse(res, {
      code: result.code,
      message: result.message,
    });
  } catch (error) {
    return sendResponse(res, {
      code: error.statusCode || StatusCodeEnum.internalServerError,
      message: error.message || "Internal server error",
    });
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const useCase = new RefreshTokenUseCase();
    const result = await useCase.execute(refreshToken);

    return sendResponse(res, {
      code: result.code,
      message: result.message,
      accessToken: result.idToken,
      refreshToken: result.refreshToken,
      returnData: result.expiresIn,
    });
  } catch (err) {
    next(err);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const useCase = new ForgotPasswordUseCase(userRepo);
    const result = await useCase.execute(email);

    return sendResponse(res, {
      code: result.code,
      message: result.message,
    });
  } catch (err) {
    next(err);
  }
};

exports.verifyOTP = async (req, res, next) => {
  try {
    const useCase = new ForgotPasswordUseCase(userRepo);
    const result = await useCase.verifyOTP(req.body);

    return sendResponse(res, {
      code: result.code,
      message: result.message,
    });
  } catch (err) {
    next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const useCase = new ForgotPasswordUseCase(userRepo);
    const result = await useCase.resetPassword(req.body);

    return sendResponse(res, {
      code: result.code,
      message: result.message,
    });
  } catch (err) {
    next(err);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const useCase = new ChangePasswordUseCase(userRepo);
    const result = await useCase.excute(req.body);

    return sendResponse(res, {
      code: result.code,
      message: result.message,
    });
  } catch (err) {
    next(err);
  }
};
