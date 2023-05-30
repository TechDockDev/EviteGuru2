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

subscriptionRouter.post("/purchase", purchasePlan);
subscriptionRouter.get("/success", userAuth, paymentSuccess);
subscriptionRouter.get("/failure", paymentFailure);
subscriptionRouter.get("/all", viewallPlans);
subscriptionRouter.route("/:id").get(viewPlan);

export default subscriptionRouter;
