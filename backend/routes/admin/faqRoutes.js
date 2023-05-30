import express from "express";
import {
  createFaq,
  deleteFaq,
  getAllFaqs,
  updateFaq,
} from "../../controllers/faqController.js";
const faqRouter = express.Router();

faqRouter.get("/get", getAllFaqs);
faqRouter.post("/create", createFaq);
faqRouter.patch("/update", updateFaq);
faqRouter.delete("/delete/:faqId", deleteFaq);

export default faqRouter;
