import mongoose from "mongoose";
const enterpriseSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
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
    enums: ["pending", "sent"],
  },
});

const Enterprise = mongoose.model("enterprise", enterpriseSchema);

export default Enterprise;
