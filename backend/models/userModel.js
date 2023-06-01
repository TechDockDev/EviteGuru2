import bcrypt from "bcryptjs";
import dayjs from "dayjs";
import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    userType: { type: String, enum: ["normal", "google"] },
    email: { type: String, required: true, unique: true },
    phone: {
      type: Number,
      required: function () {
        return this.userType === "normal";
      },
    },
    password: {
      type: String,
      required: function () {
        return this.userType === "normal";
      },
      select: false,
    },
    templateNum: { type: Number, default: 0 },
    guestNum: { type: Number, default: 0 },
    suspended: { type: Boolean, default: false },
    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subscription",
    },
    planType: {
      type: String,
      enum: ["month", "year"],
      required: function () {
        return this.subscription !== undefined;
      },
    },
    planStartDate: {
      type: Date,
      required: function () {
        return this.subscription !== undefined;
      },
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "event",
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
  },
  {
    virtuals: {
      planEndDate: {
        get() {
          if (this.planType === "month") {
            return dayjs(this.planStartDate)
              .add(30, "day")
              .format("DD-MM-YYYY");
          } else {
            if (this.planType === "year") {
              return dayjs(this.planStartDate)
                .add(1, "year")
                .format("DD-MM-YYYY");
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

const User = mongoose.model("User", userSchema);

export default User;
