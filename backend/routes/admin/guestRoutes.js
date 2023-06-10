import express from "express";
import { getGuestListByEvent } from "../../controllers/guestController.js";
import { adminAuth } from "../../middlewares/adminAuthMiddleware.js";

const guestRouter = express.Router();

guestRouter.get("/event/:eventId", adminAuth, getGuestListByEvent);

export default guestRouter;
