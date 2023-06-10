import express from "express";

import { userAuth } from "../../middlewares/authMiddleware.js";
import {
  createEvent,
  deleteEvent,
  editEvent,
  getEventById,
  getEventsByUser,
  getStatusStats,
} from "../../controllers/eventController.js";

const eventRouter = express.Router();

// Event route for user
eventRouter.post("/create", userAuth, createEvent);
eventRouter.get("/stats/:eventId", userAuth, getStatusStats);
eventRouter.get("/user", userAuth, getEventsByUser);
eventRouter
  .route("/:id")
  .delete(userAuth, deleteEvent) // delete event by users
  .patch(userAuth, editEvent) // update event by user
  .get(userAuth, getEventById); // get event

export default eventRouter;
