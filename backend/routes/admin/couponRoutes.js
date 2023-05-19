import express from "express";
import { addCoupon, allCoupons } from "../../controllers/couponController.js";

const couponRouter = express.Router();

couponRouter.post("/create", addCoupon);
couponRouter.get("/all", allCoupons);

export default couponRouter;
