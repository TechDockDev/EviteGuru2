import asyncHandler from "express-async-handler";

//local files
import GuestDetails from "../models/guestsModels.js";
import userGooglefbs from "../models/userGoogleFbSchema.js";
import User from "../models/userModel.js";
import sendCard from "../utils/sendCard.js";
import sendText from "../utils/sendSms.js";
// event controller used in userRoutes

//testing f or users side by client requests side by using guest details schema

const addGuest = asyncHandler(async (req, res) => {
  let guest = req.body.guests;

  try {
    if (req.body) {
      let guests = await GuestDetails.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { guests: guest } },
        { new: true }
      );

      res.json(guests.guests);
    } else {
      res.json("user details is not proper");
    }
  } catch (err) {
    console.log(err);
    res.json({ message: "Guest detail Error", err: err });
  }
});

/**
 * @desc		Add new guest name by users and check subscription
 * @route		POST /guests
 * @access	private / users final api
 */

// const addGuest = asyncHandler(async (req, res) => {
//   let single_guest = req.body.single_guest;
//   const guestdetials = await GuestDetails.findById(req.params.id);
//   const userdetials = await User.findById(req.params._id);
//   const gmail = await userGooglefbs.findById(req.params._id);

//   try {
//     if (gmail?.guest_num == 0 || userdetials?.guest_num == 0) {
//       res.json({ message: "please subscribe to plan to add more guests" });
//     } else if (
//       (gmail?.guest_num > 0 || userdetials?.guest_num > 0) &&
//       req.body
//     ) {
//       // res.json({ guest_num: gmail?.guest_num });
//       // console.log(single_guest);

//       if (userdetials?.guest_num && single_guest) {
//         let guests = await GuestDetails.findOneAndUpdate(
//   { _id: req.params.id },
//   { $push: { guests: guest } },
//   { new: true }
// );
//         // console.log([single_guest]);

//         res.json(single_guest);
//         let update = userdetials.guest_num - 1;
//         userdetials.guest_num = update;

//         let left = await userdetials.save();
//         console.log("Invitee left", left);
//         // console.log(guest);
//       } else if (gmail?.guest_num > 0 && single_guest) {
//         console.log(single_guest);

//         let guest = await guestdetials.update(
//           let guests = await GuestDetails.findOneAndUpdate(
//   { _id: req.params.id },
//   { $push: { guests: guest } },
//   { new: true }
// );
//         // console.log([single_guest]);

//         res.json(single_guest);
//         let update = gmail.guest_num - 1;
//         gmail.guest_num = update;

//         let left = await gmail.save();
//         console.log("Invitee left", left);
//         // console.log(guest);
//       }
//     } else {
//       res.json("user details is not proper");
//     }
//   } catch (err) {
//     console.log(err);
//     res.json({ h: "Guest detail", err: err });
//   }
// });

/**
 * @desc		Fetch single guest details from by id
 * @route		GET /:id
 * @access	private
 */
const getsingleGuestById = asyncHandler(async (req, res) => {
  const guestdetials = await GuestDetails.findById(req.params.id);
  const singleGuest = req.body.singleGuest;

  try {
    if (guestdetials) {
      if (guestdetials) {
        let data = [];
        data = guestdetials.find({ guests: { _id: singleGuest } });
        res.json(data);
      } else {
        res.status(404).json({ message: "guests not found" }); //event not found
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500); // Something went

    throw new Error("Please try again");
  }
});

/**
 * @dec send card to guests in users panel
 * @route GET /card/send-email/:id
 * @access private users
 */
const sendFinal_card = asyncHandler(async (req, res) => {
  try {
    if (!req.params.id) {
      res.json("card not found ");
    } else {
      if (req.params.id) {
        const card = await GuestDetails.findById(req.params.id);

        let data = card.guests;
        let final_card = card.final_card;
        function extractValue(arr, prop) {
          // extract value from property
          let extractedValue = arr.map((item) => item[prop]);

          return extractedValue;
        }
        // res.json({ card });

        let guestsemail = extractValue(data, "email");
        let last_name = extractValue(data, "last_name");
        let phone = extractValue(data, "phone");
        // console.log("total", guestId);
        console.log("Guest email are ", guestsemail);
        sendCard(guestsemail, last_name, final_card);
        sendText(phone, last_name);

        res.json("card sended to all for this Card");
      } else {
        res.json("guest not found");
      }
    }
  } catch (err) {
    res.json("Error", err);
  }
});

/**
 * @dec view single guests details in users panel
 * @route GET /cards/:id/:_id
 * @access private users
 */
const viewSingle_guest = asyncHandler(async (req, res) => {
  try {
    if (req.params.id) {
      if (req.params.id && req.params._id) {
        const card = await GuestDetails.findById(req.params.id);

        let data = card.guests;
        function extractValue(arr, prop) {
          // extract value from of object property in array
          let extractedValue = arr.map((item) => item[prop]);

          return extractedValue;
        }

        let id = req.params._id;
        const object = data.find((obj) => obj.id === id);
        let guests = extractValue(data, "_id");
        let guestId = guests.toString();
        if (guestId.includes(id)) {
          res.json(object);
        } else {
          res.json("guest not found");
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
});

//feedback from guests
/**
 * @dec get receive feedback by guest email/sms form
 * @route GET /receive-feedback/:id/:_id
 * @access private users / guests
 */
const guest_feedBack = asyncHandler(async (req, res) => {
  try {
    let guestId = req.params.id;
    let { Adult, Children, Attend } = req.body;
    if (guestId) {
      if (req.params.id && req.params._id) {
        const card = await GuestDetails.findById(req.params.id);

        let data = card.guests;
        // res.json(card);
        let singleGuestId = req.params._id;

        let total = Adult + Children;
        let guest = await GuestDetails.updateMany(
          { "guests._id": singleGuestId },
          {
            $set: {
              "guests.$.person": Adult,
              "guests.$.child": Children,
              "guests.$.total": total,
              "guests.$.attend": Attend,
            },
          }
        );
      }
    }
    let updated = await GuestDetails.findById(req.params.id);
    res.json(updated.guests);
  } catch (error) {
    res.json("Please try again data not updated", error);
  }
});

/**
 * @desc delete template by id
 * @route DELETE /:id
 * @access private/guest
 */

const delete_Card = asyncHandler(async (req, res) => {
  const guest = await GuestDetails.findById(req.params.id);

  if (!guest) {
    res.json("Card not found ");
  } else {
    await guest.remove();
    res.json("Card is deleted");
  }
});

/**
 * @desc view card by id in user end
 * @route GET /card/:id
 * @access private / user
 */

const view_Card = asyncHandler(async (req, res) => {
  const card = await GuestDetails.findById(req.params.id);

  if (!card) {
    res.json("card not found ");
  } else {
    res.status(201).json(card);
  }
});
export {
  addGuest,
  getsingleGuestById,
  guest_feedBack,
  sendFinal_card,
  viewSingle_guest,
  delete_Card,
  view_Card,
};
