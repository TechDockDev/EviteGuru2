import expressAsyncHandler from "express-async-handler";
import Variation from "../models/variationModel.js";
import Guest from "../models/guestModel.js";

const checkAvailabilityOfVariation = expressAsyncHandler(
  async (req, res, next) => {
    const totalVariationsUser = await Variation.find({
      user: req.user.id,
    }).count();
    const leftVariations = req.user.templateNum - totalVariationsUser;
    if (leftVariations > 0) {
      next();
    } else {
      res.status(400).json({
        status: "error",
        message: "Templates Limit has been exceeded",
      });
    }
  }
);

const checkAvailabilityOfInvitee = expressAsyncHandler(
  async (req, res, next) => {
    const userGuestList = await Guest.find({ user: req.user.id });
    let totalInviteesUser = 0;
    userGuestList.forEach(({ guests }) => (totalInviteesUser += guests.length));
    const remainingInvitees = req.user.guestNum - totalInviteesUser;
    if (remainingInvitees > 0) {
      next();
    } else {
      res.status(400).json({
        status: "error",
        message: "Invitees Limit has been exceeded",
      });
    }
  }
);

export { checkAvailabilityOfVariation, checkAvailabilityOfInvitee };
