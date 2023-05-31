import expressAsyncHandler from "express-async-handler";
import Subscription from "../models/subscriptionModel.js";
import Stripe from "stripe";
import Payment from "../models/paymentModel.js";
import User from "../models/userModel.js";
import ip from "ip";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const purchasePlan = expressAsyncHandler(async (req, res) => {
  const { planId, planType } = req.body;
  const plan = await Subscription.findById(planId);
  const amount = plan.price[`${planType}ly`];
  const session = await stripe.checkout.sessions.create({
    metadata: { planId, planType, user: req.user.id },
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
    success_url: `http://${ip.address()}:8085/api/v1/user/plan/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `http://${ip.address()}:8085/api/v1/user/plan/failure`,
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
