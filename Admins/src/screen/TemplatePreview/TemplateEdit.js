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
} from "@mui/material";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { fabric } from "fabric";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
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
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import StickersModal from "../StickersModal";
import { useContext } from "react";
import { DataContext } from "../../AppContext";
import { url } from "../../url";

const TemplateEdit = () => {
  const { snackbar } = useContext(DataContext);
  const [allImages, setAllImages] = useState([]);
  const [color, setColor] = useState("");
  const { editor, onReady, selectedObjects } = useFabricJSEditor();
  const [data, setData] = useState();
  const [templateData, setTemplateData] = useState();
  const [addStickersModal, setAddStickersModal] = useState(false);
  const { templateId } = useParams();
  const [templateJson, setTemplateJson] = useState();
  const [selectedFont, setSelectedFont] = useState("Pinyon Script");
  const fonts = [
    "Sacramento",
    "Parisienne",
    "Montserrat",
    "Pinyon Script",
    "Arial",
    "Helvetica",
  ];

  const navigate = useNavigate();
  // ===========👇 Add background IMAGE👇  ===================
  const setBackgroundImage = (e) => {
    const reader = new FileReader();
    setAllImages([...allImages, e.target.files[0]]);
    // set background image options
    var bgImgOptions = {
      // set the background color to white
      backgroundColor: "red",
      // set the scaling mode to "cover"
      backgroundScaleMode: "cover",
    };
    // load the background image
    reader.onload = function (event) {
      var imgObj = new Image();
      imgObj.crossOrigin = "Anonymous";
      imgObj.src = event.target.result;
      imgObj.onload = function () {
        var image = new fabric.Image(imgObj);
        image.name = e.target.files[0].name;
        // set the image as the background of the canvas
        editor?.canvas?.setBackgroundImage(
          image,
          editor.canvas.renderAll.bind(editor.canvas),
          bgImgOptions
        );
      };
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  // ============👆Add background IMAGE👆   =================
  // ==================👇 dynamically getting canvas height and width👇  =========================
  let canvasEl = document.querySelector(".canvas-container");
  let height = canvasEl?.clientHeight;
  let width = canvasEl?.clientWidth;

  // ===========================================

  // ========== Stickers modal ============
  const toggleStickersModal = () => {
    setAddStickersModal(!addStickersModal);
  };
  // ========== For Image Upload ============

  const dispatch = useDispatch();
  const { id } = useParams();

  console.log("id...", id);

  const templateDetails = useSelector((state) => state.templateData);
  // const { template, loading, error } = templateDetails;
  console.log("template data", templateDetails);

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

  // ========= THis Fuc For Changing TExt Color

  const changeColor = (e) => {
    setColor(e.target.value);
    console.log(e.target.value);
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
        editor.canvas.renderAll();
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
    console.log("font working>-");
    setSelectedFont(e.target.value);
    const o = editor.canvas.getActiveObject().set("fontFamily", e.target.value);
    console.log("text=>", o);
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
    console.log("font working>-");
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
    console.log(data);
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
    console.log("data=>", data, "image Preview =>", image);
  };
  // ==================================
  //=================== This Fnc For Adding Extra Image
  const onUploadImage = (e) => {
    const reader = new FileReader();
    setAllImages([...allImages, e.target.files[0]]);
    console.log(e.target.files[0]);
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
    console.log(templateData);
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
    console.log("Running", base64);
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
  }, [templateData]);
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
      console.log(error);
    }
  };

  // =======================================================
  const createPreview = async () => {
    const canvasPng = editor?.canvas.toDataURL({
      format: "png",
      // quality: 0.8,
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
      formData.append("name", "badhiya template");
      formData.append("description", "arre bahut badhiya template");
      formData.append("templateJson", JSON.stringify(editor?.canvas.toJSON()));
      formData.append("previewImage", file);
      const response = await axios.patch(`/template/${templateId}`, formData);
      editor.canvas.clear();
      snackbar(response.data.status, response.data.message);
      navigate("/admin/template-list");
    } catch (error) {
      console.log(error);
    }
  }
  // ===========================================
  const getTemplateJson = async () => {
    try {
      const { data } = await axios.get(`/template/${templateId}`);
      setTemplateJson(data.template.templateJson);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    editor?.canvas?.setDimensions({ height: height, width: width });
  }, [editor]);

  useEffect(() => {
    editor?.canvas.loadFromJSON(templateJson);
  }, [templateJson]);
  useEffect(() => {
    getTemplateJson();
  }, []);

  // =======================================================
  // =======================================================
  // =======================================================
  return (
    <Box paddingX={"10px"} boxSizing={"border-box"}>
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
        Edit Template
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
              <ListItemButton sx={{ ...ListItemButtonStyle3 }} onClick={italic}>
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
              <ListItemButton sx={{ ...ListItemButtonStyle3 }} onClick={strike}>
                <ListItemIcon>
                  <StrikethroughSIcon />
                </ListItemIcon>
              </ListItemButton>
              {/* 👆 Font Style STRIKETHROUGH 👆   */}
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

              {/*  👇==== Add text ====  👇    */}
              <ListItemButton sx={{ ...ListItemButtonStyle }} onClick={addText}>
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
            onClick={uploadImage}
            sx={{ color: "#fff", mt: 2 }}
          >
            Update
          </Button>
          <Button
            fullWidth
            disableElevation
            variant="outlined"
            onClick={() => navigate("/admin/template-list")}
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
            height: "70vh",
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
          <FabricJSCanvas className="fabCanvas" onReady={onReady} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TemplateEdit;

// ***********************************************
// ***********************************************
// ***********************************************
// ***********************************************
// ***********************************************
// ***********************************************
// import React, { useEffect, useState } from "react";
// import { fabric } from "fabric";
// import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
// import axios from "axios";
// import { Buffer } from "buffer";
// import { useParams } from "react-router-dom";

// const TemplateEdit = () => {
//   const { editor, onReady, selectedObjects } = useFabricJSEditor();
//   const [allImages, setAllImages] = useState([]);
//   const [templateJson, setTemplateJson] = useState();
//   const { templateId } = useParams();
//   const onAddCircle = () => {
//     editor?.addCircle();
//   };
//   const onAddRectangle = () => {
//     const rectangle = new fabric.Rect({
//       left: 100,
//       top: 100,
//       width: 200,
//       height: 100,
//     });
//     editor?.canvas?.add(rectangle);
//   };
//   const deleteAll = () => {
//     setAllImages([]);
//     editor?.deleteAll();
//   };
//   const setFillColor = (e) => {
//     editor?.setFillColor(e.target.value);
//   };

//   const addImage = (e) => {
//     const reader = new FileReader();
//     console.log(e.target.files[0]);
//     setAllImages([...allImages, e.target.files[0]]);
//     reader.onload = function (event) {
//       var imgObj = new Image();
//       imgObj.src = event.target.result;
//       imgObj.setAttribute("crossOrigin", "anonymous");
//       imgObj.onload = function () {
//         var image = new fabric.Image(imgObj);
//         editor.canvas.centerObject(image);
//         image.set({
//           scaleX: editor?.canvas.getWidth() / image.width / 2,
//           scaleY: editor?.canvas.getHeight() / image.height / 2,
//           top: 0,
//           left: 0,
//           srcFromAttribute: true,
//         });
//         image.name = e.target.files[0].name;
//         editor.canvas.add(image);
//         editor?.canvas.renderAll();
//       };
//     };
//     reader.readAsDataURL(e.target.files[0]);
//   };
//   const addText = () => {
//     const text = new fabric.Textbox("text", {
//       editable: true,
//     });
//     editor?.canvas?.add(text);
//   };
//   const layerDown = () => {
//     editor?.canvas?.sendBackwards(selectedObjects[0]);
//     editor?.canvas?.sendToBack(selectedObjects[0]);
//     editor?.canvas.discardActiveObject();
//   };
//   const layerUp = () => {
//     console.log(selectedObjects);
//     editor?.canvas?.bringForward(selectedObjects[0]);
//     editor?.canvas?.bringToFront(selectedObjects[0]);
//     editor?.canvas.discardActiveObject();
//   };
//   const deleteSelected = () => {
//     console.log(selectedObjects[0].get("type") === "image");
//     if (selectedObjects[0] && selectedObjects[0].get("type") === "image") {
//       console.log(selectedObjects[0].name);
//       setAllImages(
//         allImages.filter((file) => file.name !== selectedObjects[0].name)
//       );
//     }
//     editor?.deleteSelected();
//   };
//   const setBackgroundImage = (e) => {
//     const reader = new FileReader();
//     setAllImages([...allImages, e.target.files[0]]);
//     // set background image options
//     var bgImgOptions = {
//       // set the background color to white
//       backgroundColor: "red",
//       // set the scaling mode to "cover"
//       backgroundScaleMode: "cover",
//     };
//     // load the background image
//     reader.onload = function (event) {
//       var imgObj = new Image();
//       imgObj.src = event.target.result;
//       imgObj.setAttribute("crossOrigin", "anonymous");
//       imgObj.onload = function () {
//         var image = new fabric.Image(imgObj);
//         image.name = e.target.files[0].name;
//         // set the image as the background of the canvas
//         editor?.canvas?.setBackgroundImage(
//           image,
//           editor.canvas.renderAll.bind(editor.canvas),
//           bgImgOptions
//         );
//       };
//     };
//     reader.readAsDataURL(e.target.files[0]);
//   };
//   const getTemplateJson = async () => {
//     try {
//       const { data } = await axios.get(`/template/${templateId}`);
//       setTemplateJson(data.template.templateJson);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     editor?.canvas?.setDimensions({ height: 600, width: 900 });
//   }, [editor]);

//   useEffect(() => {
//     editor?.canvas.loadFromJSON(templateJson);
//   }, [templateJson]);
//   useEffect(() => {
//     getTemplateJson();
//   }, []);
//   async function saveTemplate(file) {
//     try {
//       fabric.Image.prototype.toObject = (function (toObject) {
//         return function () {
//           return fabric.util.object.extend(toObject.call(this), {
//             name: this.name,
//             src: `http://192.168.29.249:8085/template/sendImage/${this.name}`,
//           });
//         };
//       })(fabric.Image.prototype.toObject);
//       const formData = new FormData();
//       formData.append("name", "badhiya template");
//       formData.append("description", "arre bahut badhiya template hai");
//       formData.append("templateJson", JSON.stringify(editor?.canvas.toJSON()));
//       formData.append("previewImage", file);
//       console.log(formData);
//       const response = await axios.patch(`/template/${templateId}`, formData);
//       console.log(editor?.canvas.toJSON());
//       console.log(response);
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   const uploadImage = async (e) => {
//     try {
//       const formData = new FormData();
//       allImages.forEach((v) => {
//         console.log(v);
//         formData.append("image", v);
//       });
//       const res = await axios.post("/template/saveImage", formData);
//       console.log(res);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const getPreviewImage = async () => {
//     const canvasPng = editor?.canvas.toDataURL({
//       format: "png",
//     });

//     // Making file object from the base64 string
//     function dataURLtoFile(dataurl, filename) {
//       const uint8Buffer = Buffer.from(dataurl.split(",")[1], "base64");
//       return new File([uint8Buffer], filename, { type: "image/png" });
//     }

//     // Usage example:
//     var file = dataURLtoFile(canvasPng, "previewImage.png");
//     saveTemplate(file);
//   };
//   return (
//     <div>
//       <button onClick={onAddCircle}>Add circle</button>
//       <button onClick={onAddRectangle}>Add Rectangle</button>
//       <button onClick={deleteAll}>Delete all</button>
//       <button onClick={addText}>Add Text</button>
//       <button onClick={layerDown}>Layer Down</button>
//       <button onClick={layerUp}>Layer Up</button>
//       <button onClick={deleteSelected}>Delete</button>
//       <button onClick={uploadImage}>Upload Images</button>
//       <button onClick={getPreviewImage}>Preview Image</button>
//       <label htmlFor="img">Add Image</label>
//       <input
//         type="file"
//         id="img"
//         accept="image/png, image/jpeg ,image/jpg"
//         onChange={addImage}
//       ></input>
//       <label htmlFor="img">Add Background Image</label>
//       <input
//         type="file"
//         id="img"
//         accept="image/png, image/jpeg ,image/jpg"
//         crossOrigin="anonymous"
//         onChange={setBackgroundImage}
//       ></input>
//       <label htmlFor="favcolor">Select your favorite color:</label>
//       <input
//         type="color"
//         id="favcolor"
//         name="favcolor"
//         // value=
//         onChange={setFillColor}
//       ></input>
//       <FabricJSCanvas className="sample-canvas" onReady={onReady} />
//     </div>
//   );
// };
// export default TemplateEdit;
