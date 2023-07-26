import bcrypt from "bcryptjs";
import dayjs from "dayjs";
import cron from "node-cron";
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
    profilePhoto: {
      type: String,
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

// Schedule the cron job to run daily at midnight (adjust the timing as needed)
cron.schedule("0 0 * * *", async () => {
  try {
    const users = await User.find({
      planEndDate: { $lte: new Date() },
      subscription: { $exists: true },
    });
    let expiredSubscriptions = users.filter(
      (user) => dayjs(user.planEndDate, "DD-MM-YYYY").toDate() < new Date()
    );
    expiredSubscriptions = expiredSubscriptions.map((user) => user._id);
    const updateData = {
      subscription: undefined,
      planStartDate: undefined,
      planType: undefined,
    };
    await User.updateMany(
      { _id: { $in: expiredSubscriptions } },
      { $set: updateData }
    );
  } catch (error) {
    console.error("Error deleting expired subscriptions:", error);
  }
});
