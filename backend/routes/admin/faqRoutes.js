import express from "express";
import {
  createFaq,
  deleteFaq,
  getAllFaqs,
  updateFaq,
} from "../../controllers/faqController.js";
import { adminAuth } from "../../middlewares/adminAuthMiddleware.js";
const faqRouter = express.Router();

faqRouter.get("/get", adminAuth, getAllFaqs);
faqRouter.post("/create", adminAuth, createFaq);
faqRouter.patch("/update", adminAuth, updateFaq);
faqRouter.delete("/delete/:faqId", adminAuth, deleteFaq);

export default faqRouter;
