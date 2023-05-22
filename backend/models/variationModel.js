import mongoose from "mongoose";
const templateSchema = mongoose.Schema({
  name: { type: String },
  variationJson: { type: String, select: false },
  previewImage: { type: String },
  template: { type: mongoose.Types.ObjectId, ref: "template" },
  user: { type: mongoose.Types.ObjectId, ref: "user" },
});

const Variation = mongoose.model("variation", templateSchema);

export default Variation;
