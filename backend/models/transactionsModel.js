import mongoose from "mongoose";
const transactionSchema = mongoose.Schema(
  {
    amount: { type: Number },
    plan: { type: String },
    transactionId: { type: String },
    user: { type: mongoose.Types.ObjectId, ref: "user" },
  },
  { timesatamps: true }
);

const Transaction = mongoose.model("variation", transactionSchema);

export default Transaction;
