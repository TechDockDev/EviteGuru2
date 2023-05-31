import expressAsyncHandler from "express-async-handler";
import Enterprise from "../models/EnterpriseModel.js";
import { sendSms } from "../middlewares/smsMiddleware.js";
import { sendMail } from "../middlewares/mailMiddleware.js";
import User from "../models/userModel.js";
import Subscription from "../models/subscriptionModel.js";
import ip from "ip";
import Stripe from "stripe";
import Payment from "../models/paymentModel.js";
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const stripe = new Stripe(
  "sk_test_51MmTTLJyawffnqCDMx48PrzogYc49QK4yGdJOVUuCHljgBpvZFSXtM6I2NNRPkJ5zCDALHohta1hhpcNEkuYxBSs00K7A7xSRZ"
);

const createEnterpriseRequest = expressAsyncHandler(async (req, res) => {
  const { templateLimit, inviteeLimit, comment } = req.body;
  await Enterprise.create({
    user: req.user.id,
    templateLimit,
    inviteeLimit,
    comment,
    status: "pending",
  });
  res.json({
    status: "success",
    message: "enterprise Request has been created successfully",
  });
});

const getEnterpriseRequests = expressAsyncHandler(async (req, res) => {
  let requests = await Enterprise.find({ status: "pending" }).populate("user");
  requests = requests.map((request) => {
    return {
      id: request.id,
      name: request.user.name,
      email: request.user.email,
      phone: request.user.phone,
      details: {
        templateLimit: request.templateLimit,
        inviteeLimit: request.inviteeLimit,
        comment: request.comment,
      },
    };
  });
  res.json({
    status: "success",
    message: "enterprise Request has been created successfully",
    requests,
  });
});

const sendEnterPriseMail = expressAsyncHandler(async (req, res) => {
  const { amount, enterpriseId } = req.body;
  const enterprise = await Enterprise.findByIdAndUpdate(
    enterpriseId,
    {
      amount,
      status: "sent",
    },
    { runValidators: true }
  ).populate("user", "email");
  const plan = await Subscription.findOne({ name: "Enterprise" });
  const session = await stripe.checkout.sessions.create({
    metadata: {
      plan: plan.id,
      planType: "year",
      user: enterprise.user.id,
      enterpriseId,
    },
    currency: "usd",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "enterprise",
          },
          unit_amount: `${amount}00`,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `http://${ip.address()}:8085/api/v1/user/enterprise/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `http://${ip.address()}:8085/api/v1/user/enterprise/failure`,
  });
  const html = `<!DOCTYPE html>
  <html>
  <head>
  <title>Page Title</title>
  </head>
  <body>
  <p>Your Enterprise request has been approved Click on the below button to make payment for your subscription.</p>
  <button style='display:block;background-color:blue; border:none;padding:10px;border-radius:10px;margin:auto;margin-top: 30px;'><a style='text-decoration:none; color:white;' href=${session.url}><b>Make Payment</b></a></button>
  </body>
  </html>`;
  await sendMail(
    "EviteGuru enterprise Subscription Request",
    html,
    enterprise.user.email
  );
  //   sendSms;
  res.json({
    status: "success",
    message: "enterprise subscription Link has been sent successfully",
  });
});

const enterPrisePurchaseSuccess = expressAsyncHandler(async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  const { metadata } = session;
  if (session.payment_status === "paid") {
    await Payment.create({
      amount: session.amount_total,
      plan: metadata.plan,
      user: metadata.user,
      planType: metadata.planType,
    });
    const enterprise = await Enterprise.findById(metadata.enterpriseId);
    const user = await User.findById(metadata.user);
    user.subscription = metadata.plan;
    user.planType = metadata.planType;
    user.planStartDate = Date.now();
    user.templateNum = enterprise.templateLimit;
    user.guestNum = enterprise.inviteeLimit;
    await user.save();
    res.json({
      status: "success",
      message: "enterprise subscription has been purchased successfully",
    });
  }
});

const enterPrisePurchaseFail = expressAsyncHandler(async (req, res) => {
  res.json({
    status: "fail",
    message: "enterprise subscription Payment Fail",
  });
});
export {
  createEnterpriseRequest,
  getEnterpriseRequests,
  sendEnterPriseMail,
  enterPrisePurchaseSuccess,
  enterPrisePurchaseFail,
};
