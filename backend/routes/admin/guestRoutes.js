import express from "express";
import { getGuestListByEvent } from "../../controllers/guestController.js";

const guestRouter = express.Router();

guestRouter.get("/event/:eventId", getGuestListByEvent);

export default guestRouter;
