import mongoose from "mongoose";

const faqSchema = mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

const FAQ = mongoose.model("faq", faqSchema);

export default FAQ;
