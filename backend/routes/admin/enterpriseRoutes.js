import express from "express";
import {
  getEnterpriseRequests,
  sendEnterPriseMail,
} from "../../controllers/enterpriseController.js";
const enterpriseRouter = express.Router();

enterpriseRouter.get("/get", getEnterpriseRequests);
enterpriseRouter.post("/send", sendEnterPriseMail);

export default enterpriseRouter;
