import express from "express";
import {
  addGuest,
  addGuestInBulk,
  addGuestsFromAddressBook,
  createGuest,
  getGuestList,
  getGuestListByEvent,
  getGuestListByUser,
  getGuestListByUserFiltered,
  getSingleGuest,
  guestResponse,
  openStatus,
  sendInvitation,
} from "../../controllers/guestController.js";
import { userAuth } from "../../middlewares/authMiddleware.js";
import multer from "multer";
const guestRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

guestRouter.post("/create", userAuth, createGuest);
guestRouter.patch("/add-guest", addGuest);
guestRouter.patch(
  "/add-guest-in-bulk/:guestId",
  upload.single("file"),
  addGuestInBulk
);
guestRouter.get("/single/:guestId", getGuestList);
guestRouter.get("/user", userAuth, getGuestListByUser);
guestRouter.get("/user/:eventId", userAuth, getGuestListByUserFiltered);
guestRouter.get("/single/:guestId/:singleGuestId", getSingleGuest);
guestRouter.get("/event/:eventId", getGuestListByEvent);
guestRouter.patch("/open", openStatus);
guestRouter.post("/send-invite", sendInvitation);
guestRouter.post(
  "/add-guests-from-addressBook",
  userAuth,
  addGuestsFromAddressBook
);
guestRouter.patch("/response", guestResponse);

export default guestRouter;
