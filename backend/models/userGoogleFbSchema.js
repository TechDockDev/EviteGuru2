import mongoose from "mongoose";

const usergoogleFbSchema = mongoose.Schema({
  email: { type: String, unique: true, required: true },
  uid: { type: String },
  emailverify: { type: Boolean },
  name: { type: String },
  template_num: { type: Number, default: 3 },
  guest_num: { type: Number, default: 10 },
  subscriptionName: { type: String, default: "null" },
  suspended: { type: Boolean, default: false },
  subscriptionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subscription",
  },
  guestsDetailsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "guestDetails",
  },
});

const userGooglefbs = mongoose.model("userGoogleFbs", usergoogleFbSchema);

export default userGooglefbs;
