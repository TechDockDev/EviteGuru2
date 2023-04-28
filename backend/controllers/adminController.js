import asyncHandler from "express-async-handler";
import userGooglefbs from "../models/userGoogleFbSchema.js";
import Admin from "../models/adminModels.js";
import Otp from "../models/otpModel.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import emailConfig from "../utils/nodeMailer.js";
import Subscription from "../models/subscriptions.js";
import Template from "../models/templateModels.js";
/**
 * @dec     Auth Admin
 * @route   POST /adminlogin
 * @access  private
 */

const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (admin && (await admin.matchPassword(password))) {
    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      superAdmin: admin.superAdmin,
      adminLastLogin: admin.adminLastLogin,
      token: generateToken(admin._id),
    });

    let update = await Admin.findOneAndUpdate(email, {
      adminLastLogin: new Date().toString("YYYY-MM-dd"),
    });
  } else {
    res.status(401); // unauthorized
    throw new Error("Invalid email or password");
  }
});

/**
 * @desc    Register new admin
 * @route   POST  /adminregister
 * @access  public
 */

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

/**
 * @des    Get admin in token
 * @routes  GET /admin_list
 * @access  private
 */

const getAdmin = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin._id);

  if (admin) {
    res.json(admin);
  } else {
    res.status(404); // Not Found
    throw new Error("Admin not Found");
  }
});

/**
 * @dec     email send
 * @routes  /email-send
 * @access  private /admin
 */

const emailSendAdmin = asyncHandler(async (req, res) => {
  const admin = await Admin.findOne({ email: req.body.email });

  if (admin) {
    const otp = Math.floor(Math.random() * 10000 + 1);
    const otpData = Otp({
      email: admin.email,
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
      const admin = await Admin.findOne({ email: req.body.email });
      admin.password = req.body.password;
      admin.save();
      res.status(200).json("Password Changed SuccessFully");
    }
  } else {
    res.status(404);
    throw new Error("Invalid Otp");
  }
});

/**
 * @dec get all admindetais in adminpanel
 * @route GET /admins
 * @access private /admin
 */

const getallAdmin = asyncHandler(async (req, res) => {
  const admin = await Admin.find({}).select("-password"); //select all other then password
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
  const users = await User.find({}).select("-password"); //select all other then password
  const usergooglefb = await userGooglefbs.find({});
  const allusers = usergooglefb.concat(users);
  res.json(allusers);
});

/**
 * @dec get all google and facebook users
 * @route  GET /users
 * @access private
 */
const googlefacebookGetData = asyncHandler(async (req, res) => {
  const user = await userGooglefbs.find({});

  res.json(user);
});

/**
 * @desc delete user  and admins by id
 * @route DELETE /users/:id
 * @access private/admin
 */

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const admin = await Admin.findById(req.body.id);
  const googleuser = await userGooglefbs.findById(req.params.id);

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
  const googleuser = await userGooglefbs.findById(req.params.id);

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

/**
 * @desc Create Subscription by admin
 * @route POST /create-plan
 * @access private/admin
 */
const createPlans = asyncHandler(async (req, res) => {
  let {
    name,
    description,
    price,

    withdrawalMonths,
    templateLimits,
    guestLimits,
  } = req.body;
  // const nameExist = await Subscription.find({ name });
  // console.log(nameExist);
  try {
    if (!req.body) {
      res.json("please enter properly exist plan");
    } else if (req.body) {
      let data = await Subscription.create({
        name,
        description,
        price,
        withdrawalMonths,
        templateLimits,
        guestLimits,
      });
      res.json(data);
    }
  } catch (err) {
    res.json(err);
  }
});

/**
 * @desc update Subscription by admin
 * @route PUT /plans/:id
 * @access private/admin
 */
const updatePlans = asyncHandler(async (req, res) => {
  const plans = await Subscription.findById(req.params.id);

  try {
    if (plans) {
      plans.name = req.body.name || plans.name;
      plans.description = req.body.description || plans.description;
      plans.price = req.body.price || plans.price;
      plans.depositLimit = req.body.depositLimit || plans.depositLimit;
      plans.withdrawalMonths =
        req.body.withdrawalMonths || plans.withdrawalMonths;
      plans.templateLimits = req.body.templateLimits || plans.templateLimits;
      plans.guestLimits = req.body.guestLimits || plans.guestLimits;
      const updatedPlans = await plans.save();
      res.json(updatedPlans);
    } else {
      res.json("no such plan found");
    }
  } catch (err) {
    res.json(err);
  }
});

/**
 * @desc delete Subscription by admin
 * @route  /plan
 * @access private/admin
 */

const deletePlans = asyncHandler(async (req, res) => {
  const plans = await Subscription.findById(req.params.id);
  try {
    if (plans) {
      await plans.remove();
      res.json("this plan in deleted");
    } else {
      res.json("This plan not exist please check id again");
    }
  } catch (err) {
    res.json(err);
  }
});

/**
 * @desc view single Subscription by admin
 * @route  /plan
 * @access public/admin
 */

const viewPlans = asyncHandler(async (req, res) => {
  const plans = await Subscription.findById(req.params.id);

  try {
    if (plans) {
      res.json(plans);
    } else {
      res.json("This plan not exist please check id again");
    }
  } catch (err) {
    res.json(err);
  }
});

/**
 * @desc delete Subscription by admin
 * @route  /plan
 * @access private/admin
 */

const viewallPlans = asyncHandler(async (req, res) => {
  const plans = await Subscription.find({});
  console.log(plans);
  try {
    if (plans) {
      res.json(plans);
    } else {
      res.json("This plan not exist please check id again");
    }
  } catch (err) {
    res.json(err);
  }
});

export {
  authAdmin,
  googlefacebookGetData,
  deleteAdmin,
  updateAdmin,
  getallAdmin,
  getAdmin,
  singleAdminId,
  registerAdmin,
  emailSendAdmin,
  deleteUser,
  updateUser,
  changePassword,
  getallUsers,
  createPlans,
  updatePlans,
  deletePlans,
  viewPlans,
  viewallPlans,
  singleTemplateId,
  admindeleteTemplate,
};
