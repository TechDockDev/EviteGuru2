import asyncHandler from "express-async-handler";
import Guest from "../models/guestModel.js";

const createGuest = asyncHandler(async (req, res) => {
  const existingGuestList = await Guest.findOne({ event: req.body.eventId });
  if (existingGuestList) {
    return res.status(200).json({
      status: "success",
      message: "List has already been created",
      guestList: existingGuestList,
    });
  }
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
  const { name, email, phone, membersAllowed, guestId } = req.body;
  const guest = await Guest.findById(guestId);
  guest.guests.push({ name, email, phone, membersAllowed });
  await guest.save();
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

const openStatus = asyncHandler(async (req, res) => {
  const { guestId, singleGuestId } = req.body;
  const guest = await Guest.findById(guestId);
  const singleGuest = guest.guests.id(singleGuestId);
  singleGuest.set({ status: true });
  await guest.save();
  res.json({
    status: "success",
    message: "Guest has opened the invitation",
  });
});

const getGuestList = asyncHandler(async (req, res) => {
  const guestList = await Guest.findById(req.params.guestId);
  res.json({
    status: "success",
    message: "Guests has been fetched successfully",
    guestList,
  });
});

const getGuestListByEvent = asyncHandler(async (req, res) => {
  const guestList = await Guest.findOne({ event: req.params.eventId });
  res.json({
    status: "success",
    message: "Guests has been fetched successfully",
    guestList,
  });
});

const getGuestListByUser = asyncHandler(async (req, res) => {
  let guestList = await Guest.find({ user: req.user.id });
  guestList = guestList.map(({ guests }) => guests);
  res.json({
    status: "success",
    message: "Guests has been fetched successfully",
    guestList,
  });
});

const getSingleGuest = asyncHandler(async (req, res) => {
  const guest = await Guest.findById(req.params.guestId);
  const singleGuest = guest.guests.id(req.params.singleGuestId);
  res.json({
    status: "success",
    message: "Guest has been fetched successfully",
    singleGuest,
  });
});

const guestResponse = asyncHandler(async (req, res) => {
  const { adult, child, attending, guestId, singleGuestId } = req.body;
  const guest = await Guest.findById(guestId);
  const singleGuest = guest.guests.id(singleGuestId);
  singleGuest.set({ adult, child, attending });
  await guest.save();
  res.json({
    status: "success",
    message: "Guest Response has been taken successfully",
  });
});

export {
  createGuest,
  addGuest,
  addGuestInBulk,
  openStatus,
  getGuestList,
  getSingleGuest,
  guestResponse,
  getGuestListByUser,
  getGuestListByEvent,
};
