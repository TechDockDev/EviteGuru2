import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import EventDetails from "../models/eventModels.js";
import User from "../models/userModel.js";
import userGooglefbs from "../models/userGoogleFbSchema.js";
// event controller used in userRoutes
/**
 * @desc		Create new Event Template by users
 * @route		POST /event
 * @access	private / users
 */
const createEvent = asyncHandler(async (req, res) => {
  let users = await User.findById(req.params.id);
  let user = await userGooglefbs.findById(req.params.id);

  let {
    event_name,
    host_name,
    date,
    time,
    venue_name,
    venue_address,
    virtual_link,
    add_info,
  } = req.body;

  if (users || user) {
    // Successfully created
    let eventDetails = await EventDetails.create({
      event_name,
      host_name,
      date,
      time,
      venue_name,
      venue_address,
      virtual_link,
      add_info,
      userId: users.id,
    });
    res.status(201).json({
      _id: eventDetails._id,
      event_name: eventDetails.event_name,
      host_name: eventDetails.host_name,
      date: eventDetails.date,
      time: eventDetails.time,
      venue_name: eventDetails.venue_name,
      venue_address: eventDetails.venue_address,
      virtual_link: eventDetails.virtual_link,
      add_info: eventDetails.add_info,
    });
    let update = await eventDetails.save();
  } else {
    res.status(400);
    throw new Error("Invalid Event data");
  }
});

/**
 * @desc		Fetch single event by id
 * @route		GET /:id
 * @access	private
 */
const getEventById = asyncHandler(async (req, res) => {
  const event = await EventDetails.findById(req.params.id);
  try {
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: "event not found" }); //event not found
    }
  } catch (error) {
    console.error(error);
    res.status(500); // Something went wrong
    throw new Error("Please try again");
  }
});

/**
 * @desc delete event by id
 * @route DELETE /event/:id
 * @access private /admin
 */

const deleteEvent = asyncHandler(async (req, res) => {
  const event = await EventDetails.findById(req.params.id);
  // const admin = await Admin.findOne({ email: req.body.email });

  if (event) {
    await event.remove();
    res.json({ message: "Event is deleted" });
  } else {
    res.status(404); //not found
    throw new Error(" Template is not found");
  }
});

/**
 * @desc Update Event by user
 * @route PUT /event/:id
 * @access private /user
 */

const editEvent = asyncHandler(async (req, res) => {
  const event = await EventDetails.findById(req.params.id);

  if (event) {
    event.event_name = req.body.event_name || event.event_name;
    event.host_name = req.body.host_name || event.host_name;
    event.date = req.body.date || event.date;
    event.time = req.body.time || event.time;
    event.venue_name = req.body.venue_name || event.venue_name;
    event.venue_address = req.body.venue_address || event.venue_address;
    event.virtual_link = req.body.virtual_link || event.virtual_link;
    event.add_info = req.body.add_info || event.add_info;

    let editEvent = await event.save();

    res.json({
      editEvent,
    });
  } else {
    res.status(404);
    throw new Error("Please check the id event not found");
  }
});

// event controller used in adminRouter.js
/**
 * @dec get all users event in single list
 * @route GET /admins/users/all-events
 * @access private /admin
 */

const getallevent = asyncHandler(async (req, res) => {
  const event = await EventDetails.find({});
  res.json(event);
});

export { editEvent, deleteEvent, getEventById, createEvent, getallevent };
