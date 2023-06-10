import express from "express";
import {
  createPlan,
  deletePlan,
  updatePlan,
  viewallPlans,
  viewPlan,
} from "../../controllers/subscriptionController.js";
import { adminAuth } from "../../middlewares/adminAuthMiddleware.js";

const subscriptionRouter = express.Router();

subscriptionRouter.post("/create-plan", adminAuth, createPlan);
subscriptionRouter.get("/all", adminAuth, viewallPlans);
subscriptionRouter
  .route("/:id")
  .patch(adminAuth, updatePlan) //update plan
  .delete(adminAuth, deletePlan) //delete plan
  .get(adminAuth, viewPlan); //view single plans by id

export default subscriptionRouter;
