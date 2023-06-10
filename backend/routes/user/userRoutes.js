import express from "express";
import multer from "multer";
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
  updateProfilePhoto,
} from "../../controllers/userController.js";
import { userAuth } from "../../middlewares/authMiddleware.js";

const memory = multer.memoryStorage();

const upload = multer({ memory });

const userRouter = express.Router();

userRouter.route("/register").post(signUp);
userRouter.route("/register/google").post(googleSignUp);
userRouter.route("/login/google").post(googleLogin);
userRouter.route("/auth").get(userAuth, authenticated);
userRouter.post("/login", login);
userRouter.get("/single/:id", getUser);
userRouter.patch("/update", userAuth, updateUser);
userRouter.patch(
  "/update-profile-photo",
  upload.single("profile"),
  userAuth,
  updateProfilePhoto
);
userRouter.post("/forget-password", forgetPasssword);
userRouter.post("/change-forget-password", changeForgetPasssword);
userRouter.post("/change-password", userAuth, changePassword);
userRouter.post("/logout", logOut);

export default userRouter;
