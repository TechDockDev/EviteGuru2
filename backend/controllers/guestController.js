import asyncHandler from "express-async-handler";
import Guest from "../models/guestModel.js";

const createGuest = asyncHandler(async (req, res) => {
  const guestList = await Guest.create({
    user: req.user.id,
    event: req.body.eventId,
  });
  res.json({
    status: "success",
    message: "Guest List has been created",
    guestList,
  });
});

const addGuest = asyncHandler(async (req, res) => {
  const { name, email, phone, membersAllowed } = req.body;
  await Guest.findByIdAndUpdate(req.params.guestId, {
    guests: {
      name,
      email,
      phone,
      membersAllowed,
    },
  });
  res.json({
    status: "success",
    message: "Guest has been added in the list",
  });
});

const addGuestInBulk = asyncHandler(async (req, res) => {
  const { name, email, phone, membersAllowed } = req.body;
  await Guest.updateMany(req.params.guestId, {
    guests: {
      name,
      email,
      phone,
      membersAllowed,
    },
  });
  res.json({
    status: "success",
    message: "Guests has been added in the list",
  });
});

const guestResponse = asyncHandler(async (req, res) => {
  const { adult, child, attending } = req.body;
  await Guest.updateMany(req.params.guestId, {
    guests: {
      adult,
      child,
      attending,
    },
  });
  res.json({
    status: "success",
    message: "Guest Response has been taken successfully",
  });
});

export  { createGuest, addGuest, addGuestInBulk, guestResponse };
