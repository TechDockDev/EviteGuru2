import mongoose from "mongoose";
const enterpriseSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  company: {
    type: String,
  },
  title: {
    type: String,
  },
  workEmail: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  amount: {
    type: Number,
  },
  templateLimit: {
    type: Number,
  },
  inviteeLimit: {
    type: Number,
  },
  comment: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "sent"],
  },
});

const Enterprise = mongoose.model("enterprise", enterpriseSchema);

export default Enterprise;
