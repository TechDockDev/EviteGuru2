import express from "express";
import {
  applyCoupon,
  getCouponByPlan,
} from "../../controllers/couponController.js";
import { userAuth } from "../../middlewares/authMiddleware.js";

const couponRouter = express.Router();

couponRouter.get("/get-by-plan/:planName", userAuth, getCouponByPlan);
couponRouter.post("/apply-coupon", userAuth, applyCoupon);

export default couponRouter;
