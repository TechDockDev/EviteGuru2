import express from "express";
import {
  deleteUser,
  getallUsers,
  updateUser,
} from "../../controllers/adminController.js";
import {
  giftInvitees,
  giftTemplates,
  suspendUser,
} from "../../controllers/adminUserController.js";
import { getUser } from "../../controllers/userController.js";

const adminUserRouter = express.Router();

adminUserRouter.get("/all-users", getallUsers); //get all users in admin panel
adminUserRouter.patch("/gift-invitees", giftInvitees);
adminUserRouter.patch("/gift-templates", giftTemplates);
adminUserRouter.patch("/suspend", suspendUser);
adminUserRouter.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

export default adminUserRouter;
