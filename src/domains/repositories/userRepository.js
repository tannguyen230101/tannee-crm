const User = require("../entities/User");
const BaseRepository = require("./baseRepository");
const firebaseUserService = require("../../interfaces/services/firebases/firebaseUser.service");
const {
  validateUserEmail,
} = require("../../interfaces/validations/userEmail.validation");

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  async createUserWithValidation(data) {
    const { email, password } = data;
    // console.log("Creating user with data:", data);
    await validateUserEmail(email);

    const userRecord = await firebaseUserService.createUser({
      email,
      password,
    });

    const newUser = {
      ...data,
      firebaseUid: userRecord.uid,
      email: userRecord.email,
    };
    // console.log("newUser", newUser);

    return await this.create(newUser);
  }

  async updatePassword(uid, newPassword) {
    // console.log("Updating password for UID:", uid);
    return await firebaseUserService.updatePassword(uid, newPassword);
  }
}

module.exports = UserRepository;
