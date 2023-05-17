import asyncHandler from "express-async-handler";
import EventDetails from "../models/eventModel.js";

const createEvent = asyncHandler(async (req, res) => {
  let { name, hostName, date, venue, address, additionalInfo } = req.body;

  const eventDetails = await EventDetails.create({
    name,
    hostName,
    date,
    venue,
    address,
    additionalInfo,
    user: req.user.id,
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
  const event = await EventDetails.findById(req.params.id);
  res.json({
    status: "success",
    message: "Event has been fetched",
    event,
  });
});

const getEventsByUser = asyncHandler(async (req, res) => {
  const events = await EventDetails.find({ user: req.user.id });
  res.json({
    status: "success",
    message: "Event has been fetched",
    events,
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
};
