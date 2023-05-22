import { response } from "express";
import nodemailer from "nodemailer";

async function sendMail(subject, body, emails) {
  try {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "conrad.huel@ethereal.email", // generated ethereal user
        pass: "Pjs6dmvjXsu6xXbhAQ", // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = transporter.sendMail(
      {
        from: "Eviteguru", // sender address
        to: emails, // list of receivers
        subject: subject, // Subject line
        text: body, // Subject line
        // html: body, // html body
      },
      (err, info) => {
        if (err) {
          throw new Error(err);
        }
      }
    );

    // console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  } catch (error) {
    console.log(error);
    response.json({
      status: "error",
      message: "Error occured while sending email" + error.message,
    });
  }
}

export { sendMail };
