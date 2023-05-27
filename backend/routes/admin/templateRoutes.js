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

templateRouter.get("/all", allTemplate);
templateRouter.post("/saveImage", upload.array("image"), saveImage);
templateRouter.post("/previewImage", upload.single("previewImage"), saveImage);
templateRouter.get("/sendImage/:imgName", sendImage);
templateRouter.post("/create", preview.single("previewImage"), createTemplate);
templateRouter.get("/stickers", getStickers);
templateRouter.delete("/sticker/:stickerId", deleteSticker);
templateRouter.post("/addSticker", upload.single("sticker"), addSticker);
templateRouter
  .route("/:id")
  .get(singleTemplate)
  .patch(preview.single("previewImage"), editTemplate)
  .delete(deleteTemplate);

export default templateRouter;
