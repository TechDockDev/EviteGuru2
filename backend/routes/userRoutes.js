import express from "express";
import {
  authUser,
  changePassword,
  emailSend,
  getUser,
  googlefacebookAuth,
  registerUser,
  updateUser,
  userPlans,
} from "../controllers/userController.js";

import { auth } from "../middlewares/authMiddleware.js";
import {
  createEvent,
  deleteEvent,
  editEvent,
  getEventById,
} from "../controllers/eventController.js";
import stripeUsers from "../utils/stripeConroller.js";

const userRouter = express.Router();
//users routes
userRouter.route("/user").post(registerUser); // for registration
userRouter.post("/auths", googlefacebookAuth); // for google&facebook registration
userRouter.post("/login", authUser); // for login
userRouter.route("/profile/:id").get(getUser); // for checking auth user
userRouter.post("/email-send", emailSend); //  user send otp by email for password verify
userRouter.post("/change-password", changePassword); // checking otp and change Password
userRouter.put("/:id", updateUser); // user edit his information

// Event route for user
userRouter.post("/event/:id", createEvent); //add event details by users
userRouter
  .route("/event-details/:id")
  .delete(deleteEvent) // delete event by users
  .put(editEvent) // update event by user
  .get(getEventById); // get event

// userRouter.get("/event-details/:id", auth, getEventById);

// subscription stripe payment route
userRouter.post("/create-payment-intent/:id", stripeUsers);
userRouter.patch("/:id/subscription", userPlans); // update the subscription by finding plans name in body

export default userRouter;
