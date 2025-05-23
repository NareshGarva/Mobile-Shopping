const transporter = require('../config/nodemailer');

exports.sendMail = async (Message, subject, email) => {

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


exports.sendMailRoute = async (req, res) => {
  const { message, email, subject, pdfFileName, pdf } = req.body;

  try {
    const mailOptions = {
      from: '"Mobile Shopping" <mobileshopping@clienz.in>',
      to: email,
      subject: subject,
      html: message,
    };

    // Attach PDF if provided
    if (pdfFileName && pdf) {
      mailOptions.attachments = [
        {
          filename: pdfFileName,
          content: Buffer.from(pdf, 'base64'),
          contentType: 'application/pdf'
        }
      ];
    }

    const mailResponse = await transporter.sendMail(mailOptions);

    console.log("Mail response received:", mailResponse);

    if (!mailResponse.accepted || mailResponse.accepted.length === 0) {
      throw new Error("Mail not accepted by recipient server");
    }

    return res.status(200).json({ 
      success: true, 
      message: "Mail sent successfully", 
      response: mailResponse 
    });

  } catch (error) {
    console.error("Error in sending mail:", error);

    return res.status(500).json({ 
      success: false, 
      message: "Error sending mail", 
      error: error.message || error 
    });
  }
};



