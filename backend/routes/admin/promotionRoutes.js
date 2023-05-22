import express from "express";
import {
  sendPromotion,
  sendSmsPromotion,
} from "../../controllers/promotionController.js";

const promotionRouter = express.Router();

promotionRouter.post("/sendMail", sendPromotion);
promotionRouter.post("/sendSms", sendSmsPromotion);

export default promotionRouter;
