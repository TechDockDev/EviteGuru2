import express from "express";
import { getAllTransactions } from "../../controllers/transactionController.js";

const transactionRouter = express.Router();

transactionRouter.get("/get", getAllTransactions);

export default transactionRouter;
