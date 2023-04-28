import mongoose from "mongoose";

const singleGuestSchema = mongoose.Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    phone: { type: String, default: null },
    email: { type: String },
    person: {
      type: Number,
      default: 0,
    },
    child: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
    attend: {
      type: Boolean,
      default: false,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "eventDetails",
    },
  },
  { timestamps: true }
);

const guestSchema = mongoose.Schema(
  {
    guests: [singleGuestSchema],
    final_card: { type: Object },
    guest_list: { type: Object },

    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "eventDetails",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const GuestDetails = mongoose.model("guestDetails", guestSchema);

export default GuestDetails;
