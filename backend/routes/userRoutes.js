import express from "express";
import {
  changePassword,
  emailSend,
  getUser,
  login,
  signUp,
  updateUser,
  userPlans,
} from "../controllers/userController.js";

import { userAuth } from "../middlewares/authMiddleware.js";
import {
  createEvent,
  deleteEvent,
  editEvent,
  getEventById,
} from "../controllers/eventController.js";
import stripeUsers from "../utils/stripeConroller.js";

const userRouter = express.Router();
//users routes
userRouter.route("/register").post(signUp); // for registration
userRouter.post("/login", login); // for login
userRouter.route("/profile/:id").get(getUser); // for checking auth user
userRouter.post("/email-send", emailSend); //  user send otp by email for password verify
userRouter.post("/change-password", changePassword); // checking otp and change Password
userRouter.patch("/:id", updateUser); // user edit his information

// Event route for user
userRouter
  .route("/event-details/:id")
  .delete(deleteEvent) // delete event by users
  .put(editEvent) // update event by user
  .get(getEventById); // get event

// subscription stripe payment route
userRouter.post("/create-payment-intent/:id", stripeUsers);
userRouter.patch("/:id/subscription", userPlans); // update the subscription by finding plans name in body

export default userRouter;
