import asyncHandler from "express-async-handler";
import EventDetails from "../models/eventModel.js";
import Guest from "../models/guestModel.js";

const createEvent = asyncHandler(async (req, res) => {
  let { name, hostName, date, venue, address, additionalInfo, variationId } =
    req.body;
  const eventDetails = await EventDetails.create({
    name,
    hostName,
    date,
    venue,
    address,
    additionalInfo,
    user: req.user.id,
    variation: variationId,
  });
  res.json({
    status: "success",
    message: "Event has been created successfully",
    eventDetails,
  });
});

const getAllEvents = asyncHandler(async (req, res) => {
  const event = await EventDetails.find({});
  res.json(event);
});

const getEventById = asyncHandler(async (req, res) => {
  const event = await EventDetails.findById(req.params.id).populate(
    "variation",
    ["variationJson", "previewImage"]
  );
  const guestList = await Guest.findOne({ event: event._id });
  res.json({
    status: "success",
    message: "Event has been fetched",
    event,
    guestList: guestList?.guests || [],
  });
});

const getEventsByUser = asyncHandler(async (req, res) => {
  const { page, limit } = req.query;
  const events = await EventDetails.find({ user: req.user.id })
    .populate("variation")
    .limit(page * limit)
    .skip(page * limit - limit);
  const totalEvents = await EventDetails.find({ user: req.user.id }).count();

  res.json({
    status: "success",
    message: "Event has been fetched",
    events,
    totalEvents,
  });
});

const getStatusStats = asyncHandler(async (req, res) => {
  Guest.findOne(
    {
      event: req.params.eventId,
    },
    function (err, data) {
      if (data) {
        res.json({
          status: "success",
          message: "Event Stats have been fetched successfully",
          stats: {
            "Not Invited": data.guests.filter(
              (guest) => guest.status === "Not Invited"
            ).length,
            open: data.guests.filter((guest) => guest.status === "Open").length,
            pending: data.guests.filter((guest) => guest.status === "Pending")
              .length,
            "Not Attending": data.guests.filter(
              (guest) => guest.status === "Not Attending"
            ).length,
            attending: data.guests.filter(
              (guest) => guest.status === "Attending"
            ).length,
            totalInvitees: data.guests.filter(
              (guest) => guest.status !== "Not Invited"
            ).length,
          },
        });
      }
    }
  );
});

const getEventsByUserAdmin = asyncHandler(async (req, res) => {
  const events = await EventDetails.find({ user: req.params.userId });
  res.json({
    status: "success",
    message: "Event has been fetched",
    events,
  });
});

const getTotalEventsByUser = asyncHandler(async (req, res) => {
  const totalEventsByUser = await EventDetails.find({
    user: req.params.userId,
  }).count();
  res.json({
    status: "success",
    message: "Event has been fetched",
    totalEventsByUser,
  });
});

const editEvent = asyncHandler(async (req, res) => {
  const event = await EventDetails.findByIdAndUpdate(req.params.id, req.body);
  res.json({
    status: "success",
    message: "Event has been updated successfully",
  });
});

const deleteEvent = asyncHandler(async (req, res) => {
  await EventDetails.findByIdAndRemove(req.params.id);
  res.json({
    status: "success",
    message: "Event has been successfully deleted",
  });
});

export {
  editEvent,
  deleteEvent,
  getEventById,
  createEvent,
  getAllEvents,
  getEventsByUser,
  getTotalEventsByUser,
  getEventsByUserAdmin,
  getStatusStats,
};
