import expressAsyncHandler from "express-async-handler";
import Subscription from "../models/subscriptionModel.js";
import Stripe from "stripe";
import Payment from "../models/paymentModel.js";
import User from "../models/userModel.js";
const stripe = new Stripe(
  "sk_test_51MmTTLJyawffnqCDMx48PrzogYc49QK4yGdJOVUuCHljgBpvZFSXtM6I2NNRPkJ5zCDALHohta1hhpcNEkuYxBSs00K7A7xSRZ"
);

const purchasePlan = expressAsyncHandler(async (req, res) => {
  const { plan, planType } = req.body;
  const amount = await Subscription.findById(plan)[planType].amount;
  console.log(amount);
  const session = await stripe.checkout.sessions.create({
    metadata: { plan, planType },
    currency: "usd",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: plan,
          },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url:
      "http://localhost:8085/api/v1/user/plan/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "http://localhost:8085/api/v1/user/plan/failure",
  });
  res.redirect(303, session.url);
});

const paymentSuccess = expressAsyncHandler(async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  console.log(session.payment_status);
  console.log(session.metadata.plan);
  console.log(session.amount_total);
  console.log(session);
  if (session.payment_status === "paid") {
    await Payment.create({
      amount: session.amount_total,
      plan: session.metadata.plan,
      user: req.user.id,
    });
    const user = await User.findById(req.user.id);
    user.subscription = session.metadata.plan;
    user.planType = session.metadata.planType;
    user.planStartDate = new Date.now();
    await user.save();
  }
  res.json({
    status: "success",
    message: "Payment has been successful",
  });
});

const paymentFailure = expressAsyncHandler(async (req, res) => {
  res.json({
    status: "failure",
    message: "Payment has been failed",
  });
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
