import {
  Box,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { fabric } from "fabric";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

// ======================================================
const Design = ({ singleTemplateId = "640c73f2a2abbc1f2cd702d8" }) => {
  const [color, setColor] = useState("");
  const { selectedObjects, editor, onReady } = useFabricJSEditor();
  // ==========
  const imageRef = useRef();

  const [singleTemplateData, setSingleTemplateData] = useState({});

  const getPreviewTemplate = async () => {
    if (singleTemplateId !== "") {
      try {
        const res = await axios.get(`template/${singleTemplateId}`);
        setSingleTemplateData(res.data);
        // console.log("singleData->",res.data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  // ===========================

  const _onReady = async (canvas) => {
    // console.log("single template", singleTemplateData.backgroundimage);

    fabric.Image.fromURL(
      // `data:image/*;base64,${singleTemplateData.backgroundimage} `,
      "https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg",
      (img) => {
        // img.scale(0.2);
        // img.absolutePositioned = true
        // img.adjustPosition("center")
        // img.scaleToWidth(750);
        // img.scale(1)

        canvas.set("backgroundImage", img);
        // canvas.backgroundImage = img;

        canvas.renderAll();
        onReady(canvas);
      }
    );
  };

  //   ============
  // const onDelete = () => {
  //    editor?.deleteSelected();
  //    console.log(selectedObjects);
  //  };

  // const renderIcon = (ctx, left, top, styleOverride, fabricObject) => {
  //    var size = 24;
  //    ctx.save();
  //    ctx.translate(left, top);
  //    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
  //    ctx.drawImage(HighlightOffIcon, -size / 2, -size / 2, size, size);
  //    ctx.restore();
  //  };

  // fabric.Object.prototype.controls.deleteControl = new fabric.Control({
  //    x: 0.5,
  //    y: -0.5,
  //    offsetY: 16,
  //    cursorStyle: 'pointer',
  //    mouseUpHandler: onDelete,
  //    render: renderIcon,
  //    cornerSize: 24,
  //  });

  //   ============

  const addText = () => {
    const object = new fabric.IText("Text Message");
    editor.canvas.add(object);
  };

  // const changeColor = (e) => {
  //    setColor(e.target.value);
  //    console.log(color);
  //    const o = editor.canvas.getActiveObject();
  //    o.set("fill", color);
  //    editor?.setStrokeColor(color);
  //    editor.canvas.renderAll();
  // };

  // const addBold = (i) => {
  //    const object = new fabric.IText("Text Message Bold");
  //    object.set("fontWeight", "bold");
  //    editor.canvas.add(object);
  //    editor.canvas.renderAll();
  // };

  // const additalic = (i) => {
  //    const object = new fabric.IText("Text Message Bold");
  //    object.set("fontStyle", "italic");
  //    editor.canvas.add(object);
  //    editor.canvas.renderAll();
  // };

  const onUploadImage = (e) => {
    console.log("clicked");

    imageRef.current.click();

    // console.log(imageRef.current.files[0]);

    const image = imageRef.current?.files[0];
    fabric.Image.fromURL(URL.createObjectURL(image), (img) => {
      img.scale(0.2);
      editor.canvas.add(img);
      editor.canvas.renderAll();
    });
  };

  // const downloadImage = () => {
  //    const ext = "png";
  //    const base64 = editor.canvas.toDataURL({
  //       format: ext,
  //       enableRetinaScaling: true,
  //    });
  //    const link = document.createElement("a");
  //    link.href = base64;
  //    console.log(link.href);
  //    link.download = `eraser_example.${ext}`;
  //    link.click();
  // };

  const removeSelectedObject = () => {
    editor.canvas.remove(editor.canvas.getActiveObject());
  };

  // useEffect(() => {
  //   dispatch(ATemplateDetails(id))
  // }, [id, dispatch])

  // ===============
  useEffect(() => {
    getPreviewTemplate();
    _onReady();
  }, []);

  // ===============

  // =========================================
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
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRight: "2px solid rgba(44, 44, 44, 0.56)",
        }}
      >
        {/*  👇==== input for image upload| not visible on screen  ====  👇    */}
        <TextField type="file" inputRef={imageRef} sx={{ display: "none" }} />
        {/* 👆 ==== input for image upload| not visible on screen  ==== 👆   */}

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
          <ListItemButton
            onClick={onUploadImage}
            disableGutters={true}
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
        </List>
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
          "& .lower-canvas": {
            background: "none",
          },
        }}
      >
        <FabricJSCanvas className="fabCanvas" onReady={_onReady} />
      </Grid>
      {/* 👆 image container 👆   */}
    </Grid>
  );
};

export default Design;
