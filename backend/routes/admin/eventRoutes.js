import express from "express";

import { userAuth } from "../../middlewares/authMiddleware.js";
import {
  getEventById,
  getEventsByUser,
  getTotalEventsByUser,
} from "../../controllers/eventController.js";

const eventRouter = express.Router();

// Event route for user
// eventRouter.get("/user", userAuth, getEventsByUser);
eventRouter.get("/user/total/:userId", getTotalEventsByUser);
eventRouter.route("/:id").get(getEventById);

export default eventRouter;
