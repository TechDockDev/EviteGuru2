import mongoose from "mongoose";

const otpSchema = mongoose.Schema({
    email: { type: String },
    code: { type: String, required: true },
    expiresIn: { type: Number }

},
    { timestamps: true }
);

const Otp = mongoose.model('otp', otpSchema)


export default Otp;