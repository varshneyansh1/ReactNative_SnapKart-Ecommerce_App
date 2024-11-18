import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

// Use nodemailer to send emails
export const sendEmail = async (params) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.USER_NAME,
      pass: process.env.USER_PASS, // Use environment variables for security
    },
  });

  const mailOptions = {
    from: process.env.USER_NAME,
    to: params.email,
    subject: params.subject,
    html: params.body, // Using HTML to send clickable links
  };

  await transporter.sendMail(mailOptions);
};
