import express from "express";
import {
  addCoupon,
  allCoupons,
  deleteCoupon,
  getCoupon,
  updateCoupon,
} from "../../controllers/couponController.js";

const couponRouter = express.Router();

couponRouter.post("/create", addCoupon);
couponRouter.get("/all", allCoupons);
couponRouter
  .route("/:couponId")
  .get(getCoupon)
  .patch(updateCoupon)
  .delete(deleteCoupon);

export default couponRouter;
