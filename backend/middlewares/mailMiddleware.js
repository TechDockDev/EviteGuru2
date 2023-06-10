import { response } from "express";
import nodemailer from "nodemailer";
import { clientUrl } from "../utils/url.js";
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
        html: body,
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
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  } catch (error) {
    console.log(error);
    response.json({
      status: "error",
      message: "Error occured while sending email" + error.message,
    });
  }
}

const generateHtml = (id, event, address) => {
  return `
<html>
<head>
<title>Invitation</title>
</head>
<body>
<p>Hey! You got an invitation for ${
    event.name
  } Event.Click on the button below to view your Event Details.</p>
<button style='display:block;background-color:blue; border:none;padding:10px;border-radius:10px;margin:auto;margin-top: 30px;'><a style='text-decoration:none; color:white;' href=${`${clientUrl}/guest-event-view-screen/${event._id}/${id}`}><b>View Invitation</b></a></button>
</body>
</html>`;
};

async function sendBulkPersonalizedEmails(event, guestInfo, address) {
  try {
    guestInfo = guestInfo.filter((guest) => guest !== undefined);
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
    guestInfo.forEach(({ id, email }) => {
      if (email) {
        let info = transporter.sendMail(
          {
            from: "Eviteguru", // sender address
            to: email, // list of receivers
            subject: `Invitation for ${event.name} Event`, // Subject line
            // text: body,
            html: generateHtml(id, event, address),
          },
          (err, info) => {
            if (err) {
              console.log(err);
              throw new Error(err);
            }
          }
        );
      }
    });

    // console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  } catch (error) {
    console.log(error);
    response.json({
      status: "error",
      message: "Error occured while sending email" + error.message,
    });
  }
}
export { sendMail, sendBulkPersonalizedEmails };
