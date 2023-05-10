import express from "express";
import multer from "multer";
import bodyParser from "body-parser";
import GuestDetails from "../models/guestsModels.js";
import {
  addGuest,
  delete_Card,
  getsingleGuestById,
  guest_feedBack,
  sendFinal_card,
  viewSingle_guest,
  view_Card,
} from "../controllers/guestController.js";
import EventDetails from "../models/eventModel.js";
import Subscription from "../models/subscriptionModel.js";
import User from "../models/userModel.js";
import userGooglefbs from "../models/userGoogleFbSchema.js";
import { body } from "express-validator";
const guestRouter = express.Router();
// to take image and json data form data at same time
guestRouter.use(bodyParser.json());
guestRouter.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));

guestRouter.use(express.static("public"));
//multer for guest_list upload and update
const memory = multer.memoryStorage();
const memory1 = multer.memoryStorage();

const upload = multer({
  memory: memory,
  // limits: { fileSize: 40000000 },
}).fields([
  // { name: "final_card" },
  { name: "guest_list", maxCount: 1 },
]);

const updatedImage = multer({
  memory: memory1,
}).fields([
  { name: "final_card", maxCount: 1 },
  { name: "guest_list", maxCount: 1 },
]);

/**
 * @desc Upload final template by users and check subscriptions
 * @route POST /add-card/:id
 * @access private /guest
 */

guestRouter.post("/add-cards/:id", upload, async (req, res) => {
  const { final_card } = req.body;
  console.log(final_card);
  const user = await User.findById(req.params.id);
  // const eventid = await EventDetails.findById(req.params.id);
  const google = await userGooglefbs.findById(req.params.id);

  if (user) {
    const email = user.email;
  } else {
    const email = google.email;
  }

  try {
    if (!user || !google) {
      res.json(" please check again data is not proper");
    }
    let final_card64 = null;
    let guest_list64 = null;

    if (user.templateNumber === 0 || google.templateNumber === 0) {
      res.json("Please do Subscription first to save the template");
    } else if (user.templateNumber > 0) {
      // let evenName = eventid.event_name;
      // let host = eventid.host_name;
      console.log(user);
      let check = user.templateNumber;

      if (check > 0 && final_card && !req.files["guest_list"]) {
        console.log(check);

        final_card64 = Buffer.from(req.body?.final_card).toString("base64");

        let card = await GuestDetails.create({
          final_card: final_card64,
          user: user._id,
        });

        res.json(card);
        let update = check - 1;
        user.template_num = update;

        user.template_num = update;

        let left = await user.save();
        console.log("template left", left);
      }
    } else if (check > 0 && final_card && req.files["guest_list"]) {
      // Return the saved image data as base64 encoded strings
      final_card64 = Buffer.from(req.body?.final_card).toString("base64");
      guest_list64 = Buffer.from(req.files["guest_list"][0].buffer).toString(
        "base64"
      );
    
      let guest = await GuestDetails.create({
        guest_list: guest_list64,
        final_card: final_card64,
        user: user._id,
      });
      // let guestId = null;
      // user.guestsDetailsId = guest._id;
      res.json(guest);
      let update = check - 1;
      user.template_num = update;

      let left = await user.save();
      // console.log("template left", left);
    } else if (google?.template_num > 0) {
      // let evenName = eventid.event_name;
      // let host = eventid.host_name;
      let final_card64 = null;
      let guest_list64 = null;
      if (final_card && google.template_num && req.files["guest_list"]) {
        let check = google.template_num;
        // Return the saved image data as base64 encoded strings
        guest_list64 = Buffer.from(req.files["guest_list"][0].buffer).toString(
          "base64"
        );
        final_card64 = Buffer.from(req.body?.final_card).toString("base64");
        // console.log(final_card64);

        let guest = await GuestDetails.create({
          guest_list: guest_list64,
          final_card: final_card64,
          user: google._id,
        });

        res.json(guest);
        let update = check - 1;
        google.template_num = update;

        let left = await google.save();
        console.log("template left", left);
      } else if (
        google?.template_num > 0 &&
        final_card &&
        !req.files["guest_list"]
      ) {
        final_card64 = Buffer.from(req.body?.final_card).toString("base64");
        let check = google.template_num;

        let card = await GuestDetails.create({
          final_card: final_card64,
          user: google._id,
        });
        res.json(card);
        let update = check - 1;
        google.template_num = update;

        let left = await google.save();
        console.log("template left", left);
      }
    }
  } catch (err) {
    res.status(500).json(err);
    // res.json("Please subscription to plan to update template and to send");
  }
});

// Test api for saving the image from user side

guestRouter.post("/add-cards", async (req, res) => {
  // res.send(JSON.stringify(req.final_card));
  let { final_card } = req.body;
  console.log(final_card);
  try {
    if (final_card) {
      let final_card64 = null;
      final_card64 = Buffer.from(req.body?.final_card).toString("base64");

      let card = await GuestDetails.create({
        final_card: final_card64,
      });
      res.json(card);
    }
  } catch (err) {
    console.log(err);
  }
});
/**
 * @dec update  card in users panel
 * @route PUT /card-update/ :id
 * @access public users
 */

guestRouter.put("/card/update/:id", updatedImage, async (req, res) => {
  const guest = await GuestDetails.findById(req.params.id);

  try {
    if (!guest) {
      res.json("Card not found ");
    } else {
      if (req.files) {
        let guest_list64 = null;
        let final_card64 = null;
        if (req.files["final_card"] && !req.files["guest_list"]) {
          final_card64 = Buffer.from(
            req.files["final_card"][0].buffer
          ).toString("base64");

          guest.final_card = final_card64;
        } else if (!req.files["final_card"] && req.files["guest_list"]) {
          guest_list64 = Buffer.from(
            req.files["guest_list"][0].buffer
          ).toString("base64");

          guest.guest_list = guest_list64;
        } else {
          final_card64 = Buffer.from(
            req.files["final_card"][0].buffer
          ).toString("base64");

          guest_list64 = Buffer.from(
            req.files["guest_list"][0].buffer
          ).toString("base64");

          guest.final_card = final_card64;
          guest.guest_list = guest_list64;
        }
      }

      let updated_guest = await guest.save();

      res.json(updated_guest);
    }
  } catch (err) {
    res.json("card/guests not updated please try again", err);
  }
});
guestRouter.route("/card/guest/:id").post(addGuest);
guestRouter.delete("/card/delete/:id", delete_Card);
guestRouter.get("/card/:id", view_Card);
guestRouter.get("/card/send-email/:id", sendFinal_card);
guestRouter.get("/cards/:id/:_id", viewSingle_guest);
guestRouter.post("/card/guest/:id", getsingleGuestById);
//guest route to receive feedback and update the guestSchema 
guestRouter.put("/receive-feedback/:id/:_id", guest_feedBack);

export default guestRouter;
