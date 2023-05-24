import express from "express";
import {
  authenticated,
  getUser,
  login,
  signUp,
  updateUser,
  logOut,
} from "../../controllers/userController.js";
import { userAuth } from "../../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.route("/register").post(signUp); // for registration
userRouter.route("/auth").get(userAuth, authenticated); // for registration
userRouter.post("/login", login); // for login
userRouter.get("/:id", getUser); // for checking auth user
userRouter.patch("/:id", updateUser); // user edit his information
userRouter.post("/logout", logOut); // for logout

export default userRouter;
