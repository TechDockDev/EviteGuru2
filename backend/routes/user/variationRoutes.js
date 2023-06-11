import express from "express";
import multer from "multer";

import {
  deleteVariation,
  allVariationOfUser,
  singleVariation,
  editVariation,
  createVariation,
  saveImage,
  sendImage,
  getStickers,
  leftVariations,
} from "../../controllers/variationController.js";
import { userAuth } from "../../middlewares/authMiddleware.js";
import { checkAvailabilityOfVariation } from "../../middlewares/availableVariationMiddleware.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/variations/variationImages");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const previewImages = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/variations/previewImages");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(".");
    cb(null, fileName[0] + Date.now() + "." + fileName[1]);
  },
});

const upload = multer({ storage: storage });
const preview = multer({ storage: previewImages });

const variationRouter = express.Router();

variationRouter.get("/all", userAuth, allVariationOfUser);
variationRouter.post(
  "/create",
  userAuth,
  checkAvailabilityOfVariation,
  preview.single("preview"),
  createVariation
);
variationRouter.post("/saveImage", userAuth, upload.array("image"), saveImage);
variationRouter.get("/sendImage/:imgName", userAuth, sendImage);
variationRouter.get("/stickers", userAuth, getStickers);
variationRouter.get("/left-variation", userAuth, leftVariations);
variationRouter
  .route("/:id")
  .get(userAuth, singleVariation)
  .patch(userAuth, editVariation)
  .delete(userAuth, deleteVariation);

export default variationRouter;
