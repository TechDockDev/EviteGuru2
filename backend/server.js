import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDb from "./config/db.js";
import guestUserRoutes from "./routes/user/guestUserRoutes.js";
import userRoutes from "./routes/user/userRoutes.js";
import adminRoutes from "./routes/admin/adminRoutes.js";
import templateRoutes from "./routes/admin/templateRoutes.js";
import variationRoutes from "./routes/user/variationRoutes.js";
import eventRoutes from "./routes/user/eventsRoutes.js";
import adminEventRoutes from "./routes/admin/eventRoutes.js";
import imageRouter from "./utils/Images.js";
import adminUserRoutes from "./routes/admin/adminUserRoutes.js";
import subscriptionRoutes from "./routes/admin/subscriptionRoutes.js";
import couponRoutes from "./routes/admin/couponRoutes.js";
import promotionRoutes from "./routes/admin/promotionRoutes.js";
import subscriptionUserRoutes from "./routes/user/subscriptionRoutes.js";
import faqRoutes from "./routes/admin/faqRoutes.js";
import faqUserRoutes from "./routes/user/faqRoutes.js";
import transactionRoutes from "./routes/admin/transactionRoutes.js";
import enterpriseUserRoutes from "./routes/user/enterpriseRoutes.js";
import enterpriseRoutes from "./routes/admin/enterpriseRoutes.js";
import templateUserRoutes from "./routes/user/templateUserRoutes.js";
import guestRoutes from "./routes/admin/guestRoutes.js";
import couponUserRoutes from "./routes/user/couponUserRoutes.js";

//connecting database
dotenv.config();
connectDb();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// images routes
app.use("/images", imageRouter);

// user routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/user/event", eventRoutes);
app.use("/api/v1/user/template", templateUserRoutes);
app.use("/api/v1/user/variation", variationRoutes);
app.use("/api/v1/user/guest", guestUserRoutes);
app.use("/api/v1/user/plan", subscriptionUserRoutes);
app.use("/api/v1/user/faq", faqUserRoutes);
app.use("/api/v1/user/coupon", couponUserRoutes);
app.use("/api/v1/user/enterprise", enterpriseUserRoutes);

// admin routes
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/admin/guests", guestRoutes);
app.use("/api/v1/admin/events", adminEventRoutes);
app.use("/api/v1/admin/user", adminUserRoutes);
app.use("/api/v1/admin/template", templateRoutes);
app.use("/api/v1/admin/plan", subscriptionRoutes);
app.use("/api/v1/admin/coupon", couponRoutes);
app.use("/api/v1/admin/promotion", promotionRoutes);
app.use("/api/v1/admin/faq", faqRoutes);
app.use("/api/v1/admin/transactions", transactionRoutes);
app.use("/api/v1/admin/enterprise", enterpriseRoutes);

// port using env file
const PORT = process.env.PORT || 8080; // port No.

app.listen(PORT, async (req, res) => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
