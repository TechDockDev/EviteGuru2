import asyncHandler from "express-async-handler";
import Guest from "../models/guestModel.js";
import { parse } from "csv-parse";
import { sendBulkPersonalizedEmails } from "../middlewares/mailMiddleware.js";
import { sendSms } from "../middlewares/smsMiddleware.js";
import Event from "../models/eventModel.js";
import excelToJson from "convert-excel-to-json";
import expressAsyncHandler from "express-async-handler";

const createAddressBook = asyncHandler(async (req, res) => {
  const existingGuestList = await Guest.findOne({
    user: req.user.id,
    listType: "addressBook",
  });
  if (existingGuestList) {
    return res.status(200).json({
      status: "success",
      message: "List has already been created",
      guestList: existingGuestList,
    });
  }
  const guestList = await Guest.create({
    user: req.user.id,
    listType: "addressBook",
  });
  res.json({
    status: "success",
    message: "Guest List has been created",
    guestList,
  });
});

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
    listType: "event",
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
  const g = await Guest.findByIdAndUpdate(
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

const getAddressBook = asyncHandler(async (req, res) => {
  let guestList = await Guest.findOne({
    user: req.user.id,
    listType: "addressBook",
  });
  if (!guestList) {
    return res.status(404).json({
      status: "error",
      message: "No AddressBook Found",
    });
  }
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
  const { adult, child, mealPrefrences, eventId, singleGuestId } = req.body;
  const guest = await Guest.findOne({ event: eventId });
  const singleGuest = guest.guests.id(singleGuestId);
  singleGuest.set({ adult, child, mealPrefrences, status: "Attending" });
  await guest.save();

  res.json({
    status: "success",
    message: "Guest Response has been taken successfully",
  });
});

const sendRSVPNote = asyncHandler(async (req, res) => {
  const { eventId, singleGuestId, rsvpNote } = req.body;
  const guest = await Guest.findOne({ event: eventId });
  console.log("Guest data", guest);
  const singleGuest = guest.guests.id(singleGuestId);
  console.log("singleGuest======================>", singleGuest);
  guest.set({ rsvpNote });
  await guest.save();

  console.log("RSVPNOTE data", guest);
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

  console.log("gusestInfo", guestsInfo);
  const phoneNumbers = guestList.guests.map(({ id, phone }) => {
    if (guestIds.includes(id)) {
      return phone;
    }
  });

  console.log("phoneNumbers", phoneNumbers);
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

  console.log("guests", guests);
  guestList.guests = guests;

  await guestList.save();
  console.log("guests", guests);
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

const editGuestInEvent = expressAsyncHandler(async (req, res) => {
  const { name, email, phone, membersAllowed, singleGuestId, eventId } =
    req.body;
  const guest = await Guest.findOne({ event: eventId });
  const singleGuest = guest.guests.id(singleGuestId);
  singleGuest.set({ name, email, phone, membersAllowed });
  await guest.save();
  res.json({
    status: "success",
    message: "Guest has been updated successfully",
  });
});

const editGuestInAddressBook = expressAsyncHandler(async (req, res) => {
  const { name, email, phone, membersAllowed, singleGuestId } = req.body;
  const guest = await Guest.findOne({
    user: req.user.id,
    listType: "addressBook",
  });
  const singleGuest = guest.guests.id(singleGuestId);
  singleGuest.set({ name, email, phone, membersAllowed });
  await guest.save();
  res.json({
    status: "success",
    message: "Guest has been updated successfully",
  });
});

const deleteGuestsFromAddressBook = expressAsyncHandler(async (req, res) => {
  const { guestIds } = req.body;
  console.log(guestIds);
  await Guest.updateOne(
    { user: req.user.id, listType: "addressBook" },
    { $pull: { guests: { _id: { $in: guestIds } } } }
  );
  res.json({
    status: "success",
    message: "Guest has been deleted successfully",
  });
});

const deleteGuestsFromEvent = expressAsyncHandler(async (req, res) => {
  const { guestIds, eventId } = req.body;
  await Guest.updateOne(
    { event: eventId },
    { $pull: { guests: { _id: { $in: guestIds } } } }
  );
  res.json({
    status: "success",
    message: "Guest has been deleted successfully",
  });
});

export {
  createGuest,
  createAddressBook,
  addGuest,
  addGuestInBulk,
  openStatus,
  getGuestList,
  getSingleGuest,
  guestResponse,
  sendRSVPNote,
  guestResponseDeny,
  getGuestListByUser,
  getGuestListByEvent,
  sendInvitation,
  leftInvitees,
  addGuestsFromAddressBook,
  getGuestListByUserFiltered,
  getAddressBook,
  editGuestInEvent,
  editGuestInAddressBook,
  deleteGuestsFromAddressBook,
  deleteGuestsFromEvent,
};
