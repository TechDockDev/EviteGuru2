import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: true },
  password: { type: String, required: true, select: false },
  templateNum: { type: Number, default: 3 },
  guestNum: { type: Number, default: 10 },
  suspended: { type: Boolean, default: false },
  subscription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subscription",
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "event",
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.matchPassword = async function (enterdPassword) {
  return await bcrypt.compare(enterdPassword, this.password);
};


const User = mongoose.model("User", userSchema);

export default User;
