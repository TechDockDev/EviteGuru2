import {
  Grid,
  Button,
  Box,
  Typography,
  IconButton,
  ListItemButton,
  TextField,
} from "@mui/material";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { fabric } from "fabric";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Buffer } from "buffer";
import {
  getSingleTemplate,
  isLoading,
  openSnackbar,
  setEventTemplate,
  setUnsavedStatus,
} from "../../redux/action/userActions";

import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";

import StickersModal from "../CustomizationPage/StickersModal";

import { Constants } from "../../redux/constants/action-types";
import Dialogue from "../CustomizationPage/Dialogue";
import TextTools from "../CustomizationPage/TextTools";
import GroupTools from "../CustomizationPage/Tools";
import AddTools from "../CustomizationPage/AddTools";
import ShapeTools from "../CustomizationPage/ShapeTools";
import { setPageTitle } from "../../redux/action/defaultActions";
const EditDesign = (props) => {
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
  const [dialogueOpen, setDialogueOpen] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const ref = useRef(null);
  const [screenSize, setScreenSize] = useState({
    width: ref?.current?.clientWidth,
    height: ref?.current?.clientHeight,
  });
  console.log("screen=>", screenSize);
  const handleShowDialogue = () => {
    setDialogueOpen(!dialogueOpen);
  };
  const [color, setColor] = useState("#000000");
  const [font, setfont] = useState("Montserrat");
  const { editor, onReady } = useFabricJSEditor();
  const [data, setData] = useState();
  const [templateData, setTemplateData] = useState(null);
  const [addStickersModal, setAddStickersModal] = useState(false);
  const [allImages, setAllImages] = useState([]);
  const [isLandscape, setIsLandscape] = useState(false);
  // ==================================

  // ==================================

  const navigate = useNavigate();
  // =========== 👇 code for draggable tools bar for text edit👆👆=======
  // const [menuPosition, setMenuPosition] = React.useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 50, y: 250 });
  const handleDrag = (_, { x, y }) => {
    setPosition({ x, y });
  };
  // ===========👆 code for draggable tools bar for text edit👆=======

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

  const { templateDetails, userDetail, userEventTemplate, unsaved } =
    useSelector((state) => state);
  console.log("unsaved=>", unsaved);

  // =================== Ading Text Fuc
  const addText = () => {
    const object = new fabric.IText("Text Message", {
      fontFamily: "Helvetica",
      fontSize: 36,
      left: width / 2,
      top: height / 2,
    });
    editor.canvas.add(object);
    // isFormDirty(true);
    editor.canvas.renderAll();
    dispatch(setUnsavedStatus(true));
  };

  // ========This Func is for shape addition ====
  const addShape = (shape) => {
    if (shape === "Line") {
      const line = new fabric.Line([80, 100, 200, 100], {
        stroke: "black",
        strokeWidth: 5,
      });

      // Add the line to the canvas
      editor.canvas.add(line);
      editor?.canvas.renderAll();
      dispatch(setUnsavedStatus(true));
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
      dispatch(setUnsavedStatus(true));
    }
  };
  // =============================================
  // ========= This Func For changing text alignment
  const textAlign = (value) => {
    console.log(value);
    const o = editor?.canvas?.getActiveObject();
    o.set("textAlign", value);
    editor?.canvas.renderAll();
    dispatch(setUnsavedStatus(true));
  };
  // ========= THis Func For Changing TExt Color

  const changeColor = (e) => {
    setColor(e.target.value);
    console.log(e.target.value);
    const o = editor?.canvas?.getActiveObject();
    o.set("fill", e.target.value);
    editor?.setStrokeColor(e.target.value);
    editor?.canvas.renderAll();
    dispatch(setUnsavedStatus(true));
  };

  //   ===========groupselected object to single group ====
  const groupSelectedLayers = () => {
    editor.canvas.getActiveObject().toGroup();
    editor.canvas.renderAll();
    dispatch(setUnsavedStatus(true));
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
    // setGroupCanvas(newGroup);
    console.log("group", newGroup);
    editor.canvas.renderAll();
    dispatch(setUnsavedStatus(true));
  }
  // =================send back=======================
  const moveBackward = () => {
    const myObject = editor.canvas.getActiveObject();
    editor.canvas.sendBackwards(myObject);
    editor.canvas.discardActiveObject();
    dispatch(setUnsavedStatus(true));
  };
  //   ============send forward =============
  const moveForward = () => {
    const myObject = editor.canvas.getActiveObject();
    editor.canvas.bringForward(myObject);
    editor.canvas.discardActiveObject();
    dispatch(setUnsavedStatus(true));
  };
  // =====================================
  // =================move to back back=======================
  const moveToBack = () => {
    const myObject = editor.canvas.getActiveObject();
    editor.canvas.sendToBack(myObject);
    editor.canvas.discardActiveObject();
    dispatch(setUnsavedStatus(true));
  };
  //   ============bring to top =============
  const bringToTop = () => {
    const myObject = editor.canvas.getActiveObject();
    editor.canvas.bringToFront(myObject);
    editor.canvas.renderAll();
    editor.canvas.discardActiveObject();
    dispatch(setUnsavedStatus(true));
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
    dispatch(setUnsavedStatus(true));
  };
  // =====================================================
  // ===========add stickers ============
  const addStickers = (e) => {
    console.log(e.split(`\\`)[e.split("\\").length - 1]);
    // console.log("e=>", e.target);
    fabric.Image.fromURL(
      e,
      (img) => {
        img.scale(0.2);
        img.crossOrigin = "anonymous";
        img.name = e.split(`\\`)[e.split("\\").length - 1];
        editor.canvas.add(img);
        editor.canvas.renderAll();
      },
      {
        left: width / 2,
        top: height / 2,
      }
    );
    dispatch(setUnsavedStatus(true));
  };

  //   ========================font family ===
  const changeFont = (e) => {
    console.log("font working>-");
    const o = editor.canvas.getActiveObject().set("fontFamily", e.target.value);
    setfont(e.target.value);
    console.log("text=>", o);
    editor.canvas.renderAll();
    dispatch(setUnsavedStatus(true));
  };
  // ========================================
  //  ===👇 text style BOLD👇
  const bold = () => {
    if (editor?.canvas?.getActiveObject().fontWeight === "normal") {
      editor?.canvas?.getActiveObject().set("fontWeight", "bold");
      editor?.canvas?.renderAll();
      dispatch(setUnsavedStatus(true));
    } else {
      editor?.canvas?.getActiveObject().set("fontWeight", "normal");
      editor?.canvas?.renderAll();
      dispatch(setUnsavedStatus(true));
    }
  };
  // ===👆 text style BOLD👆
  //  ===👇 text style ITALIC👇
  const italic = () => {
    if (editor?.canvas?.getActiveObject().fontStyle === "normal") {
      editor?.canvas?.getActiveObject().set("fontStyle", "italic");
      editor?.canvas?.renderAll();
      dispatch(setUnsavedStatus(true));
    } else {
      editor?.canvas?.getActiveObject().set("fontStyle", "normal");
      editor?.canvas?.renderAll();
    }
    dispatch(setUnsavedStatus(true));
  };
  // ===👆 text style ITALIC👆
  //  ===👇 text style UNDERLINE👇
  const underline = () => {
    if (editor?.canvas?.getActiveObject().underline) {
      editor?.canvas?.getActiveObject().set("underline", false);
      editor?.canvas?.renderAll();
      dispatch(setUnsavedStatus(true));
    } else {
      editor?.canvas?.getActiveObject().set("underline", true);
      editor?.canvas?.renderAll();
      dispatch(setUnsavedStatus(true));
    }
  };
  // ===👆 text style UNDERLINE👆
  //  ===👇 text style STRIKE THROUGH👇
  const strike = () => {
    if (editor?.canvas?.getActiveObject()) {
      if (editor?.canvas?.getActiveObject().linethrough) {
        editor?.canvas?.getActiveObject().set("linethrough", false);
        editor?.canvas?.renderAll();
        dispatch(setUnsavedStatus(true));
      } else {
        editor?.canvas?.getActiveObject().set("linethrough", true);
        editor?.canvas?.renderAll();
        dispatch(setUnsavedStatus(true));
      }
    } else {
      alert("No object slected");
    }
  };

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
    dispatch(setUnsavedStatus(true));
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
  const updateTemplateData = async () => {
    // console.log("working");
    dispatch(isLoading(true));
    try {
      fabric.Image.prototype.toObject = (function (toObject) {
        return function () {
          return fabric.util.object.extend(toObject.call(this), {
            name: this.name,
            src: `${Constants.IMG_URL}/template/sendImage/${this.name}`,
            crossOrigin: "anonymous",
          });
        };
      })(fabric.Image.prototype.toObject);
      // ================================
      const formData = new FormData();
      allImages.forEach((v) => {
        formData.append("image", v);
      });
      const res = await axios.post(
        `${Constants.URL}/template/saveImage`,
        formData
      );
      // createPreview();
      console.log(res);

      console.log("canvas data", editor?.canvas);
      const json = editor?.canvas?.toJSON();
      const data = JSON.stringify(json);
      const ext = "png";
      const image = editor?.canvas?.toDataURL({
        format: "png",
        quality: 1,
        width: 475,
        height: 600,
        pixelRatio: 3,
        multiplier: 2,
        // enableRetinaScaling: true,
      });
      // ================================
      function dataURLtoFile(dataurl, filename) {
        const uint8Buffer = Buffer.from(dataurl.split(",")[1], "base64");
        console.log("base64=>");
        return new File([uint8Buffer], filename, { type: "image/png" });
      }
      // Usage example:
      var file = dataURLtoFile(image, "previewImage.png");
      // ========================================
      const form = new FormData();
      form.append("variationJson", data);
      form.append("preview", file);
      // console.log("data=>", data, "image Preview =>",file);
      console.log(json);
      const response = await axios.patch(
        `${Constants.URL}/variation/get-variant-by-event/${id}`,
        form
      );
      if (response.status === 200) {
        dispatch(setUnsavedStatus(false));
        dispatch(
          setEventTemplate({
            jsonData: data,
            previewImage: file,
            tempPreviewImage: image,
          })
        );
        dispatch(isLoading(false));
        props.tabChange({}, 1);
        console.log("res===>", response);
        dispatch(openSnackbar(response.data.message, "success"));
      }
    } catch (error) {
      dispatch(isLoading(false));
      console.log("error=>", error);
    }
    // ================================
  };
  // ==================================

  //=================== This Fnc For Adding Extra Image
  const onUploadImage = (e) => {
    console.log("clicked");
    const image = e.target.files[0];
    setAllImages([...allImages, e.target.files[0]]);
    if (image) {
      setImageFunc(URL.createObjectURL(e.target.files[0]), image);
    }
  };
  // ======================
  const setImageFunc = (imgUrl, file) => {
    fabric.Image.fromURL(
      imgUrl,
      (img) => {
        img.scale(0.2);
        img.name = file.name;
        editor.canvas.add(img);
        editor.canvas.renderAll();
      },
      { left: width / 2, top: height / 2 }
    );
  };
  // ======================

  //   ====load canvas from json =====
  const loadCanvasFromJson = () => {
    // let object = new fabric.Canvas("canvas");
    dispatch(isLoading(true));
    editor?.canvas?.clear();
    console.log(templateData);
    if (userEventTemplate?.jsonData) {
      console.log("userEventTemplate=>", userEventTemplate?.jsonData);

      editor?.canvas.loadFromJSON(userEventTemplate?.jsonData);
      editor?.canvas?.renderAll();
      dispatch(isLoading(false));
    } else if (!userEventTemplate?.jsonData && templateData) {
      console.log("!userEventTemplate=> and templateData");
      editor?.canvas.loadFromJSON(templateData);
      editor?.canvas?.renderAll();
      dispatch(isLoading(false));
    }
  };

  // ==================================
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

    // { THis link.Click For Dowload Editd Image , Whene You remove That Commit And that Image will Download}
    link.click();
  };

  //   ============ This Fuc For Delete all deta in render in Fabric
  const removeSelectedObject = () => {
    editor?.canvas?.remove(editor?.canvas?.getActiveObject());
    editor?.canvas?.renderAll();
    dispatch(setUnsavedStatus(true));
  };
  // ==================
  const getTemplate = async () => {
    dispatch(isLoading(true));
    const res = await axios.get(`${Constants.URL}/event/${id}`);
    console.log("editRes=>", res);
    dispatch(getSingleTemplate(res?.data?.event));
    // dispatch(setPageTitle(res?.data?.event?.name));
    dispatch(
      setEventTemplate({
        // tempPreviewImage: res?.data?.event?.variation?.previewImage,
        // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSshrGc3H1tmJPwlIDts0DaK67hMU45v6NH6y_5txdY&s"
        tempPreviewImage:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSshrGc3H1tmJPwlIDts0DaK67hMU45v6NH6y_5txdY&s",
      })
    );
    setTemplateData(JSON.parse(res?.data?.event?.variation?.variationJson));

    dispatch(isLoading(false));
  };
  //  ============================

  // ====handleCancel ====
  const handleCancel = () => {
    navigate("/dashboard/my-events");
  };

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

  // ===========================================
  const handleObjectSelect = (event) => {
    // const selectedObject = event.target;
    // const selectedObject =  editor?.canvas?.getActiveObject();
    console.log("Object Selected:", editor?.canvas?.getActiveObject());
    if (editor?.canvas?.getActiveObject()?.type === "i-text") {
      console.log(
        "fontFamily=>",
        typeof editor?.canvas?.getActiveObject()?.fontFamily
      );
      setfont(editor?.canvas?.getActiveObject()?.fontFamily);
    }

    // Perform any desired actions with the selected object
  };

  const handleNext = () => {
    props.tabChange({}, 1);
  };
  // =endOf handleCancel==
  // ===============
  useEffect(() => {
    getTemplate();
  }, []);
  // =============
  //
  useEffect(() => {
    handleOrientationChange();
    if (templateData !== null) {
      loadCanvasFromJson();
    }
    return () => {
      // loadCanvasFromJson();
      dispatch(setPageTitle(""));
    };
  }, [templateData]);
  // ================
  const handleBeforeUnload = (event) => {
    if (isFormDirty) {
      event.preventDefault();
      event.returnValue = ""; // Required for Chrome and Firefox
    }
  };

  // useEffect(() => {
  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, [isFormDirty]);
  useEffect(() => {
    handleOrientationChange();
    editor?.canvas.on("selection:updated", handleObjectSelect);
    if (isLandscape) {
      document.getElementById("d-parent").style.zoom = "35%";
    }
    window.addEventListener("resize", handleOrientationChange);

    return () => {
      window.removeEventListener("resize", handleOrientationChange);
      // document.getElementById("d-parent").style.zoom = "100%";
    };
  }, []);

  return (
    <>
      {isFormDirty ? alert("are you sure you want to leave this page") : ""}

      <Box overflow={"auto"} p={1} id="d-parent">
        <Grid container sx={{ width: "100%" }}>
          <Grid
            item
            container
            xs={12}
            justifyContent={"space-between"}
            borderBottom={"1px solid black"}
            mb={1}
            id="d-children"
          >
            <AddTools
              addText={addText}
              toggleStickersModal={toggleStickersModal}
              onUploadImage={onUploadImage}
            />
            <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
              <Button
                disableElevation
                variant="outlined"
                onClick={handleCancel}
                sx={{ mr: 1 }}
              >
                Cancel
              </Button>
              <Button
                disableElevation
                variant="outlined"
                disabled={unsaved ? false : true}
                onClick={
                  !userDetail?.isUser
                    ? () => {}
                    : () => {
                        updateTemplateData();
                      }
                }
                sx={{ mr: 1 }}
              >
                Save
              </Button>
              <Button
                disableElevation
                variant="contained"
                disabled={unsaved ? true : false}
                onClick={
                  !userDetail?.isUser
                    ? () => {}
                    : () => {
                        handleNext();
                      }
                }
                sx={{ color: "#fff", ml: 1 }}
              >
                Next
              </Button>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            boxSizing={"border-box"}
            sx={{
              // padding: "20px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              order: { xs: 1, sm: 0 },
              minWidth: "750px",
            }}
          >
            <Box width={"250px"}>
              <ShapeTools addShape={addShape} />
              {console.log("type=>", editor?.canvas?.getActiveObject()?.type)}
              {checkActiveObject(editor?.canvas?.getActiveObject()?.type) ? (
                <Box border={"1px solid #E6E2E2"} mb={1}>
                  <ListItemButton
                    sx={{ ...ListItemButtonStyle3 }}
                    // onClick={changeColor}
                  >
                    <label htmlFor="colorSelector">
                      <Box
                        width={"35px"}
                        height={"35px"}
                        bgcolor={color}
                        border={"2px solid black"}
                        sx={{ borderRadius: "100%", mr: 1 }}
                      />
                      <input
                        id="colorSelector"
                        type="color"
                        value={color}
                        onChange={changeColor}
                        style={{ display: "none" }}
                      />
                    </label>
                    <TextField
                      type="text"
                      size="small"
                      value={color}
                      sx={{ width: "100px", padding: "0px" }}
                      onChange={changeColor}
                    />
                  </ListItemButton>
                </Box>
              ) : (
                ""
              )}

              {editor?.canvas?.getActiveObject() ? (
                ""
              ) : (
                <Box
                  width={"100%"}
                  p={1}
                  border={"1px solid black"}
                  display={"flex"}
                  flexDirection={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <ColorLensOutlinedIcon />
                  <Typography variant="body1" component={"p"} ml={1}>
                    Change your Card’s text, style and more. Add additional text
                    boxes where you want them.
                  </Typography>
                </Box>
              )}

              {/*  👇 edit tools container  👇    */}
              {editor?.canvas?.getActiveObject()?.type === "i-text" && (
                <TextTools
                  changeFont={changeFont}
                  changeColor={changeColor}
                  bold={bold}
                  italic={italic}
                  underline={underline}
                  strike={strike}
                  setfont={setfont}
                  font={font}
                  color={color}
                  textAlign={textAlign}
                />
              )}
              {editor?.canvas?.getActiveObject() && (
                <GroupTools
                  groupSelectedLayers={groupSelectedLayers}
                  groupAllLayers={groupAllLayers}
                  unGroup={unGroup}
                  bringToTop={bringToTop}
                  moveBackward={moveBackward}
                  moveToBack={moveToBack}
                  moveForward={moveForward}
                  clone={clone}
                  removeSelectedObject={removeSelectedObject}
                />
              )}
            </Box>
            {/* 👆 edit tools container 👆   */}
            {/*  👇 image container  👇    */}

            <Box
              sx={{
                // padding: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center",
                width: "100%",
                "& .fabCanvas": {
                  height: "100%",
                  width: "100%",
                },
                "& .upper-canvas": {
                  background: "none",
                },
              }}
            >
              {/* 625 x 875 */}
              <Box
                width={{ md: "475px", sm: "475px", xs: "475px" }}
                height={"600px"}
                ref={ref}
                sx={{ margin: "auto", border: "1px solid black" }}
              >
                <FabricJSCanvas
                  className="fabCanvas"
                  onReady={onReady}
                  width="100%"
                  height="100%"
                />
              </Box>
            </Box>
            {/* 👆 image container 👆   */}
          </Grid>
        </Grid>
        <StickersModal
          open={addStickersModal}
          handleClose={toggleStickersModal}
          addStickers={addStickers}
        />
        <Dialogue open={dialogueOpen} handleClose={handleShowDialogue} />
      </Box>
    </>
  );
};

export default EditDesign;
