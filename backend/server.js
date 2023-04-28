//modules used
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";

import { resolve } from "path";
// local files and folder
import connectDb from "./config/db.js";
import guestRouter from "./routes/guestRouter.js";
import userRoutes from "./routes/userRoutes.js";
import adminRouter from "./routes/adminRouter.js";
import templateRouter from "./routes/imageRouter.js";
import handleError from "./middlewares/errorHandler.js";
import dguestRouter from "./routes/demogRouter.js";

//connecting database
dotenv.config();
connectDb();

const app = express();
app.use(express.json());

app.use(cors());

//custom routes
app.use("/users", userRoutes);
app.use("/admin", adminRouter);
app.use("/template", templateRouter);
app.use("/guests", guestRouter);
// app.use("/test", dguestRouter);

//port using env file
const PORT = process.env.PORT || 8080; // port No.
app.use(express.static(process.env.STATIC_DIR));
app.get("/", async (req, res) => {
  res.json("Api is running");
  // test Server Api

  console.log(
    `Api is running in ${process.env.NODE_ENV} mode on port ${PORT}`.green.bold
  );
});

// Error middle_wares
app.use(handleError, async (req, res) => {
  res.send("Please check your url");
  console.log(
    `No responding in ${process.env.NODE_ENV} mode on port ${PORT} please check the url`
      .red.bold
  );
});

app.listen(PORT, async (req, res) => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});
