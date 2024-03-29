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
import { deleteUser } from "../../controllers/userController.js";

const adminRouter = express.Router();
adminRouter.use(express.json());

adminRouter.get("/auth", adminAuth, authenticated);
adminRouter.post("/login", authAdmin);
adminRouter.post("/create-subadmin", registerAdmin);
adminRouter.get("/admin-list", adminAuth, getAllAdmins);
adminRouter.post("/change-password", adminAuth, changePassword);
adminRouter.get("/logout", logOut);
adminRouter.delete("/deleteUser/:userId", adminAuth, deleteUser);
adminRouter
  .route("/:id")
  .get(adminAuth, getAdmin)
  .delete(adminAuth, deleteAdmin)
  .put(adminAuth, updateAdmin);

export default adminRouter;
