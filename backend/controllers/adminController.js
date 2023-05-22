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
  const admin = await Admin.findById(req.admin._id);

  if (admin) {
    res.json(admin);
  } else {
    res.status(404); // Not Found
    throw new Error("Admin not Found");
  }
});

const getallAdmin = asyncHandler(async (req, res) => {
  const admin = await Admin.find({});
  let admins = admin;
  res.json(admins);
});

/**
 * @desc delete admin by Email
 * @route DELETE /:id
 * @access private/admin
 */

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

/**
 * @desc update admin email
 * @route PUT /admin/:id
 * @access private/admin
 */

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

//Admin controls in users

/**
 * @dec get all user  in admin panel
 * @route GET /users
 * @access private /admin
 */

const getallUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).populate("subscription", "name");
  res.json({
    status: "success",
    message: "Users have been fetched successfully",
    users,
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const admin = await Admin.findById(req.body.id);
  if (user) {
    await user.remove();
    res.json({ message: "user is deleted" });
  } else if (googleuser) {
    await googleuser.remove();
    res.json({ message: "user is deleted" });
  } else if (admin) {
    await admin.remove();
    res.json({ message: "Admin is deleted" });
  } else {
    res.status(404); //not found
    throw new Error(" user or admins is not found");
  }
});

/**
 * @desc update user by id
 * @route PUT /users-admins/:id
 * @access private/admin
 */

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    // user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updateUser.email,
      phone: updatedUser.phone,
    });
  } else {
    res.status(404);
    throw new Error("user or admin not found");
  }
});

/**
 * @dec get single Template in admin panel
 * @route GET /id
 * @access public admin & users
 */

const singleAdminId = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.params.id).select("-password");
  try {
    if (!admin) {
      res.json("admin not found ");
    } else {
      res.json(admin);
    }
  } catch (err) {
    res.json(err);
  }
});

/**
 * @dec get single Template in admin panel
 * @route GET /id
 * @access public admin & users
 */

const singleTemplateId = asyncHandler(async (req, res) => {
  const template = await Template.findById(req.params.id);
  try {
    if (!template) {
      res.json("Template not found ");
    } else {
      res.json(template);
    }
  } catch (err) {
    res.json(err);
  }
});

/**
 * @desc delete template by id
 * @route DELETE /:id
 * @access private/admin
 */

const admindeleteTemplate = asyncHandler(async (req, res) => {
  const template = await Template.findById(req.params.id);
  try {
    if (!template) {
      res.json("Template not found ");
    } else {
      await template.remove();
      res.json({ message: "Template is deleted" });
    }
  } catch (err) {
    res.json(err);
  }
});

export {
  authAdmin,
  deleteAdmin,
  updateAdmin,
  getallAdmin,
  getAdmin,
  singleAdminId,
  registerAdmin,
  deleteUser,
  updateUser,
  getallUsers,
  singleTemplateId,
  admindeleteTemplate,
};
