import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

// Use nodemailer to send emails
export const sendEmail = async (params) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "anshvar2002@gmail.com",
      pass: "khaq bwng oity noyn",  // Use environment variables for security
    },
  });

  const mailOptions = {
    from: 'anshvar2002@gmail.com',
    to: params.email,
    subject: params.subject,
    html: params.body,  // Using HTML to send clickable links
  };

  await transporter.sendMail(mailOptions);
};
