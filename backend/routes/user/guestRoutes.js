import express from "express";
import {
  addGuest,
  addGuestInBulk,
  createGuest,
  guestResponse,
} from "../../controllers/guestController.js";
const guestRouter = express.Router();

guestRouter.post("/create", createGuest);
guestRouter.patch("/add-guest/:guestId", addGuest);
guestRouter.patch("/add-guest-in-bulk/:guestId", addGuestInBulk);
guestRouter.patch("/add-guest-in-bulk/:guestId", guestResponse);

export default guestRouter;
