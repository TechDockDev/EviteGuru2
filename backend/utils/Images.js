import express from "express";
import expressAsyncHandler from "express-async-handler";
const imageRouter = express.Router();

imageRouter.get(
  "/getImage",
  expressAsyncHandler((req, res) => {
    res.sendFile(`${req.query.path}`, { root: "." });
  })
);

export default imageRouter;
