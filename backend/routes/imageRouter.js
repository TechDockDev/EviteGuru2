import express from "express";
import multer from "multer";
import bodyParser from "body-parser";
import Template from "../models/templateModels.js";
import {
  allTemplate,
  deleteTemplate,
  singleTemplate,
  createTemplate,
} from "../controllers/templateController.js";

const templateRouter = express.Router();

// templateRouter.use(express.static("public"));
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

templateRouter.get("/", allTemplate);
templateRouter.get("/:id", singleTemplate);
templateRouter.post("/create", createTemplate);
templateRouter.delete("/delete/:id", deleteTemplate);

export default templateRouter;
