import express from "express";

import {
  authAdmin,
  deleteAdmin,
  // getallAdmin,
  registerAdmin,
  updateAdmin,
  logOut,
  getAdmin,
  changePassword,
} from "../../controllers/adminController.js";
import { adminAuth } from "../../middlewares/adminAuthMiddleware.js";

const adminRouter = express.Router();
adminRouter.use(express.json());

//admin routers
adminRouter.get("/get-admin", adminAuth, getAdmin); // for login admin
adminRouter.post("/login", authAdmin); // for login admin
adminRouter.post("/create-subadmin", registerAdmin); // for registration
// adminRouter.get("/admin-list", getallAdmin); //get all admin in panel
adminRouter.post("/change-password", adminAuth, changePassword);
adminRouter.get("/logout", logOut);

// admin controller route
adminRouter.route("/:id").delete(deleteAdmin).put(updateAdmin);

export default adminRouter;
