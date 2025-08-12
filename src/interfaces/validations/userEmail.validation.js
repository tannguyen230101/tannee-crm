// const { getAuth } = require("../../infrastructures/firebase/firebase");
const StatusCodeEnum = require("../../common/enums/statusCode.enum");
const AppError = require("../../interfaces/services/AppError");
const User = require("../../domains/entities/User");


module.exports.validateUserEmail = async (email) => {
  // Check email tồn tại trong DB
  const existingUser = await User.findOne({ email });
  if (existingUser)
    throw new AppError("User already exists", StatusCodeEnum.badRequest);
};
