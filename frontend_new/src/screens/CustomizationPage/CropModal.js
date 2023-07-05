import {
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import React, { useState } from "react";
import { fabric } from "fabric";
import { useEffect } from "react";
import { Buffer } from "buffer";

const CropModal = (props) => {
  let image = null;
  const [file, setFile] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [cropped, setCropped] = useState("");
  const { editor, onReady } = useFabricJSEditor();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 475,
    minHeight: 600,
    bgcolor: "#fff",
    // border: "2px solid #000",
    boxShadow: 24,
    overflow: "auto",
    p: 4,
  };

  const onUploadImage = (url) => {
    console.log("clicked ==>");

    // if (props.imageData && props?.imageData?.url) {
    //   fabric.Image.fromURL(props?.imageData?.url, (img) => {
    //     img.scale(1);
    //     // img.width = "100%";
    //     img.name = props?.imageData?.file.name;
    //     editor.canvas.add(img);
    //     editor.canvas.renderAll.bind(editor.canvas);
    //     editor.canvas.renderAll();
    //   });
    //   setImageLoaded(true);
    //   editor.canvas.renderAll();
    // }
    if (url) {
      fabric.Image.fromURL(url, (img) => {
        img.scale(1);
        // img.width = "100%";
        // img.name = file.name;
        editor.canvas.add(img);
        // editor.canvas.renderAll.bind(editor.canvas);
        editor.canvas.renderAll();
      });
    }
  };
  const handleCropImage = () => {
    const ext = "png";
    image = editor?.canvas?.toDataURL({
      enableRetinaScaling: true,
      format: "png",
      quality: 1,
      width: 475,
      height: 600,
      pixelRatio: 3,
      multiplier: 2,
    });
    setCropped(image);
    // // ================================
    // function dataURLtoFile(dataurl, filename) {
    //   const uint8Buffer = Buffer.from(dataurl.split(",")[1], "base64");
    //   console.log("base64=>");
    //   return new File([uint8Buffer], filename, { type: "image/png" });
    // }
    // Usage example:
    // var file = dataURLtoFile(image, "backgroundImage.png");
    // ========================================
    // console.log("image Preview =>", file);
    // setCropped(file);
    console.log("Running", image);
    // setCropped(true);
    // { THis link.Click For Dowload Editd Image , Whene You remove That Commit And that Image will Download}
  };

  const onfileChange = (e) => {
    setFile(e.target.files[0]);
    onUploadImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={props?.open}
      //   onClose={props?.handleClose}
      sx={{ overflow: "auto" }}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          TransitionComponent: Fade,
        },
      }}
    >
      {/* <Fade in={props?.open}> */}
      <Box sx={style}>
        <Stack direction={"row"} spacing={1}>
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
              width={{ md: "475", sm: "475px", xs: "475px" }}
              height={"600px"}
              // ref={ref}
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
          <Box>
            <Typography>Cropped Image</Typography>
            <Box
              component={"img"}
              src={cropped}
              sx={{
                width: "150px",
                border: "1px solid green",
                height: "250px",
                // bgcolor:"red"
              }}
              alt="new one o"
            />
          </Box>
        </Stack>
        {/* <img src={props?.url} height={"600px"} width={"475px"} /> */}
        <Stack>
          <input type="file" accept="image/*" onChange={onfileChange} />
          <Button onClick={handleCropImage}>Crop</Button>
        </Stack>
      </Box>
      {/* </Fade> */}
    </Modal>
  );
};

export default CropModal;
