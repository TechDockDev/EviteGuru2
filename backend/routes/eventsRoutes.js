import express from "express";

import { userAuth } from "../middlewares/authMiddleware.js";
import {
  createEvent,
  deleteEvent,
  editEvent,
  getEventById,
  getEventsByUser,
  getAllEvents,
} from "../controllers/eventController.js";

const eventRouter = express.Router();

// Event route for user
eventRouter.post("/create", userAuth, createEvent); //add event details by users
eventRouter
  .route("/event-details/:id")
  .delete(deleteEvent) // delete event by users
  .patch(editEvent) // update event by user
  .get(getEventById); // get event

eventRouter.get("/all", getAllEvents);
eventRouter.get("/user", userAuth, getEventsByUser);

export default eventRouter;
