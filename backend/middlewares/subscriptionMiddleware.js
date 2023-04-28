import Subscription from "../models/subscriptions";
import User from "../models/userModel";

const subscriptionAuth = asyncHandler(async (req, res, next) => {
  const plan = await Subscription.find("subscription").findById(
    user.subscriptionId
  );
  let users = await User.findById(req.params.id);
  const user = users;

  if (user.numTemplate >= plan.templateLimits) {
    return next(
      new Error(
        `You has reached the maximum number of template (${plan.templateLimits}) allowed by their plan.`
      )
    );
  }
  next();
});
// templateSchema.pre('save', async function (next) {
//   const template = this;
//   const user = await mongoose.model('User').findById(template.userId);
//   const subscription = await mongoose.model('Subscription').findById(user.subscriptionId);
//   const templatesCount = await mongoose.model('Template').countDocuments({ userId: user._id });
//   if (templatesCount >= subscription.limit) {
//     return next(new Error(`User has reached the maximum number of templates allowed for the current subscription plan.`));
//   }
//   next();
// });
export default subscriptionAuth;
