const nodemailer = require('nodemailer'); // nodemailer for sending emails

// Create a transporter
const transporterMail = nodemailer.createTransport({
  service: "Gmail", // or use Mailgun, SendGrid etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Export the transporter for use in other files
module.exports = transporterMail;
