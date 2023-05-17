import express from "express";
const subscriptionRouter = express.Router();

subscriptionRouter.post("/create-plan", createPlans);
subscriptionRouter.get("/plans/subscriptions", viewallPlans);
subscriptionRouter
  .route("/plans/:id")
  .patch(updatePlans) //update plan
  .delete(deletePlans) //delete plan
  .get(viewPlans); //view single plans by id

export default subscriptionRouter;
