import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userOtpVerificationSchema = new Schema({
  userId: String,
  otp: String,
  createdAt: Date,
  expiresAt: Date,
});

const userOtpVerification = mongoose.model(
  "UserOtpVerification",
  userOtpVerificationSchema
);
export default userOtpVerification;
