"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const nodemailer_1 = __importDefault(require("nodemailer"));
// Configure transporter with your email provider's SMTP settings
const transporter = nodemailer_1.default.createTransport({
    secure: process.env.SMTP_PORT === "465", // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    requireTLS: true,
    host: process.env.SMTP_HOST,
    port: +process.env.SMTP_PORT,
});
// Send verification email function
function sendVerificationEmail(to, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const verificationUrl = `http://localhost:3000/app/smarton/v1/verify?token=${token}`;
        const mailOptions = {
            from: `Kebta ${process.env.EMAIL_USER}`,
            to,
            subject: "Email Verification",
            text: `Click on the link to verify your email: ${verificationUrl}`,
            html: `<div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 8px;">
  <h2 style="color: #007bff; text-align: center;">Verify Your Email Address</h2>
  <p style="font-size: 16px; line-height: 1.5;">
    Hello,
  </p>
  <p style="font-size: 16px; line-height: 1.5;">
    Thank you for signing up! Please confirm your email address by clicking the link below. This helps us verify that we have the correct email on file for you.
  </p>
  <p style="text-align: center; margin-top: 20px;">
    <a href="${verificationUrl}" style="display: inline-block; padding: 12px 24px; color: #fff; background-color: #007bff; text-decoration: none; font-size: 16px; border-radius: 5px;">
      Verify Email
    </a>
  </p>
  <p style="font-size: 14px; color: #666; line-height: 1.5; margin-top: 20px;">
    If you didn't create an account with us, please ignore this email.
  </p>
  <hr style="border: 0; height: 1px; background-color: #ddd; margin: 20px 0;">
  <p style="font-size: 12px; color: #999; text-align: center;">
    © 2023 Kebta Inc. All rights reserved.<br>
    <a href="https://your-website.com" style="color: #007bff; text-decoration: none;">Visit our website</a> | <a href="mailto:support@kebta.com" style="color: #007bff; text-decoration: none;">Contact Support</a>
  </p>
</div>
`,
        };
        const a = yield transporter.sendMail(mailOptions);
        console.log(a);
    });
}
exports.default = sendVerificationEmail;
