const nodemailer = require('nodemailer'); // nodemailer for sending emails

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Export the transporter for use in other files
module.exports = transporter;
