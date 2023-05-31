import express from "express";
import { getAllFaqs } from "../../controllers/faqController.js";
const faqRouter = express.Router();

faqRouter.get("/get", getAllFaqs);

export default faqRouter;
