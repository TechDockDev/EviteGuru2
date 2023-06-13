import express from "express";
import multer from "multer";

import {
  allTemplate,
  deleteTemplate,
  singleTemplate,
  createTemplate,
  saveImage,
  sendImage,
  editTemplate,
  addSticker,
  getStickers,
  deleteSticker,
} from "../../controllers/templateController.js";
import { adminAuth } from "../../middlewares/adminAuthMiddleware.js";

// const upload = multer({ dest: "uploads/" });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/templateImages");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const previewImages = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/previewImages");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(".");
    cb(null, fileName[0] + Date.now() + "." + fileName[1]);
  },
});

const upload = multer({ storage: storage });
const preview = multer({ storage: previewImages });

const templateRouter = express.Router();

templateRouter.get("/all", adminAuth, allTemplate);
templateRouter.post("/saveImage", adminAuth, upload.array("image"), saveImage);
templateRouter.post(
  "/previewImage",
  adminAuth,
  upload.single("previewImage"),
  saveImage
);
templateRouter.get("/sendImage/:imgName", sendImage);
templateRouter.post(
  "/create",
  adminAuth,
  preview.single("previewImage"),
  createTemplate
);
templateRouter.get("/stickers", adminAuth, getStickers);
templateRouter.delete("/sticker/:stickerId", adminAuth, deleteSticker);
templateRouter.post(
  "/addSticker",
  adminAuth,
  upload.single("sticker"),
  addSticker
);
templateRouter
  .route("/:id")
  .get(singleTemplate)
  .patch(preview.single("previewImage"), editTemplate)
  .delete(deleteTemplate);

export default templateRouter;
