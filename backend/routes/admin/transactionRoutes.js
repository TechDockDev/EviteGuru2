import express from "express";
import { getAllTransactions } from "../../controllers/transactionController.js";
import { adminAuth } from "../../middlewares/adminAuthMiddleware.js";

const transactionRouter = express.Router();

transactionRouter.get("/get", adminAuth, getAllTransactions);

export default transactionRouter;
