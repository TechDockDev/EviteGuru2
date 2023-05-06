import asyncHandler from "express-async-handler";
//local files
import Template from "../models/templateModels.js";
import generateToken from "../utils/generateToken.js";
import EventDetails from "../models/eventModels.js";

/**
 * @des     upload Template Name and Image
 * @route   POST    /template/create
 * @access  private Only Admin
 */

/**
 * @dec get all template
 * @route GET /template/categories
 * @access public
 */

const viewCategories = asyncHandler(async (req, res) => {
  const templates = await Template.find({}); //select all templates in list
  res.json(templates);
});

/**
 * @desc		Fetch single template
 * @route		GET /:id
 * @access	public
 */
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

/**
 * @desc delete template by id
 * @route DELETE /template/:id
 * @access private /admin
 */

const deleteTemplates = asyncHandler(async (req, res) => {
  const template = await Template.findById(req.params.id);
  // const admin = await Admin.findOne({ email: req.body.email });

  if (template) {
    await template.remove();
    res.json({ message: "Template is deleted" });
  } else {
    res.status(404); //not found
    throw new Error(" Template is not found");
  }
});

/**
 * @desc Update template
 * @route PUT /template/:id
 * @access private /admin
 */

const editTemplate = asyncHandler(async (req, res) => {
  const template = await Template.findById(req.params.id);
  //   .populate(
  //     "name",
  //     "categories"
  //   );
  // const template = await Template.find(req.template.name);

  if (template) {
    template.name = req.body.name || template.name;

    template.desc = req.body.desc || template.desc;

    const editTemplate = await template.save();

    res.json({
      _id: editTemplate._id,
      name: editTemplate.name,

      desc: editTemplate.desc,
    });
  } else {
    res.status(404);
    throw new Error("Not found template");
  }
});

// controller for to users

/**
 * @desc Update template by user
 * @route PUT /template/:id
 * @access private /user
 */

const userTemplate = asyncHandler(async (req, res) => {
  const template = await Template.findById(req.params.id);
  //   .populate(
  //     "name",
  //     "categories"
  //   );
  // const template = await Template.find(req.template.name);

  if (template) {
    template.name = req.body.name || template.name;

    const editTemplate = await template.save();

    res.json({
      _id: editTemplate._id,
      name: editTemplate.name,
    });
  } else {
    res.status(404);
    throw new Error("Not found template");
  }
});

/**
 * @desc Update template by user
 * @route PUT /template/:id
 * @access private /user
 */

// Storage

const createTemplate = asyncHandler(async (req, res) => {
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
 * @desc		Create new Event Template by users
 * @route		POST /event
 * @access	private / users
 */
const createEvent = asyncHandler(async (req, res) => {
  const { title, host, date, time, location } = req.body;
  console.log(req.user);

  const eventDetails = await EventDetails.create({
    title,
    host,
    date,
    time,
    location,
  });

  if (eventDetails) {
    // Successfully created
    res.status(201).json({
      _id: eventDetails._id,
      title: eventDetails.title,
      host: eventDetails.host || eventDetails.host,
      date: eventDetails.date,
      location: eventDetails.location,
      // // Adding Pagination
      // const limitValue = req.query.limit || 2;
      // const skipValue = req.query.skip || 0;
      // const posts = await postModel.find()
      //     .limit(limitValue).skip(skipValue);
      // res.status(200).send(posts);
      token: generateToken(event._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Event data");
  }

  await EventDetails.insertMany(eventDetails);
});

/**
 * @desc delete template by id
 * @route DELETE /:id
 * @access private/admin
 */

const deleteTemplate = asyncHandler(async (req, res) => {
  const template = await Template.findByIdAndRemove(req.params.id);
  res.json({
    status: "success",
    message: "Template has been deleted",
  });
});

/**
 * @dec get all Template in admin panel
 * @route GET /template-list
 * @access public admin & users
 */

const allTemplate = asyncHandler(async (req, res) => {
  try {
    const template = await Template.find({});
    res.json({ template });
  } catch (err) {
    console.log("not showing all template", err);
    res.json(err);
  }
});

/**
 * @dec get single Template in admin panel
 * @route GET /id
 * @access public admin & users
 */

const singleTemplate = asyncHandler(async (req, res) => {
  const template = await Template.findById(req.params.id);
  try {
    if (!template) {
      res.json("Template not found ");
    } else {
      res.json(template);
    }
  } catch (err) {
    res.json(err);
  }
});

export {
  getTemplateById,
  createEvent,
  deleteTemplate,
  allTemplate,
  singleTemplate,
  createTemplate,
};
