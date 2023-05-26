import express from "express";
import {
  addGuest,
  addGuestInBulk,
  createGuest,
  getGuestList,
  getGuestListByEvent,
  getGuestListByUser,
  getSingleGuest,
  guestResponse,
  openStatus,
} from "../../controllers/guestController.js";
import { userAuth } from "../../middlewares/authMiddleware.js";
const guestRouter = express.Router();

guestRouter.post("/create", userAuth, createGuest);
guestRouter.patch("/add-guest", addGuest);
guestRouter.patch("/add-guest-in-bulk/:guestId", addGuestInBulk);
guestRouter.get("/single/:guestId", getGuestList);
guestRouter.get("/user", userAuth, getGuestListByUser);
guestRouter.get("/single/:guestId/:singleGuestId", getSingleGuest);
guestRouter.get("/event/:eventId", getGuestListByEvent);
guestRouter.patch("/open", openStatus);
guestRouter.patch("/response", guestResponse);

export default guestRouter;
