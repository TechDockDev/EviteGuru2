import express from "express";

import { protect } from "../middlewares/authMiddleware.js";
import {
  createEvent,
  deleteEvent,
  editEvent,
  getEventById,
} from "../controllers/eventController.js";

const eventRouter = express.Router();

// Event route for user
eventRouter.post("/event", protect, createEvent); //add event details by users
eventRouter
  .route("/event-details/:id")
  .delete(deleteEvent) // delete event by users
  .put(editEvent) // update event by user
  .get(getEventById); // get event

export default eventRouter;
