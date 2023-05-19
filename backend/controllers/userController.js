import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//import file
import User from "../models/userModel.js";
import Subscription from "../models/subscriptionModel.js";

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
  res.json({
    status: "success",
    message: "user is authenticated",
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

// sign up controller
const signUp = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({ ...req.body, password: hash });
    createSendToken(user, 200, res);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

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
    res.status(500).json({
      message: error.message,
    });
  }
};

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
  const user = await User.findById(req.params.id);

  const google_user = await userGooglefbs.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
    });
  } else if (google_user) {
    google_user.name = req.body.name || google_user.name;
    google_user.email = req.body.email || user.email;

    const updatedgoogle = await google_user.save();

    res.json({
      _id: updatedgoogle._id,
      name: updatedgoogle.name,
      email: updatedgoogle.email,
      phone: updatedgoogle.phone,
    });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
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

export {
  authUser,
  updateUser,
  login,
  signUp,
  getUser,
  allUser,
  userPlans,
  authenticated,
};
