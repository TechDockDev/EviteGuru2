import express from "express";
import {
  purchasePlan,
  viewPlan,
  viewallPlans,
} from "../../controllers/subscriptionController.js";

const subscriptionRouter = express.Router();

subscriptionRouter.post("/purchase", purchasePlan);
subscriptionRouter.get("/all", viewallPlans);
subscriptionRouter.route("/:id").get(viewPlan); //view single plans by id

export default subscriptionRouter;
