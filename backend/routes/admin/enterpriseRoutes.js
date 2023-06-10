import express from "express";
import {
  getEnterpriseRequests,
  sendEnterPriseMail,
} from "../../controllers/enterpriseController.js";
import { adminAuth } from "../../middlewares/adminAuthMiddleware.js";
const enterpriseRouter = express.Router();

enterpriseRouter.get("/get", adminAuth, getEnterpriseRequests);
enterpriseRouter.post("/send", adminAuth, sendEnterPriseMail);

export default enterpriseRouter;
