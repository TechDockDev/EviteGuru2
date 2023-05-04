import {
  Box,
  Grid,
  Button,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { fabric } from "fabric";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ATemplateDetails } from "../../redux/action/userAction";
import { EditTemplate } from "../../redux/action/userAction";
import Details from "./Details";
import DeleteIcon from "@mui/icons-material/Delete";
import AddGuests from "./AddGuests";
import FontDownloadIcon from "@mui/icons-material/FontDownload";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import SwapVertRoundedIcon from "@mui/icons-material/SwapVertRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import testOutputObject from "./test";
const Design = () => {
  const testSvg = `<svg
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  version="1.1"
  width="900"
  height="600"
  viewBox="0 0 900 600"
  xml:space="preserve"
>
  <desc>Created with Fabric.js 5.3.0</desc>
  <defs></defs>
  <g transform="matrix(1 0 0 1 1000 496)">
    <image
      style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;"
      xlink:href="https://img.freepik.com/free-photo/abstract-grunge-decorative-relief-navy-blue-stucco-wall-texture-wide-angle-rough-colored-background_1258-28311.jpg?w=2000"
      x="-1000"
      y="-496"
      width="2000"
      height="992"
    ></image>
  </g>
  <g transform="matrix(1 0 0 1 120.5 120.5)">
    <rect
      style="stroke: rgb(0,0,0); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(156,22,22); fill-rule: nonzero; opacity: 1;"
      x="-20"
      y="-20"
      rx="0"
      ry="0"
      width="40"
      height="40"
    />
  </g>
</svg>`;
  const outputJson = {
    version: "5.3.0",
    objects: [
      {
        type: "group",
        version: "5.3.0",
        originX: "left",
        originY: "top",
        left: 229.85,
        top: 38.63,
        width: 332.57,
        height: 465.6,
        fill: "rgb(0,0,0)",
        stroke: null,
        strokeWidth: 0,
        strokeDashArray: null,
        strokeLineCap: "butt",
        strokeDashOffset: 0,
        strokeLineJoin: "miter",
        strokeUniform: false,
        strokeMiterLimit: 4,
        scaleX: 1,
        scaleY: 1,
        angle: 0,
        flipX: false,
        flipY: false,
        opacity: 1,
        shadow: null,
        visible: true,
        backgroundColor: "",
        fillRule: "nonzero",
        paintFirst: "fill",
        globalCompositeOperation: "source-over",
        skewX: 0,
        skewY: 0,
        objects: [
          {
            type: "i-text",
            version: "5.3.0",
            originX: "left",
            originY: "top",
            left: -140.38,
            top: -48.59,
            width: 2,
            height: 40.68,
            fill: "rgb(0,0,0)",
            stroke: null,
            strokeWidth: 1,
            strokeDashArray: null,
            strokeLineCap: "butt",
            strokeDashOffset: 0,
            strokeLineJoin: "miter",
            strokeUniform: false,
            strokeMiterLimit: 4,
            scaleX: 0.84,
            scaleY: 0.84,
            angle: 0,
            flipX: false,
            flipY: false,
            opacity: 1,
            shadow: null,
            visible: true,
            backgroundColor: "",
            fillRule: "nonzero",
            paintFirst: "fill",
            globalCompositeOperation: "source-over",
            skewX: 0,
            skewY: 0,
            fontFamily: "Helvetica",
            fontWeight: "normal",
            fontSize: 36,
            text: "",
            underline: false,
            overline: false,
            linethrough: false,
            textAlign: "left",
            fontStyle: "normal",
            lineHeight: 1.16,
            textBackgroundColor: "",
            charSpacing: 0,
            styles: [],
            direction: "ltr",
            path: null,
            pathStartOffset: 0,
            pathSide: "left",
            pathAlign: "baseline",
          },
          {
            type: "image",
            version: "5.3.0",
            originX: "left",
            originY: "top",
            left: -166.28,
            top: -232.8,
            width: 1500,
            height: 2100,
            fill: "rgb(0,0,0)",
            stroke: null,
            strokeWidth: 0,
            strokeDashArray: null,
            strokeLineCap: "butt",
            strokeDashOffset: 0,
            strokeLineJoin: "miter",
            strokeUniform: false,
            strokeMiterLimit: 4,
            scaleX: 0.22,
            scaleY: 0.22,
            angle: 0,
            flipX: false,
            flipY: false,
            opacity: 1,
            shadow: null,
            visible: true,
            backgroundColor: "",
            fillRule: "nonzero",
            paintFirst: "fill",
            globalCompositeOperation: "source-over",
            skewX: 0,
            skewY: 0,
            cropX: 0,
            cropY: 0,
            src: "blob:http://localhost:3000/7582db07-71a1-4f23-b5aa-5beb9e62a1b6",
            crossOrigin: null,
            filters: [],
          },
          {
            type: "i-text",
            version: "5.3.0",
            originX: "left",
            originY: "top",
            left: -64.35,
            top: -114.48,
            width: 142.08,
            height: 40.68,
            fill: "#e8a496",
            stroke: "#e8a496",
            strokeWidth: 1,
            strokeDashArray: null,
            strokeLineCap: "butt",
            strokeDashOffset: 0,
            strokeLineJoin: "miter",
            strokeUniform: false,
            strokeMiterLimit: 4,
            scaleX: 1,
            scaleY: 1,
            angle: 0,
            flipX: false,
            flipY: false,
            opacity: 1,
            shadow: null,
            visible: true,
            backgroundColor: "",
            fillRule: "nonzero",
            paintFirst: "fill",
            globalCompositeOperation: "source-over",
            skewX: 0,
            skewY: 0,
            fontFamily: "Helvetica",
            fontWeight: "normal",
            fontSize: 36,
            text: "invitation",
            underline: false,
            overline: false,
            linethrough: false,
            textAlign: "left",
            fontStyle: "normal",
            lineHeight: 1.16,
            textBackgroundColor: "",
            charSpacing: 0,
            styles: [],
            direction: "ltr",
            path: null,
            pathStartOffset: 0,
            pathSide: "left",
            pathAlign: "baseline",
          },
          {
            type: "i-text",
            version: "5.3.0",
            originX: "left",
            originY: "top",
            left: -65.97,
            top: 6.3,
            width: 222.1,
            height: 40.68,
            fill: "#ecaa91",
            stroke: "#ecaa91",
            strokeWidth: 1,
            strokeDashArray: null,
            strokeLineCap: "butt",
            strokeDashOffset: 0,
            strokeLineJoin: "miter",
            strokeUniform: false,
            strokeMiterLimit: 4,
            scaleX: 0.64,
            scaleY: 0.64,
            angle: 0,
            flipX: false,
            flipY: false,
            opacity: 1,
            shadow: null,
            visible: true,
            backgroundColor: "",
            fillRule: "nonzero",
            paintFirst: "fill",
            globalCompositeOperation: "source-over",
            skewX: 0,
            skewY: 0,
            fontFamily: "Helvetica",
            fontWeight: "normal",
            fontSize: 36,
            text: "Text Message",
            underline: false,
            overline: false,
            linethrough: false,
            textAlign: "left",
            fontStyle: "normal",
            lineHeight: 1.16,
            textBackgroundColor: "",
            charSpacing: 0,
            styles: [],
            direction: "ltr",
            path: null,
            pathStartOffset: 0,
            pathSide: "left",
            pathAlign: "baseline",
          },
          {
            type: "i-text",
            version: "5.3.0",
            originX: "left",
            originY: "top",
            left: -73.71,
            top: -52.94,
            width: 324.23,
            height: 40.68,
            fill: "rgb(0,0,0)",
            stroke: null,
            strokeWidth: 1,
            strokeDashArray: null,
            strokeLineCap: "butt",
            strokeDashOffset: 0,
            strokeLineJoin: "miter",
            strokeUniform: false,
            strokeMiterLimit: 4,
            scaleX: 0.51,
            scaleY: 0.51,
            angle: 0,
            flipX: false,
            flipY: false,
            opacity: 1,
            shadow: null,
            visible: true,
            backgroundColor: "",
            fillRule: "nonzero",
            paintFirst: "fill",
            globalCompositeOperation: "source-over",
            skewX: 0,
            skewY: 0,
            fontFamily: "Helvetica",
            fontWeight: "normal",
            fontSize: 36,
            text: "venue: Banquet Hall",
            underline: false,
            overline: false,
            linethrough: false,
            textAlign: "left",
            fontStyle: "normal",
            lineHeight: 1.16,
            textBackgroundColor: "",
            charSpacing: 0,
            styles: [],
            direction: "ltr",
            path: null,
            pathStartOffset: 0,
            pathSide: "left",
            pathAlign: "baseline",
          },
        ],
      },
    ],
  };
  const [color, setColor] = useState("");
  const { editor, onReady } = useFabricJSEditor();
  const [data, setData] = useState();
  const [groupCanvas, setGroupCanvas] = useState();
  const [templateData, setTemplateData] = useState();
  const fonts = [
    "Pacifico",
    "VT323",
    "Quicksand",
    "Inconsolata",
    "Arial",
    "Helvetica",
  ];

  // ========== For Image Upload ============
  const imageRef = useRef();

  const dispatch = useDispatch();
  const { id } = useParams();

  const templateDetails = useSelector((state) => state.templateDetails);
  const { template, loading, error } = templateDetails;

  // =========================== Dynamic BackGround Images Render
  const _onReady = () => {
    fabric.Image.fromURL(
      `data:image/*;base64,${templateDetails?.template?.backgroundimage} `,
      (img) => {
        // This is For Image H & W Set
        // img.scale(1);
        // img.set({
        //   width: 200,
        //   height: 600,
        // });
        // editor.canvas.add(img);
        editor.canvas.set("backgroundImage", img);
        editor.canvas?.renderAll();
        // if (canvas) {
        //   fabric?.onReady(canvas);
        // }
      }
    );
  };
  // ====================================

  // ====================================
  // =================== Ading Text Fuc
  const addText = () => {
    const object = new fabric.IText("Text Message", {
      fontFamily: "Helvetica",
      fontSize: 36,
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

  // =========== This Fnc For Changing TExt in Bold
  // const addBold = (i) => {
  //    const object = new fabric.IText("Text Message Bold");
  //    object.set("fontWeight", "bold");
  //    editor.canvas.add(object);
  //    editor.canvas.renderAll();
  // };

  //=================== This Fnc For Changing TExt in Italic
  // const additalic = (i) => {
  //    const object = new fabric.IText("Text Message Bold");
  //    object.set("fontStyle", "italic");
  //    editor.canvas.add(object);
  //    editor.canvas.renderAll();
  // };

  //=================== To Convert Svg
  // const toSVG = () => {
  //     const svg = editor.canvas.toSVG();
  //     console.log(svg);
  //     setData(svg);
  // };

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
    setGroupCanvas(newGroup);
    console.log("group", newGroup);
    editor.canvas.renderAll();
  }
  // =================send back=======================
  const moveBackward = () => {
    const myObject = editor.canvas.getActiveObject();
    editor.canvas.sendBackwards(myObject);
    editor.canvas.discardActiveObject();
  };
  //   ============send forward =============
  const moveForward = () => {
    const myObject = editor.canvas.getActiveObject();
    editor.canvas.bringForward(myObject);
  };
  // =====================================
  // =================move to back back=======================
  const moveToBack = () => {
    const myObject = editor.canvas.getActiveObject();
    editor.canvas.sendToBack(myObject);
  };
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
  //   ========add stickers =======================
  const addStickers = (e) => {
    fabric.Image.fromURL(e.target.value, (img) => {
      img.scale(0.2);
      // img.set({
      //   width: 150,
      //   height: 150
      // });
      editor.canvas.add(img);
      editor.canvas.renderAll();
    });
  };
  // ==============================================
  //   ========================font family ===
  const changeFont = (e) => {
    console.log("font working>-");
    const o = editor.canvas.getActiveObject().set("fontFamily", e.target.value);
    console.log("text=>", o);
    editor.canvas.renderAll();
  };
  // ========================================
  //   ========================font style ===
  const changeFontStyle = (e) => {
    const o = editor.canvas.getActiveObject().set("fontStyle", e.target.value);
    console.log("text=>", o);
    editor.canvas.renderAll();
  };
  // ========================================

  //   ========================font size ===
  const changeFontSize = (e) => {
    console.log("font working>-");
    const o = editor.canvas
      .getActiveObject()
      .set("fontSize", e.target.value * 1);
    editor.canvas.renderAll();
  };
  // ========================================
  //====================To Convert JSON

  const toJSON = () => {
    const json = editor.canvas.toJSON();
    const data = JSON.stringify(json);
    console.log(data);
    setData(data);
  };

  //=================== This Fnc For Adding Extra Image
  const onUploadImage = (e) => {
    console.log("clicked");
    // imageRef.current.click();
    // const image = imageRef.current?.files[0];
    const image = e.target.files[0];
    if (image) {
      // fabric?.Image?.fromURL(
      //   URL.createObjectURL(imageRef?.current?.files[0]),
      //   (img) => {
      //     img.scale(0.2);
      //     // img.set({
      //     //   width: 200,
      //     //   height: 250,
      //     // });
      //     editor?.canvas?.add(img);
      //     editor?.canvas?.renderAll();
      //   }
      // );
      setImageFunc(URL.createObjectURL(e.target.files[0]));
    }
  };
  // ======================
  const setImageFunc = (imgUrl) => {
    fabric.Image.fromURL(imgUrl, (img) => {
      img.scale(0.2);
      // img.set({
      //   width: 150,
      //   height: 150
      // });
      editor.canvas.add(img);
      editor.canvas.renderAll();
    });
  };
  // ======================

  //   ====load canvas from json =====
  const loadCanvasFromJson = () => {
    let object = new fabric.Canvas("canvas");
    editor?.canvas?.loadFromJSON(
      templateData,
      editor?.canvas?.renderAll.bind()
    );
    // Load canvas from JSON
    object.loadFromJSON(templateData, function () {
      // Callback function that runs after the canvas is loaded
      console.log("Canvas loaded from JSON");
      editor.canvas.renderAll();
    });
    editor?.canvas?.renderAll();
    // fabric.loadSVGFromString(testSvg, (objects, options) => {
    //   const svgObject = fabric.util.groupSVGElements(objects, options);
    //   svgObject.selectable = false;
    //   editor.canvas.add(svgObject);

    //   editor.canvas.renderAll();
    // });
  };
  // ==================================
  // =================== This is YOur Handler + Image Downloader
  const downloadImage = (e) => {
    e.preventDefault();
    const ext = "jpg";
    const base64 = editor?.canvas?.toDataURL({
      format: ext,
      enableRetinaScaling: true,
    });
    const link = document.createElement("a");
    link.href = base64;
    link.download = `eraser_example.${ext}`;
    console.log("Running", base64);
    // dispatch(EditTemplate(base64));
    // { THis link.Click For Dowload Editd Image , Whene You remove That Commit And that Image will Download}
    link.click();
  };

  //   ============ This Fuc For Delete all deta in render in Fabric
  const removeSelectedObject = () => {
    editor?.canvas?.remove(editor?.canvas?.getActiveObject());
    editor?.canvas?.renderAll();
  };
  // ==================
  const getTemplate = async () => {
    const s = await axios.get(`/template/`);
    console.log(s.data.template[0].templateJson); //
    console.log("template data=>", s);
    const latest = s?.data?.template.length - 1;
    setTemplateData(s?.data?.template[latest]?.templateJson);
  };
  // ===============
  useEffect(() => {
    // dispatch(ATemplateDetails(id));
    // _onReady();
    // loadCanvasFromJson();
  }, [dispatch, id]);
  // =============

  useEffect(() => {
    // _onReady(document.getElementsByClassName("fabCanvas")[0]);
    getTemplate();
    console.log("---->", templateDetails.template);
    loadCanvasFromJson();
  }, [templateDetails, templateData]);
  // ================

  return (
    <Grid container sx={{ width: "100%" }}>
      {/*  👇 edit tools container  👇    */}

      <Grid
        item
        xl={1.2}
        lg={1.2}
        md={1.2}
        sm={1.2}
        xs={12}
        sx={{
          // padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          //  maxHeight:"500px",
          //  overflowY:"auto"
          // borderRight: "2px solid rgba(44, 44, 44, 0.56)",
        }}
      >
        {/*  👇==== input for image upload| not visible on screen  ====  👇    */}
        {/* <TextField type="file" inputRef={imageRef} sx={{ display: "none" }} /> */}
        {/* 👆 ==== input for image upload| not visible on screen  ==== 👆   */}

        <Stack sx={{ maxHeight: "450px", overflowY: "auto" }}>
          <List
            sx={{
              "& .MuiListItemButton-root": {
                transition: "all .2s ease",
              },
              "& .MuiListItemButton-root:hover": {
                bgcolor: "white",
                scale: ".9",
              },
              "& .MuiListItemButton-root:active": { scale: "1" },
            }}
          >
            {/*  👇==== Add Photo ====  👇    */}

            <input
              accept="image/*"
              style={{ display: "none" }}
              id="raised-button-file"
              type="file"
              onChange={onUploadImage}
            />
            <label htmlFor="raised-button-file">
              <ListItemButton
                // disableGutters={true}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <ListItemIcon
                  sx={{ color: "black", "& svg": { fontSize: "50px" } }}
                >
                  <PhotoCameraIcon />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    sx: { color: "black", fontSize: "12px", fontWeight: "800" },
                  }}
                >
                  Add Photo
                </ListItemText>
              </ListItemButton>
            </label>

            {/* 👆 ==== Add Photo ==== 👆   */}
            {/*  👇==== Add text ====  👇    */}
            <ListItemButton
              sx={{ display: "flex", flexDirection: "column" }}
              onClick={addText}
            >
              <ListItemIcon
                sx={{ color: "black", "& svg": { fontSize: "50px" } }}
              >
                <FormatColorTextIcon />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  sx: { color: "black", fontSize: "12px", fontWeight: "800" },
                }}
              >
                Add Text
              </ListItemText>
            </ListItemButton>
            {/* 👆 ==== Add text ==== 👆   */}
            {/* ===================================== */}
            <ListItemButton
              sx={{ display: "flex", flexDirection: "column" }}
              onClick={changeColor}
            >
              {/* <ListItemIcon
              sx={{ color: "black", "& svg": { fontSize: "50px" } }}
            >
              <FormatColorTextIcon />
            </ListItemIcon> */}
              <input type="color" onChange={changeColor} />
              <ListItemText
                primaryTypographyProps={{
                  sx: { color: "black", fontSize: "12px", fontWeight: "800" },
                }}
              >
                Color
              </ListItemText>
            </ListItemButton>
            {/* ======================================================= */}
            {/* add stickers size  */}
            <ListItemButton sx={{ display: "flex", flexDirection: "column" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Stickers</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={"/assets/leaves2.png"}
                  label="size"
                  size="small"
                  onChange={addStickers}
                >
                  <MenuItem value={"/assets/leaves2.png"}>
                    <img
                      alt="image"
                      src="/assets/leaves2.png"
                      width={"50px"}
                      height={"50px"}
                    />
                  </MenuItem>
                  <MenuItem value={"/assets/heroImage2.png"}>
                    <img
                      alt="image"
                      src="/assets/heroImage2.png"
                      width={"50px"}
                      height={"50px"}
                    />
                  </MenuItem>
                  <MenuItem value={"/assets/leaves3.png"}>
                    <img
                      alt="image"
                      src="/assets/leaves3.png"
                      width={"50px"}
                      height={"50px"}
                    />
                  </MenuItem>
                  <MenuItem value={"/assets/footerDecoSir.png"}>
                    <img
                      alt="image"
                      src="/assets/footerDecoSir.png"
                      width={"50px"}
                      height={"50px"}
                    />
                  </MenuItem>
                </Select>
              </FormControl>
            </ListItemButton>
            {/* ============== */}
            {/* ===================font change===================== */}
            <ListItemButton sx={{ display: "flex", flexDirection: "column" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Fonts</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={"Pacifico"}
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
            {/* ============================ */}
            {/* font style  */}
            <ListItemButton sx={{ display: "flex", flexDirection: "column" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">style</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={"normal"}
                  label="style"
                  size="small"
                  onChange={changeFontStyle}
                >
                  <MenuItem value={"normal"}>Normal</MenuItem>
                  <MenuItem value={"italic"}>Italic</MenuItem>
                  <MenuItem value={"bold"}>Bold</MenuItem>
                  <MenuItem value={"underline"}>Underline</MenuItem>
                </Select>
              </FormControl>
            </ListItemButton>
            {/* ============== */}
            {/* font size  */}
            <ListItemButton sx={{ display: "flex", flexDirection: "column" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Font</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={36}
                  label="size"
                  size="small"
                  onChange={changeFontSize}
                >
                  <MenuItem value={12}>12</MenuItem>
                  <MenuItem value={14}>14</MenuItem>
                  <MenuItem value={16}>16</MenuItem>
                  <MenuItem value={18}>18</MenuItem>
                  <MenuItem value={36}>36</MenuItem>
                  <MenuItem value={48}>48</MenuItem>
                </Select>
              </FormControl>
            </ListItemButton>
            {/* ============== */}
            {/*  👇==== move to top====  👇    */}
            <ListItemButton
              onClick={bringToTop}
              disableGutters={true}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <ListItemIcon
                sx={{ color: "black", "& svg": { fontSize: "50px" } }}
              >
                <ArrowForwardIosRoundedIcon />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  sx: { color: "black", fontSize: "12px", fontWeight: "800" },
                }}
              >
                Bring To TOp
              </ListItemText>
            </ListItemButton>
            {/* 👆 ====move layer in top ==== 👆   */}
            {/*  👇==== move to top====  👇    */}
            <ListItemButton
              onClick={moveToBack}
              disableGutters={true}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <ListItemIcon
                sx={{ color: "black", "& svg": { fontSize: "50px" } }}
              >
                <ArrowBackIosRoundedIcon />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  sx: { color: "black", fontSize: "12px", fontWeight: "800" },
                }}
              >
                Move To Back
              </ListItemText>
            </ListItemButton>
            {/* 👆 ====move layer in top ==== 👆   */}
            {/*  👇==== move to front ====  👇    */}
            <ListItemButton
              onClick={moveForward}
              disableGutters={true}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <ListItemIcon
                sx={{ color: "black", "& svg": { fontSize: "50px" } }}
              >
                <SwapVertRoundedIcon />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  sx: { color: "black", fontSize: "12px", fontWeight: "800" },
                }}
              >
                Forward
              </ListItemText>
            </ListItemButton>
            {/* 👆 ====move layer in front ==== 👆   */}
            {/*  👇==== move layer back  ====  👇    */}
            <ListItemButton
              onClick={moveBackward}
              disableGutters={true}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <ListItemIcon
                sx={{ color: "black", "& svg": { fontSize: "50px" } }}
              >
                <SwapVertRoundedIcon />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  sx: { color: "black", fontSize: "12px", fontWeight: "800" },
                }}
              >
                Backword
              </ListItemText>
            </ListItemButton>
            {/* 👆 ==== move layer back ==== 👆   */}
            {/* ======================================== */}
            <ListItemButton
              sx={{ display: "flex", flexDirection: "column" }}
              onClick={groupSelectedLayers}
            >
              <ListItemIcon
                sx={{ color: "black", "& svg": { fontSize: "50px" } }}
              >
                <ContentCopyIcon />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  sx: { color: "black", fontSize: "12px", fontWeight: "800" },
                }}
              >
                Group
              </ListItemText>
            </ListItemButton>
            {/* ============================ */}
            {/* ======================================== */}
            <ListItemButton
              sx={{ display: "flex", flexDirection: "column" }}
              onClick={groupAllLayers}
            >
              <ListItemIcon
                sx={{ color: "black", "& svg": { fontSize: "50px" } }}
              >
                <ContentCopyRoundedIcon />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  sx: { color: "black", fontSize: "12px", fontWeight: "800" },
                }}
              >
                Merge All
              </ListItemText>
            </ListItemButton>
            {/* ============================ */}
            {/* ======================================== */}
            <ListItemButton
              sx={{ display: "flex", flexDirection: "column" }}
              onClick={unGroup}
            >
              <ListItemIcon
                sx={{ color: "black", "& svg": { fontSize: "50px" } }}
              >
                <CopyAllIcon />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  sx: { color: "black", fontSize: "12px", fontWeight: "800" },
                }}
              >
                UnGroup
              </ListItemText>
            </ListItemButton>
            {/* ============================ */}
            {/* ========add sticker =========== */}
            {/* <Button onClick={addStickers}>add</Button> */}
            {/* ==================================== */}
            {/* ======================================== */}
            <ListItemButton
              sx={{ display: "flex", flexDirection: "column" }}
              onClick={removeSelectedObject}
            >
              <ListItemIcon
                sx={{ color: "black", "& svg": { fontSize: "50px" } }}
              >
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  sx: { color: "black", fontSize: "12px", fontWeight: "800" },
                }}
              >
                Remove
              </ListItemText>
            </ListItemButton>
            {/* ============================ */}
          </List>
        </Stack>
        <Button
          disableElevation
          variant="contained"
          //  onClick={downloadImage}
          onClick={toJSON}
          sx={{ color: "#fff", mt: 2 }}
        >
          Next
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
          padding: "5px",
          width: "100%",
          height: "75vh",
          "& .fabCanvas": {
            height: "100%",
            width: "100%",
            border: "2px solid green",
          },
          "& .upper-canvas": {
            background: "none",
          },
        }}
      >
        <FabricJSCanvas className="fabCanvas" onReady={onReady} />
      </Grid>
      <Grid item xs={12}>
        <Stack direction={"row"} alignItems={"center"} justifyContent={"end"}>
          {/* ======================================== */}
          <ListItemButton
            sx={{ display: "flex", flexDirection: "column" }}
            onClick={downloadImage}
          >
            <ListItemIcon
              sx={{ color: "black", "& svg": { fontSize: "50px" } }}
            >
              <FileDownloadOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{
                sx: { color: "black", fontSize: "12px", fontWeight: "800" },
              }}
            >
              Download
            </ListItemText>
          </ListItemButton>
          {/* ============================ */}
        </Stack>
      </Grid>
      {/* 👆 image container 👆   */}
      {/* <img src="/assets/leaves2.png" /> */}
    </Grid>
  );
};

export default Design;
