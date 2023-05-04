import mongoose from "mongoose";
const templateSchema = mongoose.Schema({
  name: { type: String },
  description: { type: String },
  templateJson: { type: String },
});

const Template = mongoose.model("template", templateSchema);

export default Template;
