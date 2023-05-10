import asyncHandler from "express-async-handler";
import Variation from "../models/variationModel.js";

const getVariationById = asyncHandler(async (req, res) => {
  const variation = await Variation.findById(req.params._id);
  res.json({
    status: "success",
    message: "variation has been fetched successfully",
    variation,
  });
});

const editVariation = asyncHandler(async (req, res) => {
  await Variation.findByIdAndUpdate(req.params.id, req.body);
  res.json({
    status: "success",
    message: "Variation has been updated successfully",
  });
});

const createVariation = asyncHandler(async (req, res) => {
  const { name, description, variationJson } = req.body;
  let variation = await Variation.create({
    name,
    description,
    variationJson,
    previewImage: req.file.filename,
    user: req.user.id,
  });
  res.json({
    status: "success",
    message: "Variation has been created successfully",
    variation,
  });
});

const saveImage = asyncHandler(async (req, res) => {
  res.json("Image saved");
});

const deleteVariation = asyncHandler(async (req, res) => {
  await Variation.findByIdAndRemove(req.params.id);
  res.json({
    status: "success",
    message: "Variation has been deleted",
  });
});

const allVariationOfUser = asyncHandler(async (req, res) => {
  const { page, ItemsPerPage } = req.query;
  const variation = await Variation.find({ user: req.user.id })
    .limit(page * ItemsPerPage)
    .skip(page * ItemsPerPage - ItemsPerPage);
  res.json({
    status: "success",
    message: "variation has been fetched Successfully",
    variation,
  });
});

const sendImage = asyncHandler((req, res) => {
  res.sendFile(`/uploads/VariationImages/${req.params.imgName}`, { root: "." });
});

const singleVariation = asyncHandler(async (req, res) => {
  const variation = await Variation.findById(req.params.id).select(
    "+variationJson"
  );
  res.json({
    status: "success",
    message: "Variation has been fetched",
    variation,
  });
});

export {
  getVariationById,
  deleteVariation,
  allVariationOfUser,
  singleVariation,
  editVariation,
  createVariation,
  saveImage,
  sendImage,
};
