import mongoose from "mongoose";

const subscriptionsSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: Array, required: true },
    price: { type: Number, required: true },
    withdrawalMonths: { type: Number, required: true },
    templateLimits: { type: Number, required: true },
    guestLimits: { type: Number, required: true },

    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    templateid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "guestDetails",
    },
  },

  { timestamps: true }
);

const Subscription = mongoose.model("Subscription", subscriptionsSchema);

export default Subscription;
