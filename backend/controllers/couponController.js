import expressAsyncHandler from "express-async-handler";
import Coupon from "../models/couponModel.js";

const addCoupon = expressAsyncHandler(async (req, res) => {
  const { name, amount, amountType, plans } = req.body;
  const coupon = await Coupon.create({
    name,
    amount,
    amountType,
    plans,
  });
  res.json({
    status: "success",
    message: "Coupon has been created Successfully",
    coupon,
  });
});

const allCoupons = expressAsyncHandler(async (req, res) => {
  const coupons = await Coupon.find({});
  res.json({
    status: "success",
    message: "Coupons has been successfully fetched",
    coupons,
  });
});

export { addCoupon, allCoupons };
