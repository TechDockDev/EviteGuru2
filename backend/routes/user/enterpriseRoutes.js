import express from "express";
import {
  createEnterpriseRequest,
  enterPrisePurchaseFail,
  enterPrisePurchaseSuccess,
} from "../../controllers/enterpriseController.js";
import { userAuth } from "../../middlewares/authMiddleware.js";
const enterpriseRouter = express.Router();

enterpriseRouter.post("/create", userAuth, createEnterpriseRequest);
enterpriseRouter.get("/success", enterPrisePurchaseSuccess);
enterpriseRouter.get("/failure", enterPrisePurchaseFail);

export default enterpriseRouter;
