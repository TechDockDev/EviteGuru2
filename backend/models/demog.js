import mongoose from "mongoose";
const dguestSchema = mongoose.Schema(
  {
    guests: [
      {
        first_name: { type: String },
        last_name: { type: String },
        phone: { type: Number, default: null },
        email: { type: String },
      },
    ],
    final_card: { type: Object },
    guest_list: { type: Object },
    adult: {
      type: Number,
      default: 0,
    },
    children: {
      type: Number,
      default: 0,
    },
    total_guest: {
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

const Guests = mongoose.model("dguestDetails", dguestSchema);

export default Guests;
