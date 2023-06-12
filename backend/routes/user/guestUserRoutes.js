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
  guestResponseDeny,
  leftInvitees,
  openStatus,
  sendInvitation,
} from "../../controllers/guestController.js";
import { userAuth } from "../../middlewares/authMiddleware.js";
import multer from "multer";
import { checkAvailabilityOfInvitee } from "../../middlewares/availableVariationMiddleware.js";
const guestRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

guestRouter.post("/create", userAuth, createGuest);
guestRouter.patch("/add-guest", userAuth, checkAvailabilityOfInvitee, addGuest);
guestRouter.patch(
  "/add-guest-in-bulk/:guestId",
  userAuth,
  checkAvailabilityOfInvitee,
  upload.single("file"),
  addGuestInBulk
);
guestRouter.get("/single/:guestId", userAuth, getGuestList);
guestRouter.get("/user", userAuth, getGuestListByUser);
guestRouter.get("/left-invitee", userAuth, leftInvitees);
guestRouter.get("/user/:eventId", userAuth, getGuestListByUserFiltered);
guestRouter.get("/single/:eventId/:singleGuestId", getSingleGuest);
guestRouter.get("/event/:eventId", userAuth, getGuestListByEvent);
guestRouter.patch("/open", openStatus);
guestRouter.post("/send-invite", userAuth, sendInvitation);
guestRouter.post(
  "/add-guests-from-addressBook",
  userAuth,
  checkAvailabilityOfInvitee,
  addGuestsFromAddressBook
);
guestRouter.patch("/response", guestResponse);
guestRouter.patch("/response-deny", guestResponseDeny);

export default guestRouter;
