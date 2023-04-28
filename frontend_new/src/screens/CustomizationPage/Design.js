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
const Design = () => {
  const outputJson = {
    version: "5.3.0",
    objects: [
      {
        type: "i-text",
        version: "5.3.0",
        originX: "left",
        originY: "top",
        left: 255.75,
        top: 223.84,
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
        type: "group",
        version: "5.3.0",
        originX: "left",
        originY: "top",
        left: 187.07,
        top: 35.38,
        width: 352.45,
        height: 424.91,
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
            type: "group",
            version: "5.3.0",
            originX: "left",
            originY: "top",
            left: -176.23,
            top: -212.45,
            width: 285.84,
            height: 400.18,
            fill: "rgb(0,0,0)",
            stroke: null,
            strokeWidth: 0,
            strokeDashArray: null,
            strokeLineCap: "butt",
            strokeDashOffset: 0,
            strokeLineJoin: "miter",
            strokeUniform: false,
            strokeMiterLimit: 4,
            scaleX: 1.23,
            scaleY: 1.06,
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
                type: "image",
                version: "5.3.0",
                originX: "left",
                originY: "top",
                left: -142.92,
                top: -200.09,
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
                scaleX: 0.19,
                scaleY: 0.19,
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
                src: "blob:http://localhost:3000/b47f15d6-6427-47db-998f-54c9d2c2c7b",
                crossOrigin: null,
                filters: [],
              },
              {
                type: "image",
                version: "5.3.0",
                originX: "left",
                originY: "top",
                left: 64.33,
                top: -173.28,
                width: 624,
                height: 622,
                fill: "rgb(0,0,0)",
                stroke: null,
                strokeWidth: 0,
                strokeDashArray: null,
                strokeLineCap: "butt",
                strokeDashOffset: 0,
                strokeLineJoin: "miter",
                strokeUniform: false,
                strokeMiterLimit: 4,
                scaleX: 0.12,
                scaleY: 0.12,
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
                src: "http://localhost:3000/assets/footerDecoSir.png",
                crossOrigin: null,
                filters: [],
              },
              {
                type: "image",
                version: "5.3.0",
                originX: "left",
                originY: "top",
                left: -140.25,
                top: 79.06,
                width: 624,
                height: 622,
                fill: "rgb(0,0,0)",
                stroke: null,
                strokeWidth: 0,
                strokeDashArray: null,
                strokeLineCap: "butt",
                strokeDashOffset: 0,
                strokeLineJoin: "miter",
                strokeUniform: false,
                strokeMiterLimit: 4,
                scaleX: 0.14,
                scaleY: 0.14,
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
                src: "http://localhost:3000/assets/footerDecoSir.png",
                crossOrigin: null,
                filters: [],
              },
            ],
          },
          {
            type: "i-text",
            version: "5.3.0",
            originX: "left",
            originY: "top",
            left: -88.74,
            top: -9.22,
            width: 305.16,
            height: 40.68,
            fill: "#bc5f45",
            stroke: "#bc5f45",
            strokeWidth: 1,
            strokeDashArray: null,
            strokeLineCap: "butt",
            strokeDashOffset: 0,
            strokeLineJoin: "miter",
            strokeUniform: false,
            strokeMiterLimit: 4,
            scaleX: 0.57,
            scaleY: 0.57,
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
            text: "' शादी, खाना आबादी।",
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
            left: -46.93,
            top: -75.27,
            width: 121.79,
            height: 20.34,
            fill: "#0c101e",
            stroke: "#0c101e",
            strokeWidth: 1,
            strokeDashArray: null,
            strokeLineCap: "butt",
            strokeDashOffset: 0,
            strokeLineJoin: "miter",
            strokeUniform: false,
            strokeMiterLimit: 4,
            scaleX: 0.92,
            scaleY: 1.56,
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
            fontSize: 18,
            text: "आपका स्वागत है",
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
            left: -69.85,
            top: -109.33,
            width: 256.15,
            height: 40.68,
            fill: "#c88073",
            stroke: "#c88073",
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
            fontFamily: "Arial",
            fontWeight: "normal",
            fontSize: 36,
            text: "shaadi samaroh",
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
            left: -89.88,
            top: 38.79,
            width: 420.35,
            height: 135.06,
            fill: "#324a63",
            stroke: "#324a63",
            strokeWidth: 1,
            strokeDashArray: null,
            strokeLineCap: "butt",
            strokeDashOffset: 0,
            strokeLineJoin: "miter",
            strokeUniform: false,
            strokeMiterLimit: 4,
            scaleX: 0.42,
            scaleY: 0.42,
            angle: -5.88,
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
            text: "कोई बहाना अब काम नहीं\nआना आपको सहपरिवार हमारे\nभैया की शादी में पक्का आना।",
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
            left: -61.38,
            top: -34.79,
            width: 280.2,
            height: 40.68,
            fill: "#e87163",
            stroke: "#e87163",
            strokeWidth: 1,
            strokeDashArray: null,
            strokeLineCap: "butt",
            strokeDashOffset: 0,
            strokeLineJoin: "miter",
            strokeUniform: false,
            strokeMiterLimit: 4,
            scaleX: 0.4,
            scaleY: 0.4,
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
            text: "Date: 30-04-2023",
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
    // let object = new fabric.Canvas("canvas");
    editor?.canvas?.loadFromJSON(outputJson, editor?.canvas?.renderAll.bind());
    // Load canvas from JSON
    // object.loadFromJSON(outputJson, function () {
    //   // Callback function that runs after the canvas is loaded
    //   console.log("Canvas loaded from JSON");
    //   editor.canvas.renderAll();
    // });
    editor?.canvas?.renderAll();
  };
  // ==================================
  // =================== This is YOur Handler + Image Downloader
  const downloadImage = (e) => {
    e.preventDefault();
    const ext = "jpg";
    const base64 = editor.canvas.toDataURL({
      format: ext,
      enableRetinaScaling: true,
    });
    const link = document.createElement("a");
    link.href = base64;
    link.download = `eraser_example.${ext}`;
    console.log("Running", base64);
    dispatch(EditTemplate(base64));
    // { THis link.Click For Dowload Editd Image , Whene You remove That Commit And that Image will Download}
    link.click();
  };

  //   ============ This Fuc For Delete all deta in render in Fabric
  const removeSelectedObject = () => {
    editor?.canvas?.remove(editor?.canvas?.getActiveObject());
    editor?.canvas?.renderAll();
  };

  // ===============
  useEffect(() => {
    dispatch(ATemplateDetails(id));
    // _onReady();
    // loadCanvasFromJson();
  }, [dispatch, id]);
  // =============

  useEffect(() => {
    // _onReady(document.getElementsByClassName("fabCanvas")[0]);
    console.log("---->", templateDetails.template);
    loadCanvasFromJson();
  }, [templateDetails]);
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
