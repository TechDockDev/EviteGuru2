import asyncHandler from "express-async-handler";
import Variation from "../models/variationModel.js";
import Sticker from "../models/stickerModel.js";
import expressAsyncHandler from "express-async-handler";
import Event from "../models/eventModel.js";

const getVariationById = asyncHandler(async (req, res) => {
  const variation = await Variation.findById(req.params._id);
  res.json({
    status: "success",
    message: "variation has been fetched successfully",
    variation,
  });
});

const editVariation = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.eventId);
  await Variation.findByIdAndUpdate(event.variation, {
    ...req.body,
    previewImage: req.file.path,
  });
  res.json({
    status: "success",
    message: "Variation has been updated successfully",
  });
});

const createVariation = asyncHandler(async (req, res) => {
  const { name, variationJson, templateId } = req.body;
  const variation = await Variation.create({
    name,
    variationJson,
    previewImage: req.file.path,
    template: templateId,
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

const leftVariations = expressAsyncHandler(async (req, res) => {
  const totalVariationsUser = await Variation.find({
    user: req.user.id,
  }).count();
  const leftVariations = req.user.templateNum - totalVariationsUser;
  res.json({
    status: "success",
    message: "Remaining Variations have been fetched",
    leftVariations,
  });
});

const sendImage = asyncHandler((req, res) => {
  res.sendFile(`/uploads/VariationImages/${req.params.imgName}`, { root: "." });
});

const singleVariation = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.eventId);
  const variation = await Variation.findById(event.variation).select(
    "+variationJson"
  );
  res.json({
    status: "success",
    message: "Variation has been fetched",
    variation,
  });
});

const getStickers = asyncHandler(async (req, res) => {
  const stickers = await Sticker.find({});
  res.json({
    status: "success",
    message: "Stickers have been successfully fetched",
    stickers,
  });
});

export {
  getVariationById,
  deleteVariation,
  allVariationOfUser,
  singleVariation,
  editVariation,
  createVariation,
  leftVariations,
  saveImage,
  sendImage,
  getStickers,
};
