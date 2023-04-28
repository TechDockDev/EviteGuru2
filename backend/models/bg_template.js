import mongoose from "mongoose";
const CardSchema = mongoose.Schema(
  {
    backgroundimage: { type: Buffer, required: true },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    eventDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EventDetails",
      required: true,
    },
    template: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Template",
      required: true,
    },
    users: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },

  { timestamps: true }
);

const Card = mongoose.model("bg_template", CardSchema);

export default Card;
