import express from "express";
import multer from "multer";
import bodyParser from "body-parser";
import Guests from "../models/demog.js";
// import { createPlan } from "../controllers/subscriptionController.js";

const dguestRouter = express.Router();

// to take image and json data form data at same time
dguestRouter.use(bodyParser.json());
dguestRouter.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));

dguestRouter.use(express.static("public"));
//multer for guest_list upload and update
const memory = multer.memoryStorage();
const memory1 = multer.memoryStorage();

const upload = multer({
  memory: memory,
  limits: { fileSize: 40000000 },
}).fields([
  { name: "final_card", maxCount: 1 },
  { name: "guest_list", maxCount: 1 },
]);

const updatedImage = multer({
  memory: memory1,
}).fields([
  { name: "final_card", maxCount: 1 },
  { name: "guest_list", maxCount: 1 },
]);

/**
 * @desc Create template by admin
 * @route POST /add
 * @access private /guest
 */

// dguestRouter.post("/create-plan", createPlan);

dguestRouter.get("/:id", async (req, res) => {
  const guest = await Guests.findById(req.params.id);
  if (!guest) {
    res.json("Template not found ");
  } else {
    res.status(201).json([guest]);
  }
});

/**
 * @dec update  Template in admin panel
 * @route PUT /update/ :id
 * @access public admin
 */

dguestRouter.get("update/:id/:id", updatedImage, async (req, res) => {
  const guest = await Guests.findById(req.params.id);

  // console.log([guest]);
  let guestid = guest.guests;
  const single = guestid.findById(req.params._id);
  const [targetIndex] = guest.guests.map((reqGues, index) => {
    console.log("regggg", reqGues._id.valueOf());
    if (reqGues._id.valueOf() === req.params._id) {
      return index;
    } else return null;
  });
  // console.log(targetIndex);
  console.log("second id, ", req.params._id);
  const tempGuest = {
    ...guest.guests[targetIndex]._doc,
    first_name: req.body.first_name || first_name,
    last_name: req.body.last_name || last_name,
    email: req.body.email || email,
    phone: req.body.phone || phone,
  };

  // console.log("temp guest", tempGuest);
  guestid[targetIndex] = tempGuest;
  // console.log("updated array", guestid);

  try {
    if (!guest) {
      res.json("Card not found ");
    } else {
      // console.log(guestid);
      // res.json([guestid]);

      // if (req.body) {
      //   let guest_list64 = null;
      //   let final_card64 = null;
      //   if (req.body) {
      //     guest_info = [
      //       (first_name = req.body.first_name || first_name),
      //       (last_name = req.body.last_name || last_name),
      //       (email = req.body.email || email),
      //       (phone = req.body.phone || phone),
      //     ];
      //   } else {
      //     final_card64 = Buffer.from(
      //       req.files["final_card"][0].buffer
      //     ).toString("base64");
      //     guest_list64 = Buffer.from(
      //       req.files["guest_list"][0].buffer
      //     ).toString("base64");
      //     //   guest.first_name = req.body.first_name || guest.first_name;
      //     //   guest.last_name = req.body.last_name || guest.last_name;
      //     //   guest.email = req.body.email || guest.email;
      //     //   guest.phone = req.body.phone || guest.phone;
      //     guest.final_card = final_card64;
      //     guest.guest_list = guest_list64;
      //   }
      // }
      guest.guests = guestid;
      let updated_guest = await guest.save();
      res.json(updated_guest);
    }
  } catch (err) {
    res.json("card/guests not updated please try again");
  }
});

export default dguestRouter;
