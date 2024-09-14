import express from "express";
import {
  checkIsVerified,
  getUserProfileController,
  loginController,
  logoutController,
  otpSignup,
  passwordResetController,
  registerController,
  udpatePasswordController,
  updateProfileController,
  updateProfilePicController,
  verifyEmail,
} from "../controllers/userController.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { singleUpload } from "../middlewares/multer.js";
import { rateLimit } from "express-rate-limit";
// RATE LIMITER
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Use an external store for consistency across multiple server instances.
});
// router object
const router = express.Router();

// routes
// register
router.post("/register", limiter, registerController);
//login
router.post("/login", limiter,checkIsVerified, loginController);
//profile
router.get("/profile", isAuth, getUserProfileController);
//logout
router.get("/logout", isAuth, logoutController);
//update profile
router.put("/profile-update", isAuth, updateProfileController);
// updte password
router.put("/update-password", isAuth, udpatePasswordController);
//update profile pic
router.put("/update-picture", isAuth, singleUpload, updateProfilePicController);

//otp verification
router.post("/signup", otpSignup); // Request to send OTP and save temporary user data
router.get("/verify-email", verifyEmail); // Verify OTP and create user


//  FORGOT PASSWORD
router.post("/reset-password", passwordResetController);
export default router;
