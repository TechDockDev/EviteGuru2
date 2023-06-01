import express from "express";
import {
  authenticated,
  getUser,
  login,
  signUp,
  updateUser,
  logOut,
  changePassword,
  googleSignUp,
  forgetPasssword,
  changeForgetPasssword,
  googleLogin,
} from "../../controllers/userController.js";
import { userAuth } from "../../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.route("/register").post(signUp);
userRouter.route("/register/google").post(googleSignUp);
userRouter.route("/login/google").post(googleLogin);
userRouter.route("/auth").get(userAuth, authenticated);
userRouter.post("/login", login); // for login
userRouter.get("/single/:id", getUser);
userRouter.patch("/update", updateUser);
userRouter.post("/forget-password", forgetPasssword);
userRouter.post("/change-forget-password", changeForgetPasssword);
userRouter.post("/forget-password", forgetPasssword);
userRouter.post("/change-password", userAuth, changePassword);
userRouter.post("/logout", logOut); // for logout

export default userRouter;
