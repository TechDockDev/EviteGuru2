import asyncHandler from "express-async-handler";
import Guest from "../models/guestModel.js";
import { parse } from "csv-parse";
import { sendMail } from "../middlewares/mailMiddleware.js";
import { sendSms } from "../middlewares/smsMiddleware.js";

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
  console.log(req?.file?.buffer);
  const records = [];
  // Initialize the parser
  const parser = parse(req.file.buffer, { columns: true });
  // Use the readable stream api to consume records
  parser.on("readable", function () {
    let record;
    while ((record = parser.read()) !== null) {
      records.push(record);
    }
  });
  // Catch any error
  parser.on("error", function (err) {
    console.error(err.message);
  });
  // Test that the parsed records matched the expected records
  parser.on("end", async function () {
    console.log(records);
    await Guest.findByIdAndUpdate(
      req.params.guestId,
      {
        $push: { guests: { $each: records } },
      },
      { runValidators: true }
    );
    res.json({
      status: "success",
      message: "Guests has been added in the list",
    });
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
  guestList = guestList.map(({ guests }) => guests).flat();
  res.json({
    status: "success",
    message: "Guest List has been fetched successfully",
    guestList,
  });
});

const getGuestListByUserFiltered = asyncHandler(async (req, res) => {
  let guestList = await Guest.find({ user: req.user.id });
  const eventGuestList = await Guest.findOne({ event: req.params.eventId });
  const eventGuestListPhoneNumbers = eventGuestList.guests.map(
    ({ phone }) => phone
  );
  guestList = guestList
    .map(({ guests }) => guests)
    .flat()
    .filter((guest) => !eventGuestListPhoneNumbers.includes(guest.phone));
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
  const { adult, child, status, guestId, singleGuestId } = req.body;
  const guest = await Guest.findById(guestId);
  const singleGuest = guest.guests.id(singleGuestId);
  singleGuest.set({ adult, child, status });
  await guest.save();
  res.json({
    status: "success",
    message: "Guest Response has been taken successfully",
  });
});

const sendInvitation = asyncHandler(async (req, res) => {
  const { guestIds, eventId } = req.body;
  const guestList = await Guest.findOne({ event: eventId });
  const emails = guestList.guests.map(({ id, email }) => {
    if (guestIds.includes(id)) {
      return email;
    }
  });
  const phoneNumbers = guestList.guests.map(({ id, phone }) => {
    if (guestIds.includes(id)) {
      return phone;
    }
  });
  await sendMail("subject", "body", emails);
  await sendSms("This is a message", phoneNumbers);
  const guests = guestList.guests.map((guest) => {
    if (guestIds.includes(guest.id)) {
      return { ...guest, status: "pending" };
    }
    return { ...guest };
  });
  guestList.guests = guests;
  await guestList.save();
  res.json({
    status: "success",
    message: "Invitations have been sent successfully",
  });
});

const addGuestsFromAddressBook = asyncHandler(async (req, res) => {
  const { guestIds, eventId } = req.body;
  let guestList = await Guest.find({ user: req.user.id });
  guestList = guestList
    .map(({ guests }) => guests)
    .flat()
    .filter((guest) => guestIds.includes(guest.id))
    .map((guest) => {
      return { ...guest.toObject(), status: "Not Invited" };
    });
  await Guest.findOneAndUpdate(
    { event: eventId },
    { $addToSet: { guests: guestList } }
  );
  res.json({
    status: "success",
    message: "Guest's has been added in the list",
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
  sendInvitation,
  addGuestsFromAddressBook,
  getGuestListByUserFiltered,
};
