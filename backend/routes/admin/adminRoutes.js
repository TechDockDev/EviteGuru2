import express from "express";

import {
  authAdmin,
  deleteAdmin,
  registerAdmin,
  updateAdmin,
  logOut,
  getAdmin,
  changePassword,
  getAllAdmins,
  authenticated,
} from "../../controllers/adminController.js";
import { adminAuth } from "../../middlewares/adminAuthMiddleware.js";

const adminRouter = express.Router();
adminRouter.use(express.json());

adminRouter.get("/auth", adminAuth, authenticated);
adminRouter.post("/login", authAdmin);
adminRouter.post("/create-subadmin", registerAdmin);
adminRouter.get("/admin-list", getAllAdmins);
adminRouter.post("/change-password", adminAuth, changePassword);
adminRouter.get("/logout", logOut);
adminRouter.route("/:id").get(getAdmin).delete(deleteAdmin).put(updateAdmin);

export default adminRouter;
