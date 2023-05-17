import express from "express";
import {
  deleteUser,
  getallUsers,
  updateUser,
} from "../../controllers/adminController.js";
import { getUser } from "../../controllers/userController.js";

const adminUserRouter = express.Router();

adminUserRouter.get("/all-users", getallUsers); //get all users in admin panel
adminUserRouter
  .route("/:id")
  .get(getUser)
  .put(updateUser) // update user by id
  .delete(deleteUser); // delete users by admin panel

export default adminUserRouter;
