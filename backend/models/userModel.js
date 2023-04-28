import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    email_verify: { type: Boolean, default: false, required: false },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    template_num: { type: Number, default: 3 },
    guest_num: { type: Number, default: 10 },
    suspended: { type: Boolean, default: false },
    subscriptionName: { type: String, default: "null" },
    subscriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
    },

    eventDetailsId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "eventDetails",
    },

    guestsDetailsId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "guestDetails",
    },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enterdPassword) {
  return await bcrypt.compare(enterdPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
