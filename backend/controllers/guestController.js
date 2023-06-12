import asyncHandler from "express-async-handler";
import Guest from "../models/guestModel.js";
import { parse } from "csv-parse";
import { sendBulkPersonalizedEmails } from "../middlewares/mailMiddleware.js";
import { sendSms } from "../middlewares/smsMiddleware.js";
import Event from "../models/eventModel.js";
import excelToJson from "convert-excel-to-json";

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
  const { guestDetails } = req.body;
  await Guest.findByIdAndUpdate(
    guestId,
    {
      $push: { guests: { $each: guestDetails } },
    },
    { runValidators: true }
  );
  res.json({
    status: "success",
    message: "Guest has been added in the list",
  });
});

const addGuestInBulk = asyncHandler(async (req, res) => {
  const records = [];
  if (
    req.file.mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    req.file.mimetype === "application/vnd.ms-excel"
  ) {
    let result = excelToJson({
      source: req.file.buffer,
      header: {
        rows: 1,
      },
      columnToKey: {
        A: "name",
        B: "email",
        C: "phone",
        D: "membersAllowed",
      },
    });
    result = result.invitees.filter(
      ({ name, email }) =>
        name !== "example name" || email !== "example@xyz.com"
    );
    console.log(result);
    await Guest.findByIdAndUpdate(
      req.params.guestId,
      {
        $push: { guests: { $each: result } },
      },
      { runValidators: true }
    );
    res.json({
      status: "success",
      message: "Guests has been added in the list",
    });
  } else if (req.file.mimetype === "text/csv") {
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
  } else {
    res.status(400).json({
      status: "error",
      message: "Wrong file type provided",
    });
  }
});

const openStatus = asyncHandler(async (req, res) => {
  const { eventId, singleGuestId } = req.body;
  const guest = await Guest.findOne({ event: eventId });
  const singleGuest = guest.guests.id(singleGuestId);
  singleGuest.set({ status: "Open" });
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
  const eventGuestListPhoneNumbers = eventGuestList?.guests.map(
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
  const guest = await Guest.findOne({ event: req.params.eventId });
  const singleGuest = guest.guests.id(req.params.singleGuestId);
  res.json({
    status: "success",
    message: "Guest has been fetched successfully",
    singleGuest,
  });
});

const guestResponse = asyncHandler(async (req, res) => {
  const { adult, child, eventId, singleGuestId } = req.body;
  console.log(singleGuestId);
  const guest = await Guest.findOne({ event: eventId });
  const singleGuest = guest.guests.id(singleGuestId);
  singleGuest.set({ adult, child, status: "Attending" });
  await guest.save();
  res.json({
    status: "success",
    message: "Guest Response has been taken successfully",
  });
});

const guestResponseDeny = asyncHandler(async (req, res) => {
  const { eventId, singleGuestId } = req.body;
  const guest = await Guest.findOne({ event: eventId });
  const singleGuest = guest.guests.id(singleGuestId);
  singleGuest.set({ status: "Not Attending" });
  await guest.save();
  res.json({
    status: "success",
    message: "Guest Response has been taken successfully",
  });
});

const sendInvitation = asyncHandler(async (req, res) => {
  const { guestIds, eventId } = req.body;
  const event = await Event.findById(eventId);
  const guestList = await Guest.findOne({ event: eventId });
  const guestsInfo = guestList.guests.map(({ id, email }) => {
    if (guestIds.includes(id)) {
      return { id, email };
    } else return;
  });
  const phoneNumbers = guestList.guests.map(({ id, phone }) => {
    if (guestIds.includes(id)) {
      return phone;
    }
  });
  const ipAddress = req.socket.remoteAddress;
  const address = ipAddress.replace(/^.*:/, "");
  await sendBulkPersonalizedEmails(event, guestsInfo, address);
  // await sendSms("This is a message", phoneNumbers);
  const guests = guestList.guests.map((guest) => {
    if (guestIds.includes(guest.id)) {
      return { ...guest, status: "Pending" };
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

const leftInvitees = asyncHandler(async (req, res) => {
  const userGuestList = await Guest.find({ user: req.user.id });
  let totalInviteesUser = 0;
  userGuestList.forEach(({ guests }) => (totalInviteesUser += guests.length));
  let remainingInvitees = req.user.guestNum - totalInviteesUser;
  if (remainingInvitees < 0) {
    remainingInvitees = 0;
  }
  res.json({
    status: "success",
    message: "Remaining Invitees has been fetched",
    remainingInvitees,
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
  guestResponseDeny,
  getGuestListByUser,
  getGuestListByEvent,
  sendInvitation,
  leftInvitees,
  addGuestsFromAddressBook,
  getGuestListByUserFiltered,
};
