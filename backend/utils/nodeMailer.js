import nodemailer from "nodemailer";

const emailConfig = async (email, otp) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.PASSWORD, // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: process.env.EMAIL, // sender address
    to: email, // list of receivers
    subject: "Change Password Using This OTP", // Subject line
    text: `${otp}  This Is Your Otp Number`, // plain text body
  });

  console.log("Message sent: %s", info.messageId);
  console.log(info);
};

export default emailConfig;
