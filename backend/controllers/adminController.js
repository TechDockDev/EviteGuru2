import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/adminModel.js";
import User from "../models/userModel.js";
import Subscription from "../models/subscriptionModel.js";
import Template from "../models/templateModel.js";

const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await Admin.findOne({ email }).select("+password");
  if (user) {
    const checkPassword = await bcrypt.compare(password, user.password);
    if (checkPassword) {
      createSendToken(user, 200, res);
    } else {
      throw new Error("Credentials are incorrect");
    }
  } else {
    throw new Error("User not found");
  }
});

// Generating token with user ID
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// controller for sending creating token for future authorization
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);
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
    data: {
      user,
      token,
    },
  });
};

const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, phone, password, superAdmin, permission } = req.body;

  const adminExists = await Admin.findOne({ email });

  if (adminExists) {
    res.status(400); // Bad request
    throw new Error("Admin already exists");
  }

  try {
    const admin = await Admin.create({
      name,
      email,
      password,
      phone,
      superAdmin,
      permission,
    });

    if (admin) {
      // Successfully created
      res.json(admin);
    }

    if (!admin) {
      console.log("Admin not found");
      // stop further execution in this callback
      return;
    }
    await Admin.insertMany(admin);
  } catch (error) {
    console.log("error");
  }
});

const getAdmin = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin.id);
  res.json({ status: "success", message: "Admin fetched Successfully", admin });
});

const deleteAdmin = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.params.id);

  // const admin = await Admin.findOne({ email: req.body.email });

  if (admin) {
    await admin.remove();
    res.json({ message: "admin is deleted" });
  } else {
    res.status(404); //not found
    throw new Error(" admin is not found");
  }
});

const updateAdmin = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.params.id);
  // const admin = await Admin.findOne({ email: req.body.email });

  if (admin) {
    admin.name = req.body.name || admin.name;
    admin.email = req.body.email || admin.email;
    admin.phone = req.body.phone || admin.phone;
    admin.superAdmin = req.body.superAdmin || admin.superAdmin;
    admin.permission = req.body.permission || admin.permission;
    const updatedAdmin = await admin.save();

    res.json(updatedAdmin);
  } else {
    res.status(404);
    throw new Error("Admin not found");
  }
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
  deleteAdmin,
  updateAdmin,
  getAdmin,
  registerAdmin,
  getallUsers,
  changePassword,
  logOut,
};
