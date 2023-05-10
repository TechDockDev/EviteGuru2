//modules used
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
// local files and folder
import connectDb from "./config/db.js";
import guestRoutes from "./routes/guestRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import templateRoutes from "./routes/templateRoutes.js";
import variationRoutes from "./routes/variationRoutes.js";
import handleError from "./middlewares/errorHandler.js";
import dguestRouter from "./routes/demogRoutes.js";
import bodyParser from "body-parser";
import eventRouter from "./routes/eventsRoutes.js";
import imageRouter from "./utils/Images.js";

//connecting database
dotenv.config();
connectDb();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//custom routes
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/events", eventRouter);
app.use("/template", templateRoutes);
app.use("/variation", variationRoutes);
app.use("/images", imageRouter);
app.use("/guests", guestRoutes);

// port using env file
const PORT = process.env.PORT || 8080; // port No.
app.use(express.static(process.env.STATIC_DIR));
app.get("/", async (req, res) => {
  res.json("Api is running");
  console.log(
    `Api is running in ${process.env.NODE_ENV} mode on port ${PORT}`.green.bold
  );
});

app.listen(PORT, async (req, res) => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});
