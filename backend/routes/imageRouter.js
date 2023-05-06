import express from "express";
import multer from "multer";
import bodyParser from "body-parser";
import Template from "../models/templateModels.js";
import {
  allTemplate,
  deleteTemplate,
  singleTemplate,
  createTemplate,
  saveImage,
  sendImage,
} from "../controllers/templateController.js";

// const upload = multer({ dest: "uploads/" });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    console.log(file);
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

const templateRouter = express.Router();

// templateRouter.use(express.static("public"));
/**
 * @desc Create template by admin
 * @route POST /create
 * @access private /admin
 */

/**
 * @dec update  Template in admin panel
 * @route PUT /update/ :id
 * @access public admin
 */

templateRouter.get("/", allTemplate);
templateRouter.post("/saveImage", upload.array("image"), saveImage);
templateRouter.get("/sendImage/:imgName", sendImage);
templateRouter.get("/:id", singleTemplate);
templateRouter.post("/create", createTemplate);
templateRouter.delete("/delete/:id", deleteTemplate);

export default templateRouter;
