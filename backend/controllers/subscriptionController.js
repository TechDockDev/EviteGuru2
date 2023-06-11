import expressAsyncHandler from "express-async-handler";
import Subscription from "../models/subscriptionModel.js";
import Stripe from "stripe";
import Payment from "../models/paymentModel.js";
import User from "../models/userModel.js";
import Coupon from "../models/couponModel.js";
import { getCouponDiscountAmount } from "../utils/applyCoupon.js";
import url, { clientUrl } from "../utils/url.js";
const stripe = new Stripe(
  "sk_test_51MmTTLJyawffnqCDMx48PrzogYc49QK4yGdJOVUuCHljgBpvZFSXtM6I2NNRPkJ5zCDALHohta1hhpcNEkuYxBSs00K7A7xSRZ"
);

const purchasePlan = expressAsyncHandler(async (req, res) => {
  const { planId, planType, couponText } = req.body;
  const plan = await Subscription.findById(planId);
  const coupon = await Coupon.findOne({
    name: { $regex: new RegExp("^" + couponText.toLowerCase(), "i") },
  });
  let amount = 0;
  if (couponText) {
    const { actualPrice } = getCouponDiscountAmount(plan, planType, coupon);
    amount = actualPrice;
  } else {
    amount = plan.price[`${planType}ly`];
  }
  const session = await stripe.checkout.sessions.create({
    metadata: { plan: plan.name, planId, planType, user: req.user.id },
    currency: "usd",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: plan.name,
          },
          unit_amount: `${amount}00`,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${url}/api/v1/user/plan/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${url}/api/v1/user/plan/failure`,
  });
  res.json({ url: session.url });
  // res.redirect(303, session.url);
});

const paymentSuccess = expressAsyncHandler(async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  if (session.payment_status === "paid") {
    await Payment.create({
      amount: session.amount_total,
      plan: session.metadata.planId,
      user: session.metadata.user,
      planType: session.metadata.planType,
    });
    const user = await User.findById(session.metadata.user);
    user.subscription = session.metadata.planId;
    user.planType = session.metadata.planType;
    user.planStartDate = Date.now();
    await user.save();
  }
  const ipAddress = req.socket.remoteAddress;
  const address = ipAddress.replace(/^.*:/, "");
  res.redirect(
    `${clientUrl}/payment/success/status?amount=${session.amount_total
      .toString()
      .slice(0, -2)}&plan=${session.metadata.plan}`
  );
});

const paymentFailure = expressAsyncHandler(async (req, res) => {
  res.redirect(`${clientUrl}/`);
});

const createPlan = expressAsyncHandler(async (req, res) => {
  const data = await Subscription.create(req.body);
  res.json({
    status: "success",
    message: "Subscription Plan has been created Successfully",
    data,
  });
});

const viewallPlans = expressAsyncHandler(async (req, res) => {
  const plans = await Subscription.find({});
  res.json({
    status: "success",
    message: "Plans have been fetched successfully",
    plans,
  });
});

const viewPlan = expressAsyncHandler(async (req, res) => {
  const plan = await Subscription.findById(req.params.id);
  res.json({
    status: "success",
    message: "Subscription Plan has been fetched Successfully",
    plan,
  });
});

const updatePlan = expressAsyncHandler(async (req, res) => {
  await Subscription.findByIdAndUpdate(req.params.id, req.body);
  res.json({
    status: "success",
    message: "Subscription Plan updated Successfully",
  });
});

const deletePlan = expressAsyncHandler(async (req, res) => {
  await Subscription.findByIdAndRemove(req.params.id);
  res.json({
    status: "success",
    message: "Subscription Plan has been deleted successfully",
  });
});

export {
  createPlan,
  viewallPlans,
  viewPlan,
  updatePlan,
  deletePlan,
  purchasePlan,
  paymentSuccess,
  paymentFailure,
};
