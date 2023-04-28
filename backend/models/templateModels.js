import mongoose from "mongoose";
const templateSchema = mongoose.Schema(
  {
    name: { type: String },
    description: { type: String },
    sampleimage: { type: Object },
    sampleimage1: { type: Object },
    sampleimage2: { type: Object },
    sampleimage3: { type: Object },
    backgroundimage: { type: Object },

    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },

  { timestamps: true }
);

const Template = mongoose.model("template", templateSchema);

export default Template;
