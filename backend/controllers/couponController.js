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

const getCoupon = expressAsyncHandler(async (req, res) => {
  const coupon = await Coupon.findById(req.params.couponId);
  res.json({
    status: "success",
    message: "Coupon has been successfully fetched",
    coupon,
  });
});

const updateCoupon = expressAsyncHandler(async (req, res) => {
  await Coupon.findByIdAndUpdate(req.params.couponId, req.body, {
    runValidators: true,
  });
  res.json({
    status: "success",
    message: "Coupon has been successfully updated",
  });
});

const deleteCoupon = expressAsyncHandler(async (req, res) => {
  await Coupon.findByIdAndRemove(req.params.couponId);
  res.json({
    status: "success",
    message: "Coupon has been successfully deleted",
  });
});

export { addCoupon, allCoupons, getCoupon, updateCoupon, deleteCoupon };
