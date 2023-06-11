import express from "express";
import {
  addCoupon,
  allCoupons,
  deleteCoupon,
  getCoupon,
  updateCoupon,
} from "../../controllers/couponController.js";
import { adminAuth } from "../../middlewares/adminAuthMiddleware.js";

const couponRouter = express.Router();

couponRouter.post("/create", adminAuth, addCoupon);
couponRouter.get("/all", adminAuth, allCoupons);
couponRouter
  .route("/:couponId")
  .get(adminAuth, getCoupon)
  .patch(adminAuth, updateCoupon)
  .delete(adminAuth, deleteCoupon);

export default couponRouter;
