import asyncHandler from "express-async-handler";
import EventDetails from "../models/eventModels.js";
import User from "../models/userModel.js";
import userGooglefbs from "../models/userGoogleFbSchema.js";

const createEvent = asyncHandler(async (req, res) => {
  let { name, hostName, date, venue, address, additionalInfo } = req.body;

  const eventDetails = await EventDetails.create({
    name,
    hostName,
    date,
    venue,
    address,
    additionalInfo,
  });
  res.json({ eventDetails });
});

const getallevent = asyncHandler(async (req, res) => {
  const event = await EventDetails.find({});
  res.json(event);
});

const getEventById = asyncHandler(async (req, res) => {
  const event = await EventDetails.findById(req.params.id);
  res.json({
    status: "success",
    message: "Event has been fetched",
    event,
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

export { editEvent, deleteEvent, getEventById, createEvent, getallevent };
