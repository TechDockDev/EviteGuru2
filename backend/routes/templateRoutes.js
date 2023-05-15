import express from "express";
import multer from "multer";
import bodyParser from "body-parser";
import Template from "../models/templateModel.js";
import {
  allTemplate,
  deleteTemplate,
  singleTemplate,
  createTemplate,
  saveImage,
  sendImage,
  editTemplate,
} from "../controllers/templateController.js";

// const upload = multer({ dest: "uploads/" });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/templateImages");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.originalname);
  },
});
const previewImages = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/previewImages");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(".");
    console.log(file);
    cb(null, fileName[0] + Date.now() + "." + fileName[1]);
  },
});
const upload = multer({ storage: storage });
const preview = multer({ storage: previewImages });

const templateRouter = express.Router();

templateRouter.get("/", allTemplate);
templateRouter.post("/saveImage", upload.array("image"), saveImage);
templateRouter.post("/previewImage", upload.single("previewImage"), saveImage);
templateRouter.get("/sendImage/:imgName", sendImage);
templateRouter
  .route("/:id")
  .get(singleTemplate)
  .patch(preview.single("previewImage"), editTemplate)
  .delete(deleteTemplate);
templateRouter.post("/create", preview.single("previewImage"), createTemplate);

export default templateRouter;
