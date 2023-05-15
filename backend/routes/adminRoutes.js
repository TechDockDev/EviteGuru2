import express from "express";

import {
  authAdmin,
  changePassword,
  deleteAdmin,
  deletePlans,
  deleteUser,
  emailSendAdmin,
  getallAdmin,
  getallUsers,
  registerAdmin,
  singleTemplateId,
  updateAdmin,
  updatePlans,
  updateUser,
  viewPlans,
  admindeleteTemplate,
  viewallPlans,
  singleAdminId,
} from "../controllers/adminController.js";

import { createPlans } from "../controllers/adminController.js";
import { getUser } from "../controllers/userController.js";

const adminRouter = express.Router();
adminRouter.use(express.json());
//admin routers
adminRouter.post("/login", authAdmin); // for login admin
adminRouter.post("/create-subadmin", registerAdmin); // for registration
adminRouter.post("/email-send", emailSendAdmin); //  user send otp by email
adminRouter.post("/change-password", changePassword); // checking otp and change Password
// adminRouter.route("/users").get(getallUsers);
adminRouter.get("/admin_list", getallAdmin); //get all admin in panel
adminRouter
  .route("/template/:id")
  .get(singleTemplateId)
  .delete(admindeleteTemplate);
// user controller route
adminRouter.get("/all-users", getallUsers); //get all users in admin panel
adminRouter
  .route("/user/:id")
  .get(getUser)
  .put(updateUser) // update user by id
  .delete(deleteUser); // delete users by admin panel

// admin controller route
adminRouter
  .route("/:id")
  .delete(deleteAdmin) //delete admin from admin panel
  .put(updateAdmin) //update admin by email
  .get(singleAdminId); //single admin by id
// event controller routes

// adminRouter.get("/users/all-events", getallevent);

//Plans route
adminRouter.post("/create-plan", createPlans);
adminRouter.get("/plans/subscriptions", viewallPlans);
adminRouter
  .route("/plans/:id")
  .patch(updatePlans) //update plan
  .delete(deletePlans) //delete plan
  .get(viewPlans); //view single plans by id

export default adminRouter;
