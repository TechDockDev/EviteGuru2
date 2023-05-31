import dayjs from "dayjs";
import mongoose from "mongoose";
const paymentSchema = mongoose.Schema(
  {
    amount: { type: String, required: true },
    plan: { type: mongoose.Types.ObjectId, ref: "subscription" },
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    planType: {
      type: String,
      enums: ["month", "year"],
    },
  },
  {
    timestamps: true,
    virtuals: {
      planEndDate: {
        get() {
          if (this.planType === "month") {
            return dayjs(this.createdAt).add(30, "day").format("DD-MM-YYYY");
          } else {
            if (this.planType === "year") {
              return dayjs(this.createdAt).add(1, "year").format("DD-MM-YYYY");
            }
          }
        },
      },
    },
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

const Payment = mongoose.model("payment", paymentSchema);

export default Payment;
