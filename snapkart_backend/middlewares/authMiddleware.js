import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";
export const isAuth = async (req, res, next) => {
  // Extract token from Authorization header
  const authHeader = req.headers.authorization;

  // Check if the Authorization header is present
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send({
      success: false,
      message: "Unauthorized user",
    });
  }

  // Extract the token (after 'Bearer ')
  const token = authHeader.split(' ')[1];

  try {
    // Validate the token
    const decodeData = JWT.verify(token, process.env.JWT_SECRET);

    // Attach user to request
    req.user = await userModel.findById(decodeData._id);
    
    // Proceed to the next middleware or route
    next();
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
// ADMIN AUTH
export const isAdmin = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(401).send({
      success: false,
      message: "admin only",
    });
  }
  next();
};