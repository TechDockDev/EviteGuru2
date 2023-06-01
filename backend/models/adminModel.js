import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true, select: false },
  superAdmin: { type: Boolean, default: false },
  permission: {
    type: Array,
    required: function () {
      return this.superAdmin === false;
    },
  },
  adminLastLogin: {
    type: String,
  },
});

adminSchema.methods.matchPassword = async function (enteredPassword) {
  console.log(this);
  return await bcrypt.compare(enteredPassword, this.password);
};

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = bcrypt.hash(this.password, salt);
});

adminSchema.statics.newLogin = function login(id, callback) {
  return this.findByIdAndUpdate(
    id,
    { $set: { adminLastLogin: new Date() } },
    { new: true },
    callback
  );
};

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
