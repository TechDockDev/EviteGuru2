import mongoose from "mongoose";

const subscriptionsSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: Array, required: true },
  price: {
    monthly: {
      type: Number,
      required: function () {
        return this.name !== "Enterprise";
      },
    },
    yearly: {
      type: Number,
      required: function () {
        return this.name !== "Enterprise";
      },
    },
  },
  templateLimit: {
    type: Number,
    required: function () {
      return this.name !== "Enterprise";
    },
  },
  guestLimit: {
    type: Number,
    required: function () {
      return this.name !== "Enterprise";
    },
  },
});

const Subscription = mongoose.model("subscription", subscriptionsSchema);

export default Subscription;
