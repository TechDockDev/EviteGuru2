import mongoose from "mongoose";
const paymentSchema = mongoose.Schema(
  {
    amount: { type: String, required: true },
    plan: { type: mongoose.Types.ObjectId, ref: "user" },
    user: { type: mongoose.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

const Payment = mongoose.model("payment", paymentSchema);

export default Payment;
