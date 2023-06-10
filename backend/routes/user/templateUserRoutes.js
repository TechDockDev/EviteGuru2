import express from "express";
import multer from "multer";

import {
  allTemplate,
  singleTemplate,
  sendImage,
  getStickers,
  saveImage,
} from "../../controllers/templateController.js";
import { userAuth } from "../../middlewares/authMiddleware.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/templateImages");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const templateUserRouter = express.Router();

templateUserRouter.get("/all", allTemplate);
templateUserRouter.post(
  "/saveImage",
  userAuth,
  upload.array("image"),
  saveImage
);
templateUserRouter.get("/sendImage/:imgName", userAuth, sendImage);
templateUserRouter.get("/stickers", userAuth, getStickers);
templateUserRouter.route("/:id").get(singleTemplate);

export default templateUserRouter;
