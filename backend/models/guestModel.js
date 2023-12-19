import mongoose from "mongoose";

const singleGuestSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: Number, required: true, unique: true, sparse: true },
    email: { type: String, required: true, unique: true, sparse: true },
    adult: {
      type: Number,
    },
    child: {
      type: Number,
    },
    membersAllowed: {
      type: Number,
    },
    mealPrefrences: {
      type: String,
      default: null,
    },
    rsvpNote: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["Not Invited", "Pending", "Open", "Not Attending", "Attending"],
      default: "Not Invited",
    },
  },
  { autoIndex: false }
);

const guestSchema = mongoose.Schema({
  guests: [singleGuestSchema],
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "event",
    unique: true,
    sparse: true,
    required: function () {
      return this.listType === "event";
    },
  },
  listType: { type: String, enum: ["event", "addressBook"] },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Guest = mongoose.model("guest", guestSchema);

export default Guest;
