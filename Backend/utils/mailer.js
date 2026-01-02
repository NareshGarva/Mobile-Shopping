import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API);

export const sendMail = async (Message, subject, email, error) => {

  try {
    const mailResponse = await resend.emails.send({
      from: '"Mobile Shopping" <info@artifyr.in>',
      to: email,
      subject: subject,
      html: Message,
    });

    console.log("Mail response received:", mailResponse);

    if (error) {
    return console.error({ error });
  }

    return { success: true, message: "Mail sent successfully", response: mailResponse };

  } catch (error) {
    console.error("Error in sending mail:", error);
    return { success: false, message: "Error sending mail", error };
  }
};


export const sendMailRoute = async (req, res) => {
  const { message, email, subject, pdfFileName, pdf,error } = req.body;

  try {
    const mailOptions = {
      from: '"Mobile Shopping" <nareshgarva@artifyr.in>',
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

    const mailResponse = await resend.emails.send(mailOptions);

    console.log("Mail response received:", mailResponse);

   
    if (error) {
    return console.error({ error });
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



