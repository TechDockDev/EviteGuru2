import { sendMail } from "../middlewares/mailMiddleware.js";
import { sendSms } from "../middlewares/smsMiddleware.js";
import expressAsyncHandler from "express-async-handler";

const sendPromotion = expressAsyncHandler((req, res) => {
  const { subject, body, emails } = req.body;
  sendMail(subject, body, emails).then(() => {
    res.json({
      status: "success",
      message: "Email's have been successfully sent",
    });
  });
});

const sendSmsPromotion = expressAsyncHandler((req, res) => {
  const { message, numbers } = req.body;
  sendSms(message, numbers)
    .then((message) => {
      res.json({
        status: "success",
        message: "SMS have been successfully sent",
        id:message
      });
    })
    .catch((error) => {
      console.log(error);
      res.json({
        status: "error",
        message: "some error occured while sending the message",
        error,
      });
    });
});

export { sendPromotion, sendSmsPromotion };
