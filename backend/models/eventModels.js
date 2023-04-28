import mongoose from "mongoose";

const eventDetailsSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    event_name: {
      type: String,
      require: true,
    },
    host_name: {
      type: String,
      require: true,
    },
    date: {
      type: String,
      require: true,
    },
    time: {
      type: String,
      require: true,
    },
    venue_name: {
      type: String,
      required: true,
    },
    venue_address: {
      type: String,
      required: true,
    },
    virtual_link: {
      type: String,
      default: null,
    },
    add_info: {
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

const EventDetails = mongoose.model("eventDetails", eventDetailsSchema);

export default EventDetails;
