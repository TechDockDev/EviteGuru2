import express from "express";
import {
  createPlan,
  deletePlan,
  updatePlan,
  viewallPlans,
  viewPlan,
} from "../../controllers/subscriptionController.js";

const subscriptionRouter = express.Router();

subscriptionRouter.post("/create-plan", createPlan);
subscriptionRouter.get("/all", viewallPlans);
subscriptionRouter
  .route("/:id")
  .patch(updatePlan) //update plan
  .delete(deletePlan) //delete plan
  .get(viewPlan); //view single plans by id

export default subscriptionRouter;
