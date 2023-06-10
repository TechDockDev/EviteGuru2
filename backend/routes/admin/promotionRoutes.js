import express from "express";
import {
  sendPromotion,
  sendSmsPromotion,
} from "../../controllers/promotionController.js";
import { adminAuth } from "../../middlewares/adminAuthMiddleware.js";

const promotionRouter = express.Router();

promotionRouter.post("/sendMail", adminAuth, sendPromotion);
promotionRouter.post("/sendSms", adminAuth, sendSmsPromotion);

export default promotionRouter;
