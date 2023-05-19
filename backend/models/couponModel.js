import mongoose from "mongoose";
const couponSchema = mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  amountType: { type: String, required: true, enums: ["price", "percentage"] },
  plans: { type: Array, required: true },
});

const Coupon = mongoose.model("coupon", couponSchema);

export default Coupon;
