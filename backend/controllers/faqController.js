import expressAsyncHandler from "express-async-handler";
import FAQ from "../models/faqModel.js";

const getAllFaqs = expressAsyncHandler(async (req, res) => {
  const faqs = await FAQ.find({});
  res.json({
    status: "success",
    message: "FAQ's have been fetched successfully",
    faqs,
  });
});

const createFaq = expressAsyncHandler(async (req, res) => {
  const { question, answer } = req.body;
  await FAQ.create({ question, answer });
  res.json({
    status: "success",
    message: "FAQ has been successfully created",
  });
});

const updateFaq = expressAsyncHandler(async (req, res) => {
  const { faqId, question, answer } = req.body;
  await FAQ.findByIdAndUpdate(
    faqId,
    { question, answer },
    { runValidators: true }
  );
  res.json({
    status: "success",
    message: "FAQ has been successfully updated",
  });
});

const deleteFaq = expressAsyncHandler(async (req, res) => {
  const { faqId } = req.params;
  await FAQ.findByIdAndRemove(faqId);
  res.json({
    status: "success",
    message: "FAQ has been successfully deleted",
  });
});

export { getAllFaqs, createFaq, updateFaq, deleteFaq };
