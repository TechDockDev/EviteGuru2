import expressAsyncHandler from "express-async-handler";
import Payment from "../models/paymentModel.js";

const getAllTransactions = expressAsyncHandler(async (req, res) => {
  const payments = await Payment.find({}).populate("plan").populate("user");
  res.json({
    status: "success",
    message: "Payments have been fetched successfully",
    payments,
  });
});

export { getAllTransactions };
