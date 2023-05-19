import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDb from "./config/db.js";
import guestRoutes from "./routes/user/guestRoutes.js";
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

//connecting database
dotenv.config();
connectDb();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// images routes
app.use("/images", imageRouter);

//user routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/user/events", eventRoutes);
app.use("/api/v1/user/template", templateRoutes);
app.use("/api/v1/user/variation", variationRoutes);
app.use("/api/v1/user/guests", guestRoutes);

// admin routes
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/user/guests", guestRoutes);
app.use("/api/v1/admin/events", adminEventRoutes);
app.use("/api/v1/admin/user", adminUserRoutes);
app.use("/api/v1/admin/template", templateRoutes);
app.use("/api/v1/admin/plans", subscriptionRoutes);
app.use("/api/v1/admin/coupon", couponRoutes);

// port using env file
const PORT = process.env.PORT || 8080; // port No.

app.listen(PORT, async (req, res) => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
