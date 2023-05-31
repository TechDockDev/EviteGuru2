import express from "express";
import { userAuth } from "../../middlewares/authMiddleware.js";
import {
  paymentFailure,
  paymentSuccess,
  purchasePlan,
  viewPlan,
  viewallPlans,
} from "../../controllers/subscriptionController.js";

const subscriptionRouter = express.Router();

subscriptionRouter.post("/purchase", userAuth, purchasePlan);
subscriptionRouter.get("/success", paymentSuccess);
subscriptionRouter.get("/failure", paymentFailure);
subscriptionRouter.get("/all", viewallPlans);
subscriptionRouter.route("/:id").get(viewPlan);

export default subscriptionRouter;
