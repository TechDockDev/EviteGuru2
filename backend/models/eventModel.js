import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
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
  additionalInfo: {
    type: String,
  },
  template: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "template",
  },
  template: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "variation",
  },
  guest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "guestDetails",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Event = mongoose.model("events", eventSchema);

export default Event;
