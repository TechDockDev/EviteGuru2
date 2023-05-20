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
} from "../../controllers/variationController.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/variations/variationImages");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.originalname);
  },
});

const previewImages = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/variations/previewImages");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(".");
    console.log(file);
    cb(null, fileName[0] + Date.now() + "." + fileName[1]);
  },
});

const upload = multer({ storage: storage });
const preview = multer({ storage: previewImages });

const variationRouter = express.Router();

variationRouter.get("/all", allVariationOfUser);
variationRouter.post("/create", preview.single("preview"), createVariation);
variationRouter.post("/saveImage", upload.array("image"), saveImage);
variationRouter.post(
  "/previewImage",
  preview.single("previewImage"),
  saveImage
);
variationRouter.get("/sendImage/:imgName", sendImage);
variationRouter
  .route("/:id")
  .get(singleVariation)
  .patch(editVariation)
  .delete(deleteVariation);

export default variationRouter;
