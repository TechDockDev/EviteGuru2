import express from "express";
import {
  authenticated,
  getUser,
  login,
  signUp,
  updateUser,
  logOut,
  changePassword,
} from "../../controllers/userController.js";
import { userAuth } from "../../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.route("/register").post(signUp); // for registration
userRouter.route("/auth").get(userAuth, authenticated); // for registration
userRouter.post("/login", login); // for login
userRouter.get("/single/:id", getUser); // for checking auth user
userRouter.patch("/update", updateUser); // user edit his information
userRouter.post("/change-password", userAuth, changePassword);
userRouter.post("/logout", logOut); // for logout

export default userRouter;
