import mongoose from "mongoose";

const eventSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    hostName: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    addionalInfo: {
      type: String,
      default: null,
    },
    guest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "guestDetails",
    },
  },
  { timestamps: true }
);

const EventDetails = mongoose.model("events", eventSchema);

export default EventDetails;
