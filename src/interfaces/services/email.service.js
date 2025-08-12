// services/emailService.js
const nodemailer = require("nodemailer");
const config = require("../../configs/env");
const StatusCodeEnum = require("../../common/enums/statusCode.enum");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.notifyEmail,
    pass: config.notifyEmailPass,
  },
});

exports.sendConfirmationCode = async (email, otp) => {
  try {
    // Logic to send email using a service like Nodemailer or SendGrid
    await transporter.sendMail({
      from: `"Tannee Group" <${config.notifyEmail}>`,
      to: `${email}`,
      subject: "🔒 [Tannee Group] OTP Register",
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #2b6cb0; padding: 16px; text-align: center; color: #fff;">
            <h2 style="margin: 0;">OTP Code To Confirm</h2>
          </div>
          <div style="padding: 24px; color: #333;">
            <p>Dear <b>Our Customer</b>,</p>
            
            <div style="margin: 24px 0; text-align: center;">
              <div style="background-color: #edf2f7; padding: 12px 20px; border-radius: 6px; margin-bottom: 12px; border: 1px solid #cbd5e0; text-align: left; display: inline-block;">
                <p style="margin: 0; font-size: 20px;">This is your OTP</p>
                <p style="margin: 8px 0 0 0; font-size: 20px;"><b>${otp}</b></p>
              </div>
            </div>

            <p style="margin-top: 32px;">Best regards,<br><b>Tannee Group</b></p>
          </div>
          <div style="background-color: #f7fafc; padding: 12px; text-align: center; font-size: 12px; color: #718096;">
            This is an automated email, please do not reply. For any questions, please contact the phone number below for support.
            <p style="margin-top: 15px;"><b>Phone: +84-972-778-134</b></p>
          </div>
        </div>`,
    });

    // Simulate email sending
    return { code: StatusCodeEnum.success, message: "Email sent successfully" };
  } catch (error) {
    console.error("❌ Failed to send confirmation email:", error.message);
    return { code: StatusCodeEnum.internal, message: "Failed to send email" };
  }
};

exports.sendPassword = async (email, password) => {
  try {
    await transporter.sendMail({
      from: `"Tannee Group" <${config.notifyEmail}>`,
      to: `${email}`,
      subject: "🎉 [Tannee Group] Your account has been created",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #2b6cb0; padding: 16px; text-align: center; color: #fff;">
            <h2 style="margin: 0;">Welcome To Santafe!</h2>
          </div>
          <div style="padding: 24px; color: #333;">
            <p>Dear <b>Our Customer</b>,</p>
            <p>Your account was created by an administrator. Here are the login details:</p>
            
            <div style="margin: 24px 0; text-align: center;">
              <div style="background-color: #edf2f7; padding: 12px 20px; border-radius: 6px; margin-bottom: 12px; border: 1px solid #cbd5e0; text-align: left; display: inline-block;">
                <p style="margin: 0; font-size: 15px;"><b>Account Login:</b> ${email}</p>
                <p style="margin: 8px 0 0 0; font-size: 15px;"><b>Your Password:</b> ${password}</p>
              </div>
            </div>

            <p>Please use the above information to log in and <b>change password now</b> after first login for security.</p>
            

            <p style="margin-top: 32px;">Best regards,<br><b>Tannee Group</b></p>
          </div>
          <div style="background-color: #f7fafc; padding: 12px; text-align: center; font-size: 12px; color: #718096;">
            This is an automated email, please do not reply. For any questions, please contact the phone number below for support.
            <p style="margin-top: 15px;"><b>Phone: 213-2686-108</b></p>
          </div>
        </div>
      `,
    });

    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("❌ Failed to send confirmation email:", error.message);
    return { success: false, message: "Failed to send email" };
  }
};
