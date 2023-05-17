import Stripe from "stripe";
import asyncHandler from "express-async-handler";
import generateToken from "./generateToken.js";
import User from "../models/userModel.js";
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const stripeUsers = asyncHandler(async (req, res) => {
  try {
    let userId = req.params.id;
    const { name, email, price } = req.body;
    let users = await User.findById(userId);
    if (!userId || !users) {
      res.json("please enter proper users");
    } else if (users) {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY.toString(), {
        apiVersion: "2022-11-15",
      });
      if (req.body) {
        const paymentMethod = await stripe.paymentMethods.create({
          type: "card",
          card: {
            number: "4242424242424242",
            exp_month: 8,
            exp_year: 2024,
            cvc: "314",
          },
        });

        const paymentIntent = await stripe.paymentIntents.create({
          currency: "EUR",
          amount: price,
          automatic_payment_methods: { enabled: true },
        });

        const customer = await stripe.customers.create({
          customer: customer.id,
          token: generateToken(customer._id),
          email: email,
          name: name,
          payment_method: paymentMethod,
          invoice_settings: { default_payment_method: paymentMethod },
        });
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: price,
        currency: "EUR",
        automatic_payment_methods: { enabled: true },
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error by Stripe" });
  }
});

export default stripeUsers;
