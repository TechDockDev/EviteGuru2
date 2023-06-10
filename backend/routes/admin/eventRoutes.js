import express from "express";

import {
  getEventById,
  getEventsByUserAdmin,
  getStatusStats,
  getTotalEventsByUser,
} from "../../controllers/eventController.js";
import { adminAuth } from "../../middlewares/adminAuthMiddleware.js";

const eventRouter = express.Router();

// Event route for user
eventRouter.get("/stats/:eventId", adminAuth, getStatusStats);
eventRouter.get("/user/:userId", adminAuth, getEventsByUserAdmin);
eventRouter.get("/user/total/:userId", adminAuth, getTotalEventsByUser);
eventRouter.route("/:id").get(adminAuth, getEventById);

export default eventRouter;
