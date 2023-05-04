import express from "express";
import multer from "multer";
import bodyParser from "body-parser";
import Template from "../models/templateModels.js";
import {
  allTemplate,
  deleteTemplate,
  singleTemplate,
} from "../controllers/templateController.js";

const templateRouter = express.Router();

// to take image and json data form data at same time
// templateRouter.use(bodyParser.json());
// templateRouter.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));

// templateRouter.use(express.static("public"));
//multer for image upload and update
const memory = multer.memoryStorage();
const memory1 = multer.memoryStorage();

const upload = multer({
  memory: memory,
  // limits: { fileSize: 100000000 },
}).fields([
  { name: "backgroundimage", maxCount: 1 },
  { name: "sampleimage", maxCount: 1 },
  { name: "sampleimage1", maxCount: 1 },
  { name: "sampleimage2", maxCount: 1 },
  { name: "sampleimage3", maxCount: 1 },
]);

const updatedImage = multer({
  memory: memory1,
}).fields([
  { name: "backgroundimage", maxCount: 1 },
  { name: "sampleimage", maxCount: 1 },
  { name: "sampleimage1", maxCount: 1 },
  { name: "sampleimage2", maxCount: 1 },
  { name: "sampleimage3", maxCount: 1 },
]);

/**
 * @desc Create template by admin
 * @route POST /create
 * @access private /admin
 */

templateRouter.post("/create", async (req, res) => {
  const { name, description, templateJson } = req.body;
  try {
    let template = await Template.create({
      name,
      description,
      templateJson,
    });
    res.json({
      status: "success",
      message: "Template has been created successfully",
      template,
    });
  } catch (err) {
    res.json(err);
  }
});

/**
 * @dec update  Template in admin panel
 * @route PUT /update/ :id
 * @access public admin
 */

templateRouter.put("/:id", updatedImage, async (req, res) => {
  const template = await Template.findById(req.params.id);

  try {
    if (!template) {
      res.json("Template not found ");
    } else {
      if (req.files) {
        let sampleimage64 = null;
        let sampleimage164 = null;
        let sampleimage264 = null;
        let sampleimage364 = null;
        let backgroundimage64 = null;
        if (
          req.files["backgroundimage"] &&
          !req.files["sampleimage"] &&
          !req.files["sampleimage1"] &&
          !req.files["sampleimage2"] &&
          !req.files["sampleimage2"]
        ) {
          backgroundimage64 = Buffer.from(
            req.files["backgroundimage"][0].buffer
          ).toString("base64");
          template.name = req.body.name || template.name;
          template.description = req.body.description || template.description;
          template.backgroundimage = backgroundimage64;
        } else if (
          !req.files["backgroundimage"] &&
          req.files["sampleimage"] &&
          !req.files["sampleimage1"] &&
          !req.files["sampleimage2"] &&
          !req.files["sampleimage3"]
        ) {
          sampleimage64 = Buffer.from(
            req.files["sampleimage"][0].buffer
          ).toString("base64");

          template.name = req.body.name || template.name;
          template.description = req.body.description || template.description;
          template.sampleimage = sampleimage64;
          template.backgroundimage = template.backgroundimage;
          template.sampleimage1 = template.sampleimage1;
          // template.sampleimage2 = sampleimage264;
          // template.sampleimage3 = sampleimage364;
        } else if (
          req.files["backgroundimage"] &&
          req.files["sampleimage"] &&
          !req.files["sampleimage1"] &&
          !req.files["sampleimage2"] &&
          !req.files["sampleimage3"]
        ) {
          sampleimage64 = Buffer.from(
            req.files["sampleimage"][0].buffer
          ).toString("base64");
          backgroundimage64 = Buffer.from(
            req.files["backgroundimage"][0].buffer
          ).toString("base64");
          console.log(backgroundimage64);
          // sampleimage264 = Buffer.from(
          //   req.files["sampleimage2"][0].buffer
          // ).toString("base64");
          // sampleimage364 = Buffer.from(
          //   req.files["sampleimage3"][0].buffer
          // ).toString("base64");
          template.name = req.body.name || template.name;
          template.description = req.body.description || template.description;
          template.sampleimage = sampleimage64;
          template.backgroundimage = backgroundimage64;
          // template.sampleimage2 = sampleimage264;
          // template.sampleimage3 = sampleimage364;
        } else if (
          !req.files["backgroundimage"] &&
          !req.files["sampleimage"] &&
          !req.files["sampleimage1"] &&
          req.files["sampleimage2"] &&
          req.files["sampleimage3"]
        ) {
          sampleimage364 = Buffer.from(
            req.files["sampleimage3"][0].buffer
          ).toString("base64");
          sampleimage264 = Buffer.from(
            req.files["sampleimage2"][0].buffer
          ).toString("base64");
          template.name = req.body.name || template.name;
          template.description = req.body.description || template.description;
          template.sampleimage3 = sampleimage364;
          template.sampleimage2 = sampleimage264;
        } else if (
          !req.files["backgroundimage"] &&
          !req.files["sampleimage"] &&
          req.files["sampleimage1"] &&
          req.files["sampleimage2"] &&
          req.files["sampleimage3"]
        ) {
          sampleimage164 = Buffer.from(
            req.files["sampleimage1"][0].buffer
          ).toString("base64");
          sampleimage264 = Buffer.from(
            req.files["sampleimage2"][0].buffer
          ).toString("base64");
          sampleimage364 = Buffer.from(
            req.files["sampleimage3"][0].buffer
          ).toString("base64");
          template.name = req.body.name || template.name;
          template.description = req.body.description || template.description;
          template.sampleimage1 = sampleimage164;
          template.sampleimage2 = sampleimage264;
          template.sampleimage3 = sampleimage364;
        } else if (
          !req.files["backgroundimage"] &&
          !req.files["sampleimage"] &&
          !req.files["sampleimage1"] &&
          !req.files["sampleimage2"] &&
          req.files["sampleimage3"]
        ) {
          sampleimage364 = Buffer.from(
            req.files["sampleimage3"][0].buffer
          ).toString("base64");
          template.name = req.body.name || template.name;
          template.description = req.body.description || template.description;
          template.sampleimage3 = sampleimage364;
        } else {
          sampleimage64 = Buffer.from(
            req.files["sampleimage"][0].buffer
          ).toString("base64");
          sampleimage164 = Buffer.from(
            req.files["sampleimage1"][0].buffer
          ).toString("base64");
          sampleimage264 = Buffer.from(
            req.files["sampleimage2"][0].buffer
          ).toString("base64");
          sampleimage364 = Buffer.from(
            req.files["sampleimage3"][0].buffer
          ).toString("base64");
          backgroundimage64 = Buffer.from(
            req.files["backgroundimage"][0].buffer
          ).toString("base64");
          template.name = req.body.name || template.name;
          template.description = req.body.description || template.description;
          template.sampleimage = sampleimage64;
          template.sampleimage1 = sampleimage164;
          template.sampleimage2 = sampleimage264;
          template.sampleimage3 = sampleimage364;
          template.backgroundimage = backgroundimage64;
        }
      }

      let updatedtemplate = await template.save();

      res.json(updatedtemplate);
    }
  } catch (err) {
    res.json("Template not updated please try again", err);
  }
});
templateRouter.get("/", allTemplate);
templateRouter.delete("/delete/:id", deleteTemplate);
templateRouter.get("/:id", singleTemplate);

export default templateRouter;
