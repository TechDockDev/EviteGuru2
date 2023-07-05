// import React, { useEffect, useRef } from "react";
// import { fabric } from "fabric";
// import { Box } from "@mui/material";

// const NewTest = () => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const fabricCanvas = new fabric.Canvas(canvas);

//     const resizeCanvas = () => {
//       const container = canvas.parentElement;
//       const width = container.clientWidth;
//       const height = container.clientHeight;

//       // Set canvas dimensions
//       canvas.style.width = `${width}px`;
//       canvas.style.height = `${height}px`;
//       canvas.width = width;
//       canvas.height = height;

//       // Call Fabric.js rendering methods
//       fabricCanvas.setWidth(width);
//       fabricCanvas.setHeight(height);
//       fabricCanvas.renderAll();
//     };

//     // Call resizeCanvas on initial load and whenever the window is resized
//     resizeCanvas();
//     window.addEventListener("resize", resizeCanvas);

//     // Clean up event listener when component unmounts
//     return () => {
//       window.removeEventListener("resize", resizeCanvas);
//       fabricCanvas.dispose();
//     };
//   }, []);

//   return (
//     <>
//       <Box bgcolor={"yellow"} height={"100vh"}>
//         <Box sx={{ width: "50%", height: "50%", border: "1px solid black" }}>
//           <canvas ref={canvasRef} style={{ border: "1px solid red" }} />
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default NewTest;

import { Box, Grid } from "@mui/material";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import React, { useRef, useState } from "react";

const NewTest = () => {
  const ref = useRef(null);

  const [screenSize, setScreenSize] = useState({
    width: ref?.current?.offsetWidth,
    height: ref?.current?.offsetHeight,
  });
  const { editor, onReady } = useFabricJSEditor();
  return (
    <Box width={"100%"}>
      <Grid container>
        <Grid item xs={12} sm={2}></Grid>
        <Grid
          item
          xs={12}
          sm={8}
          sx={{ backgroundImage: "url(/assets/logo-a.svg)" }}
        >
          <Box
            width={{ md: "525px", sm: "80%", xs: "100%" }}
            height={"550px"}
            ref={ref}
            sx={{ margin: "auto", border: "1px solid red" }}
          >
            <FabricJSCanvas
              className="fabCanvas"
              onReady={onReady}
              width="100%"
              height="100%"
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={2}></Grid>
      </Grid>
    </Box>
  );
};

export default NewTest;

// ============important code may be used in future ===========
// const resizeAndRepositionObjects = () => {
//   const scaleFactor = calculateScaleFactor();
//   console.log("scalreFactor=>", scaleFactor);
//   const screenWidth = ref?.current?.clientWidth;
//   const screenHeight = ref?.current?.clientHeight;
//   setScreenSize({
//     width: ref?.current?.clientWidth,
//     height: ref?.current?.clientHeight,
//   });

//   editor?.canvas?.getObjects().forEach((object) => {
//     // Resize object
//     console.log("object=>", object);
//     object.scaleX *= scaleFactor;
//     object.scaleY *= scaleFactor;

//     // Reposition object
//     const left = object.left * scaleFactor;
//     const top = object.top * scaleFactor;
//     console.log("left=>", left, "right:=>", top);
//     const adjustedLeft = (left / screenWidth) * editor?.canvas?.width;
//     const adjustedTop = (top / screenHeight) * editor?.canvas?.height;
//     object.set({ left: adjustedLeft, top: adjustedTop });

//     // Apply changes
//     object.setCoords();
//   });

//   editor?.canvas?.renderAll();
// };

// const calculateScaleFactor = () => {
//   const screenWidth = ref?.current?.clientWidth;
//   const screenHeight = ref?.current?.clientHeight;
//   const canvasWidth = editor?.canvas?.width;
//   const canvasHeight = editor?.canvas?.height;
//   console.log("screenwidth=>", screenWidth, " =>", screenHeight);
//   console.log("canvaswidth=>", canvasWidth, " =>", canvasHeight);

//   const widthScaleFactor = screenWidth / canvasWidth;
//   const heightScaleFactor = screenHeight / canvasHeight;

//   return Math.min(widthScaleFactor, heightScaleFactor);
// };
// const loadSvgAsFabricObjects = (svgData) => {
//   let object = "";
//   fabric.loadSVGFromString(svgData, (objects, options) => {
//     const canvas = new fabric.Canvas();
//     canvas.add(...objects);

//     object = canvas.toJSON();
//     const canvasJson = canvas.toJSON();
//     console.log("canvasJson=>", canvasJson);
//   });
//   return object;
// };
// ============================================================
