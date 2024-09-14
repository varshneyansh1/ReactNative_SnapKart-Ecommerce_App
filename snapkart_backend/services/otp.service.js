import otpGenerator from "otp-generator";
import crypto from "crypto";
import { sendEmail } from "../services/emailer.service.js";

const key = "test123"; // Secret key for OTP

export const sendOTP = async (email) => {
  const otp = otpGenerator.generate(4, { digits: true, upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
  const ttl = 5 * 60 * 1000; // 5 minutes expiry
  const expires = Date.now() + ttl;
  const data = `${email}.${otp}.${expires}`;
  const hash = crypto.createHmac("sha256", key).update(data).digest("hex");
  const fullHash = `${hash}.${expires}`;

  const otpMessage = `Dear User, ${otp} is the one-time password for your email verification.`;

  const model = {
    email: email,
    subject: "Registration OTP",
    body: otpMessage
  };

  await sendEmail(model);
  return fullHash; // Return OTP hash to store and verify later
};

export const verifyOTP = (email, otp, hash) => {
  const [hashValue, expires] = hash.split('.');
  if (Date.now() > parseInt(expires)) {
    throw new Error("OTP Expired");
  }

  const data = `${email}.${otp}.${expires}`;
  const newCalculatedHash = crypto.createHmac("sha256", key).update(data).digest("hex");

  if (newCalculatedHash === hashValue) {
    return true; // OTP verified
  }

  throw new Error("Invalid OTP");
};
