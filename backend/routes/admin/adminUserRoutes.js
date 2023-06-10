import express from "express";
import { getallUsers } from "../../controllers/adminController.js";
import {
  giftInvitees,
  giftTemplates,
  suspendUser,
} from "../../controllers/adminUserController.js";
import { getUser } from "../../controllers/userController.js";
import { adminAuth } from "../../middlewares/adminAuthMiddleware.js";

const adminUserRouter = express.Router();

adminUserRouter.get("/all-users", adminAuth, getallUsers); //get all users in admin panel
adminUserRouter.patch("/gift-invitees", adminAuth, giftInvitees);
adminUserRouter.patch("/gift-templates", adminAuth, giftTemplates);
adminUserRouter.patch("/suspend", adminAuth, suspendUser);
adminUserRouter.route("/:id").get(adminAuth, getUser);

export default adminUserRouter;
