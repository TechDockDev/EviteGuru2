import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//import file
import User from "../models/userModel.js";
import Subscription from "../models/subscriptionModel.js";
import { Authentication } from "../utils/firebase.js";
import auth from "firebase-admin";

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401); // unauthorized
    throw new Error("Invalid email or password");
  }
});

// authenticated
const authenticated = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).populate("subscription");
  res.json({
    status: "success",
    message: "user is authenticated",
    user,
  });
});

const forgetPasssword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    res.json({
      status: "success",
      message: "User Exists",
      phone: user.phone,
    });
  } else {
    res.status(400).json({
      status: "failure",
      message: "User doesn't exist",
    });
  }
});

const changeForgetPasssword = asyncHandler(async (req, res) => {
  const decodedValue = await auth.auth().verifyIdToken(req.body.idToken);
  const user = await User.findOne({ phone: decodedValue.phone_number });
  user.password = await bcrypt.hash(req.body.password, 10);
  await user.save();
  if (user) {
    res.json({
      status: "success",
      message: "Password has been successfully changed",
    });
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

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user.id).select("+password");
  if (await bcrypt.compare(oldPassword, user.password)) {
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({
      status: "success",
      message: "Password has been successfully updated",
    });
  } else {
    res.status(406).json({
      status: "error",
      message: "Incorrect Password Provided",
    });
  }
});

// sign up controller
const signUp = async (req, res, next) => {
  try {
    const decodedValue = await auth.auth().verifyIdToken(req.body.idToken);
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      ...req.body,
      phone: decodedValue.phone_number,
      password: hash,
      userType: "normal",
    });
    createSendToken(user, 200, res);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
    });
  }
};

const googleSignUp = asyncHandler(async (req, res) => {
  const details = await Authentication.verifyIdToken(req.body.idToken);
  const user = await User.create({
    name: details.name,
    email: details.email,
    userType: "google",
  });
  createSendToken(user, 200, res);
});

// login controller
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
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
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const googleLogin = asyncHandler(async (req, res) => {
  const { email } = await Authentication.verifyIdToken(req.body.idToken);
  const user = await User.findOne({ email });
  if (user) {
    return createSendToken(user, 200, res);
  }
});

const updateProfilePhoto = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user.id, {
    profilePhoto: req.file.buffer.toString("base64"),
  });
  res.json({
    status: "success",
    message: "user profile has been successfully updated",
    user,
  }); 
});

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).populate(
    "subscription",
    "name"
  );
  res.json({
    status: "success",
    message: "user has been fetched",
    user,
  });
});

const allUser = asyncHandler(async (req, res) => {
  let user = await User.find({});
  try {
    if (user) {
      res.status(201).json();
    } else {
      res.status(404); // Not Found
      throw new Error("User not Found");
    }
  } catch (err) {
    res.json(err);
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user.id, req.body, {
    runValidators: true,
    new: true,
  });
  res.json({
    status: "success",
    message: "User Details has been successfully updated",
    user,
  });
});

// Update user's subscription plan
const userPlans = asyncHandler(async (req, res) => {
  let user = await User.findById(req.params.id);
  let google = await userGooglefbs.findById(req.params.id);
  try {
    if (!req.params.id) {
      return res.status(404).send({ error: "User not found" });
    }
    const subscription = await Subscription.findById(req.body.subscriptionId);

    if (!subscription) {
      return res.status(404).send({ error: "Subscription plan not found" });
    } else if (user) {
      user.subscriptionName = subscription.name;
      user.subscriptionId = subscription._id;
      user.template_num = subscription.templateLimits;
      user.guest_num = subscription.guestLimits;

      await user.save();
      res.send(user);
    } else if (google) {
      google.subscriptionName = subscription.name;
      google.subscriptionId = subscription._id;
      google.template_num = subscription.templateLimits;
      google.guest_num = subscription.guestLimits;

      await google.save();
      res.send(google);
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// logout
const logOut = asyncHandler(async (req, res) => {
  res
    .status(200)
    .clearCookie("bearerToken")
    .json({ message: "Logout successfully", status: "Success" });
});

export {
  authUser,
  updateUser,
  googleSignUp,
  googleLogin,
  login,
  signUp,
  updateProfilePhoto,
  getUser,
  allUser,
  userPlans,
  authenticated,
  changePassword,
  changeForgetPasssword,
  forgetPasssword,
  logOut,
};
