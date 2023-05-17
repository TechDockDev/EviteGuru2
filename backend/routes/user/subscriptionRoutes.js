const subscriptionRouter = express.Router();

subscriptionRouter.post("/create-payment-intent/:id", stripeUsers);
subscriptionRouter.patch("/:id/subscription", userPlans);

export default subscriptionRouter;
