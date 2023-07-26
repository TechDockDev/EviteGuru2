import {
  Grid,
  Button,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  IconButton,
  Box,
  Modal,
  TextField,
  ButtonGroup,
} from "@mui/material";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { fabric } from "fabric";
import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Buffer } from "buffer";
import DeleteIcon from "@mui/icons-material/Delete";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { TbTextRecognition } from "react-icons/tb";
import { FaRegObjectGroup } from "react-icons/fa";
import { FaRegObjectUngroup } from "react-icons/fa";
import { BsLayerBackward } from "react-icons/bs";
import { BsLayerForward } from "react-icons/bs";
import { ImMakeGroup } from "react-icons/im";
// import InterestsIcon from "@mui/icons-material/Interests";// icon for add shapes
import ExtensionIcon from "@mui/icons-material/Extension";
import StickersModal from "./StickersModal";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import { DataContext } from "../AppContext";
import { url } from "../url";
import Dialogue from "./Dialogue";
import ShapeTools from "../component/ShapeTools";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
const AdminTemplateCreateScreen = () => {
  const [descModal, setDescModal] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [templateDesc, setTemplateDesc] = useState("");
  const { snackbar } = useContext(DataContext);
  const navigate = useNavigate();
  const ref = useRef(null);
  const [allImages, setAllImages] = useState([]);
  const [color, setColor] = useState("");
  const { editor, onReady, selectedObjects } = useFabricJSEditor();
  const [data, setData] = useState();
  const [templateData, setTemplateData] = useState();
  const [addStickersModal, setAddStickersModal] = useState(false);
  const [selectedFont, setSelectedFont] = useState("Pinyon Script");
  const [dialogueOpen, setDialogueOpen] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const [screenSize, setScreenSize] = useState({
    width: ref?.current?.clientWidth,
    height: ref?.current?.clientHeight,
  });
  console.log("screen=>", screenSize);
  const handleShowDialogue = () => {
    setDialogueOpen(!dialogueOpen);
  };
  const fonts = [
    "Sacramento",
    "Parisienne",
    "Montserrat",
    "Pinyon Script",
    "Arial",
    "Helvetica",
  ];
  // ==================👇 dynamically getting canvas height and width👇  =========================
  let canvasEl = document.querySelector(".canvas-container");
  let height = canvasEl?.clientHeight;
  let width = canvasEl?.clientWidth;
  const checkActiveObject = (shape) => {
    if (
      shape === "circle" ||
      shape === "rect" ||
      shape === "triangle" ||
      shape === "line"
    )
      return true;
    else return false;
  };
  // ===========👇 Add background IMAGE👇  ===================
  const setBackgroundImage = (e) => {
    const reader = new FileReader();
    console.log("imag=>", e.target.files[0].width);
    setAllImages([...allImages, e.target.files[0]]);

    reader.onload = function (event) {
      var imgObj = new Image();
      imgObj.crossOrigin = "Anonymous";
      imgObj.src = event.target.result;
      imgObj.width = width;
      console.log("=>", imgObj.width);
      console.log("allImages=>", allImages);
      const scaleFactor = Math.min(
        width / imgObj.width,
        height / imgObj.height
      );
      // console.log(scaleFactor);

      // imgObj.scale(scaleFactor);

      imgObj.onload = function () {
        var image = new fabric.Image(imgObj);
        image.name = e.target.files[0].name;
        // image.scale(scaleFactor)
        // console.log(height);
        // console.log(width);

        editor?.canvas?.setBackgroundImage(
          image,
          editor.canvas.renderAll.bind(editor.canvas),
          {
            scaleX: editor.canvas.width / image.width,
            scaleY: editor.canvas.height / image.height,
          }
        );
      };
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  // ============👆Add background IMAGE👆   =================
  const addShape = (shape) => {
    if (shape === "Line") {
      const line = new fabric.Line([80, 100, 200, 100], {
        stroke: "black",
        strokeWidth: 5,
      });

      // Add the line to the canvas
      editor.canvas.add(line);
      editor?.canvas.renderAll();
    } else {
      const object = new fabric[shape]({
        // left: 100,
        // top: 100,
        left: width / 2,
        top: height / 2,
        width: shape === "Circle" ? 0 : 200,
        height: shape === "Circle" ? 0 : 100,
        radius: shape === "Circle" ? 50 : 0,
        fill: "black",
      });
      editor.canvas.add(object);
      editor?.canvas.renderAll();
    }
  };
  // ===========================================

  // ========== Stickers modal ============
  const toggleStickersModal = () => {
    setAddStickersModal(!addStickersModal);
  };
  // ========== For Image Upload ============

  const dispatch = useDispatch();
  const { id } = useParams();

  // console.log("id...", id);

  const templateDetails = useSelector((state) => state.templateData);
  // const { template, loading, error } = templateDetails;
  // console.log("template data", templateDetails);

  // =================== Ading Text Fuc
  const addText = () => {
    const object = new fabric.IText("Text Message", {
      fontFamily: "Helvetica",
      fontSize: 36,
      left: width / 2,
      top: height / 2,
    });
    editor.canvas.add(object);
  };
  // ========= This Func For changing text alignment
  const textAlign = (value) => {
    console.log(value);
    const o = editor?.canvas?.getActiveObject();
    o.set("textAlign", value);
    editor?.canvas.renderAll();
  };
  // ========= THis Fuc For Changing TExt Color

  const changeColor = (e) => {
    setColor(e.target.value);
    // console.log(e.target.value);
    const o = editor?.canvas?.getActiveObject();
    o.set("fill", e.target.value);
    editor?.setStrokeColor(e.target.value);
    editor?.canvas.renderAll();
  };

  //   ===========groupselected object to single group ====
  const groupSelectedLayers = () => {
    editor.canvas.getActiveObject().toGroup();
    editor.canvas.renderAll();
  };
  // ====================================================
  // ===============================================
  // Function to group all the polyline objects into single object
  function groupAllLayers() {
    // Get all the objects as selection
    var sel = new fabric.ActiveSelection(editor.canvas.getObjects(), {
      canvas: editor.canvas,
    });

    // Make the objects active
    editor.canvas.setActiveObject(sel);

    // Group the objects
    let newGroup = editor.canvas.getActiveObject().toGroup();
    editor.canvas.renderAll();
  }
  // =================send back=======================
  const moveBackward = () => {
    const myObject = editor.canvas.getActiveObject();
    editor.canvas.sendBackwards(myObject);
    editor.canvas.discardActiveObject();
  };
  // =====================================

  //   ============bring to top =============
  const bringToTop = () => {
    const myObject = editor.canvas.getActiveObject();
    editor.canvas.bringToFront(myObject);
    editor.canvas.renderAll();
  };
  // =====================================
  //   ==================ungroup itetms ================
  const unGroup = () => {
    //  let items = groupCanvas._objects;
    let newItems = editor.canvas.getActiveObject();
    let items = newItems._objects;
    newItems._restoreObjectsState();
    editor.canvas.remove(newItems);
    for (let i = 0; i < items.length; i++) {
      editor.canvas.add(items[i]);
    }

    editor.canvas.renderAll();
  };
  // =====================================================
  // ========add stickers =======================
  const addStickers = (e) => {
    fabric.Image.fromURL(
      e.target.src,
      (img) => {
        img.scale(0.2);
        img.name = decodeURI(
          e.target.src.split("\\")[e.target.src.split("\\").length - 1]
        );
        editor.canvas.add(img);
        // editor.canvas.renderAll();
      },
      {
        left: width / 2,
        top: height / 2,
      }
    );
  };
  // ==============================================
  //   ========================font family ===
  const changeFont = (e) => {
    // console.log("font working>-");
    setSelectedFont(e.target.value);
    const o = editor.canvas.getActiveObject().set("fontFamily", e.target.value);
    // console.log("text=>", o);
    editor.canvas.renderAll();
  };
  // ========================================
  //  ===👇 text style BOLD👇
  const bold = () => {
    if (editor?.canvas?.getActiveObject().fontWeight === "normal") {
      editor?.canvas?.getActiveObject().set("fontWeight", "bold");
      editor?.canvas?.renderAll();
    } else {
      editor?.canvas?.getActiveObject().set("fontWeight", "normal");
      editor?.canvas?.renderAll();
    }
  };
  // ===👆 text style BOLD👆
  //  ===👇 text style ITALIC👇
  const italic = () => {
    if (editor?.canvas?.getActiveObject().fontStyle === "normal") {
      editor?.canvas?.getActiveObject().set("fontStyle", "italic");
      editor?.canvas?.renderAll();
    } else {
      editor?.canvas?.getActiveObject().set("fontStyle", "normal");
      editor?.canvas?.renderAll();
    }
  };
  // ===👆 text style ITALIC👆
  //  ===👇 text style UNDERLINE👇
  const underline = () => {
    if (editor?.canvas?.getActiveObject().underline) {
      editor?.canvas?.getActiveObject().set("underline", false);
      editor?.canvas?.renderAll();
    } else {
      editor?.canvas?.getActiveObject().set("underline", true);
      editor?.canvas?.renderAll();
    }
  };
  // ===👆 text style UNDERLINE👆
  //  ===👇 text style STRIKE THROUGH👇
  const strike = () => {
    if (editor?.canvas?.getActiveObject()) {
      if (editor?.canvas?.getActiveObject().linethrough) {
        editor?.canvas?.getActiveObject().set("linethrough", false);
        editor?.canvas?.renderAll();
      } else {
        editor?.canvas?.getActiveObject().set("linethrough", true);
        editor?.canvas?.renderAll();
      }
    } else {
      alert("No object selected");
    }
  };
  // ===👆 text style STRIKE THROUGH👆
  //   ========================font size ===
  const changeFontSize = (e) => {
    // console.log("font working>-");
    const o = editor.canvas
      .getActiveObject()
      .set("fontSize", e.target.value * 1);
    editor.canvas.renderAll();
  };
  // ========================================
  //  ===👇 Clone Selected object👇
  const clone = () => {
    editor?.canvas?.getActiveObject().clone((cloned) => {
      cloned.set({
        left: cloned.left + 10,
        top: cloned.top + 10,
        evented: true,
      });
      editor?.canvas?.add(cloned);
    });
  };
  // ===👆 Clone Selected object👆
  //====================To Convert JSON

  const toJSON = () => {
    const json = editor.canvas.toJSON();
    const data = JSON.stringify(json);
    // console.log(data);
    setData(data);
  };
  // =====save event template json ====
  const saveTemplateData = () => {
    const json = editor.canvas.toJSON();
    const data = JSON.stringify(json);
    const ext = "png";
    const image = editor?.canvas?.toDataURL({
      format: ext,
      enableRetinaScaling: true,
    });
    // console.log("data=>", data, "image Preview =>", image);
  };
  // ==================================
  //=================== This Fnc For Adding Extra Image
  const onUploadImage = (e) => {
    const reader = new FileReader();
    setAllImages([...allImages, e.target.files[0]]);
    // console.log(e.target.files[0]);
    reader.onload = function (event) {
      var imgObj = new Image();
      imgObj.crossOrigin = "Anonymous";
      imgObj.src = event.target.result;
      imgObj.onload = function () {
        var image = new fabric.Image(imgObj);
        editor.canvas.centerObject(image);
        image.set({
          scaleX: editor?.canvas.getWidth() / image.width / 2,
          scaleY: editor?.canvas.getHeight() / image.height / 2,
          top: 0,
          left: 0,
          srcFromAttribute: true,
        });
        image.name = e.target.files[0].name;
        editor?.canvas.add(image);
        editor?.canvas.renderAll();
      };
    };
    reader.onerror = (err) => console.log(err);
    reader.readAsDataURL(e.target.files[0]);

    // console.log("clicked");
    // const image = e.target.files[0];
    // if (image) {
    //   setImageFunc(URL.createObjectURL(e.target.files[0]));
    // }
  };
  // ======================
  const setImageFunc = (imgUrl) => {
    fabric.Image.fromURL(
      imgUrl,
      (img) => {
        img.scale(0.2);

        editor.canvas.add(img);
        editor.canvas.renderAll();
      },
      { left: width / 2, top: height / 2 }
    );
  };
  // ======================

  //   ====load canvas from json =====
  const loadCanvasFromJson = () => {
    let object = new fabric.Canvas("canvas");
    // console.log(templateData);
    editor?.canvas.loadFromJSON(templateData);
  };
  // ==================================
  // =================== This is YOur Handler + Image Downloader
  const downloadImage = (e) => {
    e.preventDefault();
    const ext = "png";
    const base64 = editor?.canvas?.toDataURL({
      format: ext,
      enableRetinaScaling: true,
    });
    const link = document.createElement("a");
    link.href = base64;
    link.download = `Template_Example.${ext}`;
    // console.log("Running", base64);
    // dispatch(EditTemplate(base64));
    // { THis link.Click For Dowload Editd Image , Whene You remove That Commit And that Image will Download}
    link.click();
  };

  //   ============ This Fuc For Delete all deta in render in Fabric
  const removeSelectedObject = () => {
    if (selectedObjects[0] && selectedObjects[0].get("type") === "image") {
      setAllImages(
        allImages.filter((file) => file.name !== selectedObjects[0].name)
      );
    }
    editor?.canvas?.remove(editor?.canvas?.getActiveObject());
    editor?.canvas?.renderAll();
  };

  useEffect(() => {
    loadCanvasFromJson();
    handleOrientationChange();
  }, [templateData]);
  // ================
  useEffect(() => {
    handleOrientationChange();

    if (isLandscape) {
      document.getElementById("d-parent").style.zoom = "35%";
    }
    window.addEventListener("resize", handleOrientationChange);

    return () => {
      window.removeEventListener("resize", handleOrientationChange);
      // document.getElementById("d-parent").style.zoom = "100%";
    };
  }, []);
  const toggleDescModal = () => {
    setTemplateName("");
    setTemplateDesc("");
    setDescModal(!descModal);
  };

  // ================

  // ===👇 Toolbar button 👇===
  const ListItemButtonStyle = {
    padding: "5px 0px",
    transition: "all 200ms ease",
    border: "1px solid #E6E2E2",
    width: "85px",
    maxWidth: "85px",
    marginY: "8px",
    display: "flex",
    flexDirection: "column",
    "&:hover": {
      bgcolor: "transparent",
      borderColor: "#795DA8",
      "& svg": { color: "#795DA8" },
      "& span": { color: "#795DA8" },
    },
    "&:active": { scale: ".9" },
  };
  // ===👇 Toolbar button type 2 👇===

  const ListItemButtonStyle2 = {
    padding: "0px",
    transition: "all 200ms ease",
    // width: "85px",
    marginY: "8px",
    display: "flex",
    "& svg": {
      fontSize: "25px",
      marginRight: "5px",
    },
    "& span": { fontWeight: "500" },
    "&:hover": {
      bgcolor: "transparent",
      borderColor: "#795DA8",
      "& svg": { color: "#795DA8" },
      "& span": { color: "#795DA8" },
    },
    "&:active": { scale: ".9" },
  };
  // ===👇 TEXT Toolbar button type 3 👇===

  const ListItemButtonStyle3 = {
    padding: "0px",
    transition: "all 200ms ease",
    marginY: "8px",
    display: "flex",
    justifyContent: "center",
    "& .MuiListItemIcon-root": {
      minWidth: "",
    },
    "& svg": {
      fontSize: "25px",
      marginRight: "5px",
    },
    "&:hover": {
      bgcolor: "transparent",
      borderColor: "#795DA8",
      "& svg": { color: "#795DA8" },
      "& span": { color: "#795DA8" },
    },
    "&:active": { scale: ".9" },
  };

  const uploadImage = async (e) => {
    try {
      const formData = new FormData();
      allImages.forEach((v) => {
        formData.append("image", v);
      });
      const res = await axios.post("/template/saveImage", formData);
      createPreview();
      console.log(res);
    } catch (error) {
      // console.log(error);
    }
  };

  // =======================================================
  const createPreview = async () => {
    const canvasPng = editor?.canvas.toDataURL({
      format: "png",
      // quality: 0.8,
      quality: 1,
      width: 475,
      height: 600,
      pixelRatio: 3,
      multiplier: 2,
    });
    function dataURLtoFile(dataurl, filename) {
      const uint8Buffer = Buffer.from(dataurl.split(",")[1], "base64");
      return new File([uint8Buffer], filename, { type: "image/png" });
    }
    // Usage example:
    var file = dataURLtoFile(canvasPng, "previewImage.png");
    saveTemplate(file);
  };

  async function saveTemplate(file) {
    try {
      fabric.Image.prototype.toObject = (function (toObject) {
        return function () {
          return fabric.util.object.extend(toObject.call(this), {
            name: this.name,
            src: `${url}/api/v1/admin/template/sendImage/${this.name}`,
            crossOrigin: "anonymous",
          });
        };
      })(fabric.Image.prototype.toObject);
      const formData = new FormData();

      formData.append("templateJson", JSON.stringify(editor?.canvas.toJSON()));
      formData.append("previewImage", file);
      formData.append("name", templateName);
      formData.append("description", templateDesc);
      const response = await axios.post("/template/create", formData);
      // console.log(editor?.canvas.toJSON());
      snackbar(response.data.status, response.data.message);
      navigate("/admin/template-list");
      editor.canvas.clear();
      toggleDescModal();
    } catch (error) {
      snackbar("error", error.message);
    }
  }

  const handleOrientationChange = () => {
    const isSmallScreen = window.innerWidth < 550; // Adjust the breakpoint as needed
    const isPortrait = window.matchMedia("(orientation: portrait)").matches;
    console.log("windowlenth=>", isSmallScreen, " isPortRait=>", isPortrait);
    if (isSmallScreen) {
      setIsLandscape(true);
      document.getElementById("d-parent").style.zoom = "35%";
      handleShowDialogue();
    } else {
      document.getElementById("d-parent").style.zoom = "100%";
      setIsLandscape(false);
      setDialogueOpen(false);
    }
  };

  // =======================================================
  // =======================================================
  // =======================================================
  return (
    <>
      <Box paddingX={"10px"} boxSizing={"border-box"} id="d-parent">
        <Typography
          variant="h1"
          align="center"
          fontWeight="800"
          fontSize={"28px"}
          mb={2}
          sx={{
            color: "#795da8",
            width: "100%",
          }}
        >
          Create Template
        </Typography>
        {editor?.canvas?.getActiveObject()?.type === "i-text" && (
          <>
            {/*  👇 TOOLS TO EDIT TEXT(VISIBLE WHEN TEXT IS SELECTED)  👇    */}
            <Grid item mt={2} xs={12} overflow={"auto"}>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
                border={"1px solid #E6E2E2"}
                paddingX={"5px"}
                boxSizing={"border-box"}
                width={"100%"}
              >
                {/*  👇 change font type button  👇    */}
                <ListItemButton sx={{ ...ListItemButtonStyle3 }}>
                  <FormControl fullWidth>
                    <InputLabel id="font-family-select-label">Fonts</InputLabel>
                    <Select
                      labelId="font-family-select-label"
                      sx={{ ".MuiSelect-select": { color: "black" } }}
                      id="font-family-select"
                      value={selectedFont}
                      label="Font Family"
                      size="small"
                      onChange={changeFont}
                    >
                      {fonts?.map((font, index) => {
                        return (
                          <MenuItem key={index} value={font}>
                            {font}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </ListItemButton>
                {/* 👆 change font type button 👆   */}
                {/*  👇 change font COLOR button  👇    */}
                <ListItemButton
                  sx={{ ...ListItemButtonStyle3 }}
                  onClick={changeColor}
                >
                  <input type="color" onChange={changeColor} />
                </ListItemButton>
                {/* 👆 change font COLOR button 👆   */}
                {/*  👇 Font Style BOLD  👇    */}
                <ListItemButton sx={{ ...ListItemButtonStyle3 }} onClick={bold}>
                  <ListItemIcon>
                    <FormatBoldIcon />
                  </ListItemIcon>
                </ListItemButton>
                {/* 👆 Font Style BOLD 👆   */}
                {/*  👇 Font Style ITALIC  👇    */}
                <ListItemButton
                  sx={{ ...ListItemButtonStyle3 }}
                  onClick={italic}
                >
                  <ListItemIcon>
                    <FormatItalicIcon />
                  </ListItemIcon>
                </ListItemButton>
                {/* 👆 Font Style ITALIC 👆   */}
                {/*  👇 Font Style UNDERLINE  👇    */}
                <ListItemButton
                  sx={{ ...ListItemButtonStyle3 }}
                  onClick={underline}
                >
                  <ListItemIcon>
                    <FormatUnderlinedIcon />
                  </ListItemIcon>
                </ListItemButton>
                {/* 👆 Font Style UNDERLINE 👆   */}
                {/*  👇 Font Style STRIKETHROUGH  👇    */}
                {/* <ListItemButton
                  sx={{ ...ListItemButtonStyle3 }}
                  onClick={strike}
                >
                  <ListItemIcon>
                    <StrikethroughSIcon />
                  </ListItemIcon>
                </ListItemButton> */}
                {/* 👆 Font Style STRIKETHROUGH 👆   */}
                <ButtonGroup
                  variant="outlined"
                  aria-label="outlined button group"
                  sx={{ marginBottom: "10px" }}
                >
                  <Button onClick={() => textAlign("left")}>
                    <FormatAlignLeftIcon />
                  </Button>
                  <Button onClick={() => textAlign("center")}>
                    <FormatAlignCenterIcon />
                  </Button>
                  <Button onClick={() => textAlign("right")}>
                    <FormatAlignRightIcon />
                  </Button>
                  <Button onClick={() => textAlign("justify")}>
                    <FormatAlignJustifyIcon />
                  </Button>
                </ButtonGroup>
              </Stack>
            </Grid>
            {/* 👆 TOOLS TO EDIT TEXT(VISIBLE WHEN TEXT IS SELECTED) 👆   */}
          </>
        )}

        <Grid container sx={{ width: "100%" }}>
          {/*  👇 edit tools container  👇    */}

          <Grid
            item
            sm={2}
            xs={12}
            boxSizing={"border-box"}
            sx={{
              // padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              boxSizing: "border-box",
              order: { xs: 1, sm: 0 },
              // border: "1px solid green",
            }}
          >
            <Stack
              sx={{
                maxHeight: "450px",
                overflow: "auto",
                width: "100%",
                boxSizing: "border-box",
                "&::-webkit-scrollbar": {
                  width: "8px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#CEC5DC",
                  borderRadius: "4px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#795DA8",
                  borderRadius: "4px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#5a3991",
                  borderRadius: "4px",
                },
              }}
            >
              <List
                disablePadding
                sx={{
                  width: { xs: "1190px", sm: "100%" },
                  display: "flex",
                  flexDirection: { xs: "row", sm: "column" },
                  justifyContent: { xs: "space-around", sm: "center" },
                  alignItems: "center",
                  boxSizing: "border-box",
                  "& .MuiListItemIcon-root": {
                    minWidth: "",
                  },
                }}
              >
                {/*  👇==== Add Background Image ====  👇    */}

                <ListItemButton
                  component={"label"}
                  sx={{
                    ...ListItemButtonStyle,
                  }}
                >
                  <ListItemIcon
                    sx={{ color: "#667087", "& svg": { fontSize: "50px" } }}
                  >
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      type="file"
                      onChange={setBackgroundImage}
                    />
                    <WallpaperIcon />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{
                      sx: {
                        color: "black",
                        fontSize: "12px",
                        fontFamily: "Montserrat",
                        textAlign: "center",
                      },
                    }}
                  >
                    Add Background
                  </ListItemText>
                </ListItemButton>

                {/* 👆 ==== Add Background Image ==== 👆   */}
                {/*  👇==== Add Photo ====  👇    */}

                <ListItemButton
                  component={"label"}
                  sx={{
                    ...ListItemButtonStyle,
                  }}
                >
                  <ListItemIcon
                    sx={{ color: "#667087", "& svg": { fontSize: "50px" } }}
                  >
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      type="file"
                      onChange={onUploadImage}
                    />
                    <InsertPhotoIcon />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{
                      sx: {
                        color: "black",
                        fontSize: "12px",
                        fontFamily: "Montserrat",
                        textAlign: "center",
                      },
                    }}
                  >
                    Image
                  </ListItemText>
                </ListItemButton>

                {/* 👆 ==== Add Photo ==== 👆   */}
                <ShapeTools addShape={addShape} />
                {checkActiveObject(editor?.canvas?.getActiveObject()?.type) ? (
                  <ListItemButton
                    sx={{ ...ListItemButtonStyle3 }}
                    onClick={changeColor}
                  >
                    <input type="color" onChange={changeColor} />
                  </ListItemButton>
                ) : (
                  ""
                )}
                {/*  👇 change font COLOR button  👇    */}

                {/*  👇==== Add text ====  👇    */}
                <ListItemButton
                  sx={{ ...ListItemButtonStyle }}
                  onClick={addText}
                >
                  <ListItemIcon
                    sx={{ color: "#667087", "& svg": { fontSize: "50px" } }}
                  >
                    <TbTextRecognition />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{
                      sx: {
                        color: "black",
                        fontSize: "12px",
                        fontFamily: "Montserrat",
                        textAlign: "center",
                      },
                    }}
                  >
                    Text
                  </ListItemText>
                </ListItemButton>
                {/* 👆 ==== Add text ==== 👆   */}

                {/*  👇==== Stickers ====  👇    */}
                <ListItemButton
                  sx={{ ...ListItemButtonStyle }}
                  onClick={toggleStickersModal}
                >
                  <ListItemIcon
                    sx={{ color: "#667087", "& svg": { fontSize: "50px" } }}
                  >
                    <ExtensionIcon />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{
                      sx: {
                        color: "black",
                        fontSize: "12px",
                        fontFamily: "Montserrat",
                        textAlign: "center",
                      },
                    }}
                  >
                    Stickers
                  </ListItemText>
                </ListItemButton>
                <StickersModal
                  open={addStickersModal}
                  handleClose={toggleStickersModal}
                  addStickers={addStickers}
                />

                {/* 👆 ==== Stickers ==== 👆   */}
                <Stack
                  mt={1}
                  alignItems={"start"}
                  direction={{ xs: "row", sm: "column" }}
                  width={{ xs: "890px", sm: "100%" }}
                >
                  {/*  👇==== Group Selected ====  👇    */}
                  <ListItemButton
                    sx={{ ...ListItemButtonStyle2 }}
                    onClick={groupSelectedLayers}
                  >
                    <ListItemIcon sx={{ color: "#667087" }}>
                      <ImMakeGroup />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{
                        sx: {
                          color: "black",
                          fontSize: "12px",
                          fontFamily: "Montserrat",
                          textAlign: "center",
                        },
                      }}
                    >
                      Group Selected
                    </ListItemText>
                  </ListItemButton>

                  {/* 👆 ==== Group Selected ==== 👆   */}
                  {/*  👇==== GroupAll ====  👇    */}
                  <ListItemButton
                    sx={{ ...ListItemButtonStyle2 }}
                    onClick={groupAllLayers}
                  >
                    <ListItemIcon sx={{ color: "#667087" }}>
                      <FaRegObjectGroup />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{
                        sx: {
                          color: "black",
                          fontSize: "12px",
                          fontFamily: "Montserrat",
                          textAlign: "center",
                        },
                      }}
                    >
                      Group ALL
                    </ListItemText>
                  </ListItemButton>

                  {/* 👆 ==== GroupAll ==== 👆   */}
                  {/*  👇==== UnGroup ====  👇    */}
                  <ListItemButton
                    sx={{ ...ListItemButtonStyle2 }}
                    onClick={unGroup}
                  >
                    <ListItemIcon
                      sx={{ color: "#667087", "& svg": { fontSize: "50px" } }}
                    >
                      <FaRegObjectUngroup />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{
                        sx: {
                          color: "black",
                          fontSize: "12px",
                          fontFamily: "Montserrat",
                          textAlign: "center",
                        },
                      }}
                    >
                      Ungroup
                    </ListItemText>
                  </ListItemButton>

                  {/* 👆 ==== UnGroup ==== 👆   */}
                  {/*  👇==== Bring To Top ====  👇    */}
                  <ListItemButton
                    onClick={bringToTop}
                    sx={{ ...ListItemButtonStyle2 }}
                  >
                    <ListItemIcon sx={{ color: "#667087" }}>
                      <BsLayerForward />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{
                        sx: {
                          color: "black",
                          fontSize: "12px",
                          fontWeight: "800",
                        },
                      }}
                    >
                      Bring To Top
                    </ListItemText>
                  </ListItemButton>

                  {/* 👆 ==== Bring To Top ==== 👆   */}
                  {/*  👇==== move layer back  ====  👇    */}
                  <ListItemButton
                    onClick={moveBackward}
                    sx={{ ...ListItemButtonStyle2 }}
                  >
                    <ListItemIcon sx={{ color: "#667087" }}>
                      <BsLayerBackward />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{
                        sx: {
                          color: "black",
                          fontSize: "12px",
                          fontWeight: "800",
                        },
                      }}
                    >
                      Move to back
                    </ListItemText>
                  </ListItemButton>
                  {/* 👆 ==== move layer back ==== 👆   */}
                  {/*  👇==== Clone Object  ====  👇    */}
                  <ListItemButton
                    onClick={clone}
                    sx={{ ...ListItemButtonStyle2 }}
                  >
                    <ListItemIcon sx={{ color: "#667087" }}>
                      <FileCopyIcon />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{
                        sx: {
                          color: "black",
                          fontSize: "12px",
                          fontWeight: "800",
                        },
                      }}
                    >
                      Clone
                    </ListItemText>
                  </ListItemButton>
                  {/* 👆 ==== Clone Object ==== 👆   */}
                  {/*  👇==== Remove ====  👇    */}
                  <ListItemButton
                    sx={{ ...ListItemButtonStyle2 }}
                    onClick={removeSelectedObject}
                  >
                    <ListItemIcon
                      sx={{ color: "#667087", "& svg": { fontSize: "50px" } }}
                    >
                      <DeleteIcon />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{
                        sx: {
                          color: "black",
                          fontSize: "12px",
                          fontFamily: "Montserrat",
                          textAlign: "center",
                        },
                      }}
                    >
                      Remove
                    </ListItemText>
                  </ListItemButton>
                  {/* 👆 ==== Remove ==== 👆   */}
                </Stack>
              </List>
            </Stack>
            <Button
              fullWidth
              disableElevation
              variant="contained"
              //  onClick={downloadImage}
              // onClick={toJSON}
              onClick={toggleDescModal}
              sx={{ color: "#fff", mt: 2 }}
            >
              Create
            </Button>
            <Button
              onClick={() => navigate(-1)}
              fullWidth
              disableElevation
              variant="outlined"
              // onClick={}
              sx={{ mt: 1 }}
            >
              Cancel
            </Button>
          </Grid>
          {/* 👆 edit tools container 👆   */}
          {/*  👇 image container  👇    */}
          <Grid
            item
            xl={10}
            lg={10}
            md={10}
            sm={10}
            xs={12}
            sx={{
              boxSizing: "border-box",
              //  padding: "5px",
              width: "100%",
              // height: "70vh",
              order: 0,
              paddingX: "5px",
              "& .fabCanvas": {
                height: "100%",
                width: "100%",
                border: "1px solid #795DA8",
                boxSizing: "border-box",
              },
              "& .upper-canvas": {
                background: "none",
              },
            }}
          >
            <Box
              width={{ md: "475px", sm: "475px", xs: "475px" }}
              height={"600px"}
              ref={ref}
              sx={{ margin: "auto", border: "1px solid black" }}
            >
              <FabricJSCanvas className="fabCanvas" onReady={onReady} />
            </Box>
          </Grid>
        </Grid>
      </Box>
      {/* =========== Modal for name and description =========== */}
      <Modal open={descModal} closeAfterTransition>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "white",
            border: "2px solid #795DA8",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                uploadImage();
              }}
            >
              <Grid container sx={{ p: 1 }}>
                <Typography
                  variant="h1"
                  align="center"
                  fontWeight="800"
                  fontSize={"28px"}
                  mb={2}
                  sx={{
                    color: "#795da8",
                    width: "100%",
                  }}
                >
                  Title and Description
                </Typography>
                <Grid item xs={12} sx={{ mb: 4 }}>
                  {/* NAME */}
                  <FormControl fullWidth>
                    <TextField
                      size="small"
                      label="Template Name"
                      type="text"
                      placeholder="Enter template name"
                      value={templateName}
                      required
                      onChange={(e) => setTemplateName(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sx={{ mb: 4 }}>
                  {/* DESCRIPTION */}
                  <FormControl id="description" fullWidth>
                    <TextField
                      size="small"
                      type="text"
                      label="Description"
                      id="description"
                      name="templateDesc"
                      placeholder="Enter description"
                      multiline
                      maxRows={4}
                      value={templateDesc}
                      required
                      onChange={(e) => setTemplateDesc(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Button
                  disableElevation
                  sx={{ m: "auto", color: "white" }}
                  variant="contained"
                  type="submit"
                >
                  Submit
                </Button>
                <Button
                  disableElevation
                  sx={{ m: "auto" }}
                  variant="outlined"
                  onClick={toggleDescModal}
                >
                  Cancel
                </Button>
              </Grid>
            </form>
          </>
        </Box>
      </Modal>
      <Dialogue open={dialogueOpen} handleClose={handleShowDialogue} />
    </>
  );
};

export default AdminTemplateCreateScreen;
