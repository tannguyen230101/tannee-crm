const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firebaseUid: { type: String, required: true, unique: true },
    email: String,
    name: String,
    avatar: String,
    phone: String,
    company: String,
    isEmailConfirmed: { type: Boolean, default: false },
    role: { type: Number, default: 0 },
    confirmationCode: String,
    codeExpiredAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
