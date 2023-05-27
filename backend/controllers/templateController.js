import asyncHandler from "express-async-handler";
import Template from "../models/templateModel.js";
import expressAsyncHandler from "express-async-handler";
import Sticker from "../models/stickerModel.js";

const getTemplateById = asyncHandler(async (req, res) => {
  try {
    const template = await Template.findById(req.params._id);

    if (template) {
      res.json(template);
    } else {
      res.status(404).json({ message: "Template not found" }); //template not found
    }
  } catch (error) {
    console.error(error);
    res.status(500); // Something went wrong
    throw new Error("Please try again");
  }
});

const editTemplate = asyncHandler(async (req, res) => {
  await Template.findByIdAndUpdate(req.params.id, {
    ...req.body,
    previewImage: req.file.path,
  });
  res.json({
    status: "success",
    message: "Template has been updated successfully",
  });
});

const createTemplate = asyncHandler(async (req, res) => {
  const { name, description, templateJson } = req.body;
  try {
    let template = await Template.create({
      name,
      description,
      templateJson,
      previewImage: req.file.path,
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

const getStickers = expressAsyncHandler(async (req, res) => {
  const stickers = await Sticker.find({});
  res.json({
    status: "success",
    message: "Stickers have been fetched successfully",
    stickers,
  });
});

const addSticker = expressAsyncHandler(async (req, res) => {
  await Sticker.create({
    name: req.body.name,
    image: req.file.path,
  });
  res.json({
    status: "success",
    message: "Sticker has been added successfully",
  });
});

const deleteSticker = expressAsyncHandler(async (req, res) => {
  await Sticker.findByIdAndRemove(req.params.stickerId);
  res.json({
    status: "success",
    message: "Sticker has been deleted successfully",
  });
});

const saveImage = asyncHandler(async (req, res) => {
  console.log(req.files);
  res.json("Image saved");
});

const deleteTemplate = asyncHandler(async (req, res) => {
  await Template.findByIdAndRemove(req.params.id);
  res.json({
    status: "success",
    message: "Template has been deleted",
  });
});

const allTemplate = asyncHandler(async (req, res) => {
  const { page, limit } = req.query;
  const template = await Template.find({})
    .limit(page * limit)
    .skip(page * limit - limit);
  const totalPages = Math.ceil((await Template.find({}).count()) / limit);
  res.json({
    status: "success",
    message: "Templates has been successfully fetched",
    template,
    totalPages,
  });
});

const sendImage = asyncHandler((req, res) => {
  res.sendFile(`/uploads/templateImages/${req.params.imgName}`, { root: "." });
});

const singleTemplate = asyncHandler(async (req, res) => {
  const template = await Template.findById(req.params.id).select(
    "+templateJson"
  );
  res.json({
    status: "success",
    message: "Template has been fetched",
    template,
  });
});

export {
  getTemplateById,
  deleteTemplate,
  allTemplate,
  singleTemplate,
  editTemplate,
  createTemplate,
  saveImage,
  sendImage,
  addSticker,
  getStickers,
  deleteSticker,
};
