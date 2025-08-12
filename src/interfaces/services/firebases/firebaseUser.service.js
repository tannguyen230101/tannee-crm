const { getAuth } = require("../../../infrastructures/firebase/firebase");
const AppError = require("../AppError");
const StatusCodeEnum = require("../../../common/enums/statusCode.enum");

class FirebaseUserService {
  /**
   * Tạo user mới trong Firebase Auth
   * @param {Object} data { email, password, displayName }
   * @returns {Promise<UserRecord>}
   */
  async createUser({ email, password }) {
    try {
      const userRecord = await getAuth().createUser({
        email,
        password,
      });
      return userRecord;
    } catch (error) {
      if (error.code === "auth/email-already-exists") {
        throw new AppError(
          "Email already exists in Firebase",
          StatusCodeEnum.badRequest
        );
      }
      throw error;
    }
  }

  async updatePassword(uid, newPassword) {
    try {
      await getAuth().updateUser(uid, { password: newPassword });
      return { message: "Password updated successfully" };
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        throw new AppError("User not found", StatusCodeEnum.notFound);
      }
      throw error;
    }

  }
}

module.exports = new FirebaseUserService();
