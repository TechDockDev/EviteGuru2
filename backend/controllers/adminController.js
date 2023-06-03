import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/adminModel.js";
import User from "../models/userModel.js";

const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await Admin.findOne({ email }).select("+password");
  if (user) {
    const checkPassword = await bcrypt.compare(password, user.password);
    if (checkPassword) {
      const admin = user.toObject();
      delete admin.password;
      createSendToken(admin, 200, res);
    } else {
      throw new Error("Credentials are incorrect");
    }
  } else {
    throw new Error("User not found");
  }
});

// authenticated
const authenticated = asyncHandler(async (req, res) => {
  res.json({
    status: "success",
    message: "user is authenticated",
    admin: req.admin,
  });
});

// Generating token with user ID
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// controller for sending creating token for future authorization
const createSendToken = (user, statusCode, res) => {
  console.log(user);
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIES_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("bearerToken", token, cookieOptions);
  res.status(statusCode).json({
    status: "success",
    message: "Login Successfully",
    user,
    token,
  });
};

const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, phone, password, superAdmin, permission } = req.body;
  const hash = await bcrypt.hash(password, 10);
  await Admin.create({
    name,
    email,
    password: hash,
    phone,
    superAdmin,
    permission,
  });
  res.json({
    status: "success",
    message: "Admin has been created successfully",
  });
});

const getAdmin = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.params.id);
  res.json({ status: "success", message: "Admin fetched Successfully", admin });
});

const deleteAdmin = asyncHandler(async (req, res) => {
  await Admin.findByIdAndDelete(req.params.id);
  res.json({
    status: "success",
    message: "Admin has been deleted successfully",
  });
});

const updateAdmin = asyncHandler(async (req, res) => {
  await Admin.findByIdAndUpdate(req.params.id, req.body);
  res.json({
    status: "success",
    message: "Admin has been updated successfully",
  });
});

const getAllAdmins = asyncHandler(async (req, res) => {
  const admins = await Admin.find({});
  res.json({
    status: "success",
    message: "Admins have been fetched successfully",
    admins,
  });
});

const getallUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).populate("subscription", "name");
  res.json({
    status: "success",
    message: "Users have been fetched successfully",
    users,
  });
});

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const admin = await Admin.findById(req.admin.id).select("+password");
  if (await bcrypt.compare(oldPassword, admin.password)) {
    admin.password = await bcrypt.hash(newPassword, 10);
    await admin.save();
    res.json({
      status: "success",
      message: "Password has been successfully updated",
    });
  } else {
    res.json({
      status: "error",
      message: "Incorrect Password Provided",
    });
  }
});
// logout
const logOut = asyncHandler(async (req, res) => {
  res
    .status(200)
    .clearCookie("bearerToken")
    .json({ status: "success", message: "Logout successfully" });
});

export {
  authAdmin,
  authenticated,
  deleteAdmin,
  updateAdmin,
  getAdmin,
  registerAdmin,
  getAllAdmins,
  getallUsers,
  changePassword,
  logOut,
};
