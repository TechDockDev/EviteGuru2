import mongoose from "mongoose";
const templateSchema = mongoose.Schema({
  name: { type: String },
  description: { type: String },
  templateJson: { type: String, select: false },
  previewImage: { type: String },
  user: { type: mongoose.Types.ObjectId, ref: "user" },
  admin: { type: mongoose.Types.ObjectId, ref: "admin" },
});

const Template = mongoose.model("template", templateSchema);

export default Template;
