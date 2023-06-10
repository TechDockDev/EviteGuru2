import expressAsyncHandler from "express-async-handler";
import Coupon from "../models/couponModel.js";
import Subscription from "../models/subscriptionModel.js";
import { getCouponDiscountAmount } from "../utils/applyCoupon.js";

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

const getCouponByPlan = expressAsyncHandler(async (req, res) => {
  const { planName } = req.params;
  const coupon = await Coupon.find({ plans: planName });
  res.json({
    status: "success",
    message: "Coupons has been successfully fetched",
    coupon,
  });
});

const applyCoupon = expressAsyncHandler(async (req, res) => {
  const { couponText, planId, planType } = req.body;
  const plan = await Subscription.findById(planId);
  const coupon = await Coupon.findOne({
    name: { $regex: new RegExp("^" + couponText.toLowerCase(), "i") },
  });
  if (!coupon) {
    return res.status(404).json({
      status: "error",
      message: "Coupon not found",
    });
  }
  if (!coupon.plans.includes(plan.name)) {
    return res.status(406).json({
      status: "error",
      message: "This Coupon is not applicable",
    });
  }
  const { actualPrice, discountedPrice, discountPercentage } =
    getCouponDiscountAmount(plan, planType, coupon);
  res.json({
    status: "success",
    message: "Coupon has been applied successfully",
    discountedPrice,
    actualPrice,
    discountPercentage,
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

export {
  addCoupon,
  allCoupons,
  getCoupon,
  updateCoupon,
  deleteCoupon,
  applyCoupon,
  getCouponByPlan,
};
