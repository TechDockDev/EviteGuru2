import express from "express";
import {
  createPlans,
  deletePlans,
  updatePlans,
  viewPlan,
  viewallPlans,
} from "../../controllers/adminController.js";
const subscriptionRouter = express.Router();

subscriptionRouter.post("/create-plan", createPlans);
subscriptionRouter.get("/all", viewallPlans);
subscriptionRouter
  .route("/:id")
  .patch(updatePlans) //update plan
  .delete(deletePlans) //delete plan
  .get(viewPlan); //view single plans by id

export default subscriptionRouter;
