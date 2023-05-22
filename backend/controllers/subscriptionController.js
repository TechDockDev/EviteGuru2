import expressAsyncHandler from "express-async-handler";
import Subscription from "../models/subscriptionModel.js";
import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51MmTTLJyawffnqCDMx48PrzogYc49QK4yGdJOVUuCHljgBpvZFSXtM6I2NNRPkJ5zCDALHohta1hhpcNEkuYxBSs00K7A7xSRZ"
);

const purchasePlan = expressAsyncHandler(async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "price_1NAZJ7JyawffnqCDJOvm7Esw",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:8085/api/v1/user/plan/success",
    cancel_url: "http://localhost:8085/api/v1/user/plan/failure",
    // automatic_tax: { enabled: true },
  });
  res.redirect(303, session.url);
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
};
