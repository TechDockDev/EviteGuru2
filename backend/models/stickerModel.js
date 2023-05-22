import mongoose from "mongoose";

const stickerSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
});

const Sticker = mongoose.model("sticker", stickerSchema);

export default Sticker;
