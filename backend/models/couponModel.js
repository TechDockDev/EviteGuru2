import mongoose from "mongoose";
const couponSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  amountType: { type: String, required: true, enum: ["price", "percentage"] },
  plans: { type: Array, required: true },
});

const Coupon = mongoose.model("coupon", couponSchema);

export default Coupon;
