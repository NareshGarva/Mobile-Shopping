const transporter = require('../config/nodemailer');

const sendMail = async (Message, subject, email) => {
  try {
    const mailResponse = await transporter.sendMail({
      from: '"Mobile Shopping" <mobileshopping@clienz.in>',
      to: email,
      subject: subject,
      html: Message,
    });

    console.log("Mail response received:", mailResponse);

    if (!mailResponse.accepted || mailResponse.accepted.length === 0) {
      throw new Error("Mail not accepted by recipient server");
    }

    return { success: true, message: "Mail sent successfully", response: mailResponse };

  } catch (error) {
    console.error("Error in sending mail:", error);
    return { success: false, message: "Error sending mail", error };
  }
};

module.exports = sendMail;
