import mongoose from "mongoose";

const singleGuestSchema = mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: Number, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  adult: {
    type: Number,
  },
  child: {
    type: Number,
  },
  membersAllowed: {
    type: Number,
  },
  attending: {
    type: Boolean,
    default: false,
  },
});

const guestSchema = mongoose.Schema({
  guests: [singleGuestSchema],
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "event",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Guest = mongoose.model("guest", guestSchema);

export default Guest;
