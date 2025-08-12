// utils/otpGenerator.js
function generateOTP(length = 6) {
  return Math.floor(
    Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
  ).toString();
}

function generatePassword(length = 6) {
  if (length < 3) {
    throw new Error(
      "Password length must be at least 3 to include uppercase, lowercase, and numbers"
    );
  }

  const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";

  const allChars = upperCase + lowerCase + numbers;

  let password = "";
  // đảm bảo có ít nhất 1 ký tự mỗi loại
  password += upperCase[Math.floor(Math.random() * upperCase.length)];
  password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];

  // thêm các ký tự còn lại
  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // shuffle để tránh pattern predictable
  password = password
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");

  return password;
}

module.exports = { generateOTP, generatePassword };
