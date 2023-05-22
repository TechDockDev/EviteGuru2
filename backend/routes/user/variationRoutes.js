import express from "express";
import multer from "multer";

import {
  getVariationById,
  deleteVariation,
  allVariationOfUser,
  singleVariation,
  editVariation,
  createVariation,
  saveImage,
  sendImage,
  getStickers,
} from "../../controllers/variationController.js";
import { userAuth } from "../../middlewares/authMiddleware.js";

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

variationRouter.get("/all", allVariationOfUser);
variationRouter.post(
  "/create",
  userAuth,
  preview.single("preview"),
  createVariation
);
variationRouter.post("/saveImage", upload.array("image"), saveImage);
variationRouter.get("/sendImage/:imgName", sendImage);
variationRouter.get("/stickers", getStickers);
variationRouter
  .route("/:id")
  .get(singleVariation)
  .patch(editVariation)
  .delete(deleteVariation);

export default variationRouter;
