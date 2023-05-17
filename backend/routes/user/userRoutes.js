import express from "express";
import {
  getUser,
  login,
  signUp,
  updateUser,
} from "../../controllers/userController.js";

const userRouter = express.Router();

userRouter.route("/register").post(signUp); // for registration
userRouter.post("/login", login); // for login
userRouter.route("/:id").get(getUser); // for checking auth user
userRouter.patch("/:id", updateUser); // user edit his information

export default userRouter;
