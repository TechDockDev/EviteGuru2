import express from "express";

import {
  authAdmin,
  deleteAdmin,
  getallAdmin,
  registerAdmin,
  updateAdmin,
  singleAdminId,
} from "../../controllers/adminController.js";

const adminRouter = express.Router();
adminRouter.use(express.json());

//admin routers
adminRouter.post("/login", authAdmin); // for login admin
adminRouter.post("/create-subadmin", registerAdmin); // for registration
adminRouter.get("/admin-list", getallAdmin); //get all admin in panel

// admin controller route
adminRouter
  .route("/:id")
  .delete(deleteAdmin) //delete admin from admin panel
  .put(updateAdmin) //update admin by email
  .get(singleAdminId); //single admin by id

export default adminRouter;
