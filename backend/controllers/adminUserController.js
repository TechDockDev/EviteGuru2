import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const giftInvitees = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.body.userId);
  user.guestNum = user.guestNum + parseInt(req.body.giftedInvitees);
  await user.save();
  res.json({
    status: "success",
    message: "Gifted Invitees have been added successfully",
  });
});

const giftTemplates = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.body.userId);
  user.templateNum = user.templateNum + parseInt(req.body.giftedTemplates);
  await user.save();
  res.json({
    status: "success",
    message: "Gifted Templates have been added successfully",
  });
});

const suspendUser = expressAsyncHandler(async (req, res) => {
  let user = await User.findById(req.body.userId);
  user.suspended = !user.suspended;
  await user.save();
  user = await User.findById(req.body.userId);
  res.json({
    status: "success",
    message: "user's suspended status has been updated",
    user,
  });
});

export { giftInvitees, giftTemplates, suspendUser };
