import mongoose from "mongoose";

const subscriptionsSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: Array, required: true },
  price: {
    monthly: { type: Number, required: true },
    yearly: { type: Number, required: true },
  },
  templateLimit: { type: Number, required: true },
  guestLimit: { type: Number, required: true },
});

const Subscription = mongoose.model("subscription", subscriptionsSchema);

export default Subscription;
