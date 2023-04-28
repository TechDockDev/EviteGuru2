import asyncHandler from "express-async-handler";

//import file
import Otp from "../models/otpModel.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import emailConfig from "../utils/nodeMailer.js";
import userGooglefbs from "../models/userGoogleFbSchema.js";
import Subscription from "../models/subscriptions.js";

/**
 * @des     goo-face auth by user
 * @router   POST /auth
 * @access  public
 */

const googlefacebookAuth = asyncHandler(async (req, res) => {
  const { email, uid, emailverify, name } = req.body;

  const userExist = await userGooglefbs.findOne({ email });
  try {
    if (userExist) {
      // user is already exist
      res.json({
        _id: userExist._id,
        email: userExist.email,
        uid: userExist.uid,
        emailverify: userExist.emailverify,
        name: userExist.name,
        token: generateToken(userExist._id),
      });
    } else {
      // Successfully created
      const user = await userGooglefbs.create({
        email,
        uid,
        emailverify,
        name,
      });

      res.status(201).json({
        _id: user._id,
        email: user.email,
        uid: user.uid,
        emailverify: user.emailverify,
        name: user.name,
        token: generateToken(user._id),
      });
    }
  } catch (err) {
    res.json(err);
  }
});

/**
 * @dec   User Login
 * @route   POST /login
 * @access  public
 */

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

/**
 * @desc    Register new user
 * @route   POST  /user
 * @access  public
 */

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phone, password, email_verify, subscriptionId } =
    req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400); // Bad request
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    phone,
    password,
    email_verify,
    subscriptionId: subscriptionId || null,
  });

  if (user) {
    // Successfully created
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: user.password,
      email_verify: user.email_verify,
      subscriptionId: user.subscriptionId,
    });
    // emailVerify(email, name, _id);
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }

  await User.insertMany(user);
});

/**
 * @des    Get user in token
 * @routes  GET /profile/:id
 * @access  private
 */

const getUser = asyncHandler(async (req, res) => {
  let user = await User.findById(req.params.id);

  if (user) {
    res.status(201).json({
      _id: user._id,
      email: user.email,
      email_verify: user.email_verify,
    });
  } else {
    res.status(404); // Not Found
    throw new Error("User not Found");
  }
});

/**
 * @des    Get user in token
 * @routes  GET /profile/:id
 * @access  private
 */

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

/**
 * @dec     email send
 * @routes  /email-send
 * @access  private /user
 */

const emailSend = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    const otp = Math.floor(Math.random() * 10000 + 1);
    const otpData = Otp({
      email: user.email,
      code: otp,
      expiresIn: new Date().getTime() + 180000,
    });
    await otpData.save();
    emailConfig(req.body.email, otp);
    res.status(201).json("Email Send Successful");
  } else {
    res.status(404);
    throw new Error("Email Id Not Exist");
  }
});

/**
 * @des     Change Password & otpVerify
 * @routes  post /change-password
 * @access  private
 */

const changePassword = asyncHandler(async (req, res) => {
  const data = await Otp.findOne({
    email: req.body.email,
    code: req.body.code,
  });
  if (data) {
    const currentTime = new Date().getTime();
    let diff = data.expiresIn - currentTime;
    if (diff < 0) {
      res.status(404);
      throw new Error("OTP Expire");
    } else {
      data.code = req.body.code;
      const user = await User.findOne({ email: req.body.email });
      user.password = req.body.password;
      user.save();
      res.status(200).json("Password Changed SuccessFully");
    }
  } else {
    res.status(404);
    throw new Error("Invalid Otp");
  }
});

/**
 * @desc Update user profile by id
 * @route PUT /:id
 * @access private /user
 */

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

// Subscription
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
  changePassword,
  registerUser,
  getUser,
  emailSend,
  googlefacebookAuth,
  allUser,
  userPlans,
};
