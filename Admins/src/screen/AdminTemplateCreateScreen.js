// import axios from "axios";
// import * as React from "react";
// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link as RouterLink, useNavigate } from "react-router-dom";
// import { aCreatetemplate } from "../redux/action/adminAction";

// import {
//   Container,
//   FormControl,
//   Box,
//   Button,
//   Paper,
//   CardMedia,
//   Card,
//   Modal,
// } from "@mui/material";

// import FormLabel from "@mui/material/FormLabel";
// import Input from "@mui/material/Input";
// import Grid from "@mui/material/Grid";
// import Typography from "@mui/material/Typography";
// import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// const AdminTemplateCreateScreen = (props) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const adminLogin = useSelector((state) => state.adminLogin);
//   const { adminInfo, loading, error } = adminLogin;

//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [sampleimage, setSampleimage] = useState("");
//   const [sampleimage1, setSampleimage1] = useState("");
//   const [sampleimage2, setSampleimage2] = useState("");
//   const [sampleimage3, setSampleimage3] = useState("");
//   const [backgroundimage, setBackgroundimage] = useState("");
//   const [imgUrl, setImgUrl] = useState(null);
//   const [imgUrl1, setImgUrl1] = useState(null);
//   const [imgUrl2, setImgUrl2] = useState(null);
//   const [imgUrl3, setImgUrl3] = useState(null);
//   const [imgUrl4, setImgUrl4] = useState(null);

//   const [open, setOpen] = useState(false);
//   const [openTemplatePreviewModal, setOpenTemplatePreviewModal] =
//     useState(false);

//   const toggleTemplatePreviewModal = (e, image) => {
//     if (!openTemplatePreviewModal) {
//       setOpen(image);
//       setOpenTemplatePreviewModal(!openTemplatePreviewModal);
//     } else {
//       setOpen("");
//       setOpenTemplatePreviewModal(!openTemplatePreviewModal);
//     }
//   };
//   const imageHandler = (e) => {
//     setSampleimage(e.target.files[0]);
//     setImgUrl(URL.createObjectURL(e.target.files[0]));
//   };

//   const imageHandler1 = (e) => {
//     setSampleimage1(e.target.files[0]);
//     setImgUrl1(URL.createObjectURL(e.target.files[0]));
//   };

//   const imageHandler2 = (e) => {
//     setSampleimage2(e.target.files[0]);
//     setImgUrl2(URL.createObjectURL(e.target.files[0]));
//     console.log("inside handler", sampleimage2);
//   };

//   const imageHandler3 = (e) => {
//     setSampleimage3(e.target.files[0]);
//     setImgUrl3(URL.createObjectURL(e.target.files[0]));
//   };

//   const imageHandler4 = (e) => {
//     setBackgroundimage(e.target.files[0]);
//     setImgUrl4(URL.createObjectURL(e.target.files[0]));
//   };

//   const submitHandler = (e) => {
//     e.preventDefault();
//     const form = new FormData();
//     form.append("name", name);
//     form.append("description", description);
//     form.append("sampleimage", sampleimage);
//     form.append("sampleimage1", sampleimage1);
//     form.append("sampleimage2", sampleimage2);
//     form.append("sampleimage3", sampleimage3);
//     form.append("backgroundimage", backgroundimage);

//     dispatch(
//       aCreatetemplate(
//         name,
//         description,
//         sampleimage,
//         sampleimage1,
//         sampleimage2,
//         sampleimage3,
//         backgroundimage
//       )
//     );
//     navigate("/admin/template-list");
//     props.showAlertBar("Template is uploaded", "success");
//   };

//   return (
//     <>
//       <Container
//         maxWidth="sm"
//         //  sx={{ border:"1px solid red"}}
//       >
//         {/* <Box
//           sx={{
//             padding: "2px",
//             border: "2px solid purple",
//             borderRadius: "20px",
//             padding: "10px 25px",
//           }}
//         >
//           <Typography
//             variant="h5"
//             sx={{ textAlign: "center", fontWeight: "800", mb: 2 }}
//           >
//             Create Template
//           </Typography>

//           {/* {loadingUpdate && <Loader />}
//     			{errorUpdate && <Message type='error'>{errorUpdate}</Message>} */}

//           {/* {loading ? (
//     				<Loader />
//     			) : error ? (
//     				<Message type='error'>{error}</Message>
//     			) : ( */}
//           {adminInfo ? (
//             <Box component="form" onSubmit={(e) => submitHandler(e)}>
//               <Grid container>
//                 <Grid item xs={12} sx={{ mb: 2 }}>
//                   {/* NAME */}
//                   <FormControl id="name" fullWidth>
//                     {/* <Typography component={"label"} fontWeight="600" htmlFor="name"> Template Name</Typography> */}
//                     <TextField
//                       size="small"
//                       label="Template Name"
//                       id="name"
//                       type="text"
//                       placeholder="Enter name"
//                       value={name}
//                       required
//                       onChange={(e) => setName(e.target.value)}
//                     />
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12} sx={{ mb: 2 }}>
//                   {/* DESCRIPTION */}
//                   <FormControl id="description" fullWidth>
//                     <TextField
//                       size="small"
//                       type="text"
//                       label="Description"
//                       id="description"
//                       placeholder="Enter description"
//                       multiline
//                       maxRows={4}
//                       value={description}
//                       required
//                       onChange={(e) => setDescription(e.target.value)}
//                     />
//                   </FormControl>
//                 </Grid>
//                 {/* ======================================= */}
//                 <Grid
//                   item
//                   container
//                   xs={12}
//                   sx={{ display: "flex", alignItems: "center" }}
//                   mb={2}
//                 >
//                   <Grid item xs={6}>
//                     {/* SAMPLE IMAGE */}
//                     <FormControl id="sampleimage" fullWidth>
//                       {/* <Typography>Main Sample Image</Typography> */}
//                       <TextField
//                         id="sampleimage"
//                         type="file"
//                         label="Sample Image"
//                         InputLabelProps={{ shrink: true }}
//                         onChange={(e) => imageHandler(e)}
//                         required
//                         small="small"
//                         sx={{ mb: 1, mr: 2 }}
//                       />
//                     </FormControl>
//                   </Grid>
//                   {imgUrl ? (
//                     <>
//                       <Grid
//                         item
//                         xs={6}
//                         sx={{
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "center",
//                         }}
//                       >
//                         <Box
//                           onClick={(e) => {
//                             setOpen(e, imgUrl);
//                           }}
//                           component="img"
//                           sx={{
//                             width: "100px",
//                             maxHeight: "100px",
//                             cursor: "pointer",
//                           }}
//                           src={imgUrl}
//                         />
//                       </Grid>
//                       {/* <Button onClick={handleOpen}>View Sample Image</Button> */}
//                       <Modal open={open} onClose={openTemplatePreviewModal}>
//                         <Grid
//                           item
//                           sx={{
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                           }}
//                         >
//                           <Box
//                             component="img"
//                             sx={{
//                               width: "50%",
//                               maxHeight: "50%",
//                             }}
//                             src={imgUrl}
//                           />
//                         </Grid>
//                       </Modal>
//                     </>
//                   ) : (
//                     ""
//                   )}
//                 </Grid>

//                 {/* ======================================= */}

//                 <Grid
//                   item
//                   container
//                   xs={12}
//                   sx={{ display: "flex", alignItems: "center" }}
//                   mb={2}
//                 >
//                   <Grid item xs={6}>
//                     {/* SAMPLE IMAGE 1 */}
//                     <FormControl id="sampleimage1" isRequired>
//                       <TextField
//                         InputLabelProps={{ shrink: true }}
//                         id="sampleimage1"
//                         type="file"
//                         label="Sample Image 1"
//                         required
//                         height="75vp"
//                         width="100%"
//                         small="small"
//                         sx={{ mb: 1, mr: 2 }}
//                         onChange={(e) => imageHandler1(e)}
//                       />
//                     </FormControl>
//                   </Grid>
//                   {imgUrl1 ? (
//                     <Grid
//                       item
//                       xs={6}
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                       }}
//                     >
//                       <Box>
//                         <Box
//                           onClick={() => {
//                             console.log("image preview modal");
//                           }}
//                           component="img"
//                           sx={{
//                             mt: "10px",
//                             width: "100px",
//                             maxHeight: "100px",
//                             cursor: "pointer",
//                           }}
//                           src={imgUrl1}
//                         />
//                       </Box>
//                     </Grid>
//                   ) : (
//                     ""
//                   )}
//                 </Grid>
//                 {/* SAMPLE IMAGE2 ++++++++++++++++++++++++++++++++++++++*/}
//                 <Grid
//                   item
//                   container
//                   xs={12}
//                   sx={{ display: "flex", alignItems: "center" }}
//                   mb={2}
//                 >
//                   <Grid item xs={6}>
//                     <FormControl id="sampleimage2">
//                       <TextField
//                         InputLabelProps={{ shrink: true }}
//                         id="sampleimage2"
//                         type="file"
//                         label="Sample Image 2"
//                         required
//                         height="75vp"
//                         width="100%"
//                         small="small"
//                         sx={{ mb: 1, mr: 2 }}
//                         onChange={(e) => imageHandler2(e)}
//                       />
//                     </FormControl>
//                   </Grid>
//                   {imgUrl2 ? (
//                     <Grid
//                       item
//                       xs={6}
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                       }}
//                     >
//                       <Box>
//                         <Box
//                           onClick={() => {
//                             console.log("image preview modal");
//                           }}
//                           component="img"
//                           s
//                           sx={{
//                             mt: "10px",
//                             width: "100px",
//                             maxHeight: "100px",
//                             cursor: "pointer",
//                           }}
//                           src={imgUrl2}
//                         />
//                       </Box>
//                     </Grid>
//                   ) : (
//                     ""
//                   )}
//                 </Grid>

//                 {/* SAMPLE IMAGE 3 */}
//                 <Grid
//                   item
//                   container
//                   xs={12}
//                   sx={{ display: "flex", alignItems: "center" }}
//                   mb={2}
//                 >
//                   <Grid item xs={6}>
//                     <FormControl id="sampleimage3">
//                       <TextField
//                         InputLabelProps={{ shrink: true }}
//                         type="file"
//                         id="sampleimage3"
//                         label="Sample Image 3"
//                         required
//                         height="100%"
//                         width="100%"
//                         small="small"
//                         sx={{ mb: 1, mr: 2 }}
//                         onChange={(e) => imageHandler3(e)}
//                       />
//                     </FormControl>
//                   </Grid>
//                   {imgUrl3 ? (
//                     <Grid
//                       item
//                       xs={6}
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                       }}
//                     >
//                       <Box
//                         onClick={() => {
//                           console.log("image preview modal");
//                         }}
//                         component="img"
//                         s
//                         sx={{
//                           mt: "10px",
//                           width: "100px",
//                           maxHeight: "100px",
//                           cursor: "pointer",
//                         }}
//                         src={imgUrl3}
//                       />
//                     </Grid>
//                   ) : (
//                     ""
//                   )}
//                 </Grid>

//                 {/* BACKGROUND IMAGE +++++++++++++++++++++++++++++++++++++ */}
//                 <Grid
//                   item
//                   container
//                   xs={12}
//                   sx={{ display: "flex", alignItems: "center" }}
//                   mb={2}
//                 >
//                   <Grid item xs={6}>
//                     <FormControl id="background_image">
//                       <TextField
//                         type="file"
//                         InputLabelProps={{ shrink: true }}
//                         label="Background Image"
//                         required
//                         sx={{ mb: 1, mr: 2 }}
//                         width="100%"
//                         small="small"
//                         onChange={(e) => imageHandler4(e)}
//                       />
//                     </FormControl>
//                   </Grid>
//                   {imgUrl4 ? (
//                     <Grid
//                       item
//                       xs={6}
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                       }}
//                     >
//                       <Box
//                         onClick={() => {
//                           console.log("image preview modal");
//                         }}
//                         component="img"
//                         s
//                         sx={{
//                           mt: "10px",
//                           width: "100px",
//                           maxHeight: "100px",
//                           cursor: "pointer",
//                         }}
//                         src={imgUrl4}
//                       />
//                     </Grid>
//                   ) : (
//                     ""
//                   )}
//                 </Grid>
//               </Grid>
//               <Box textAlign="center" mt={2} mb={2}>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   // isLoading={loading}
//                   sx={{
//                     color: "white",
//                   }}
//                 >
//                   Upload
//                 </Button>
//               </Box>
//             </Box>
//           ) : (
//             <h1>Error</h1>
//           )}
//         {/* </Box> */}
//       </Container>
//     </>
//   );
// };

// export default AdminTemplateCreateScreen;
import React, { useEffect, useState } from "react";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import axios from "axios";

const AdminTemplateCreateScreen = () => {
  const { editor, onReady, selectedObjects } = useFabricJSEditor();
  const [allImages, setAllImages] = useState([]);
  const onAddCircle = () => {
    editor?.addCircle();
  };
  const onAddRectangle = () => {
    // editor?.addRectangle({ border: "0" });
    const rectangle = new fabric.Rect({
      left: 100,
      top: 100,
      width: 200,
      height: 100,
    });
    editor?.canvas?.add(rectangle);
  };
  const deleteAll = () => {
    setAllImages([]);
    editor?.deleteAll();
  };
  const setFillColor = (e) => {
    editor?.setFillColor(e.target.value);
  };

  const addImage = (e) => {
    const reader = new FileReader();
    console.log(e.target.files[0]);
    setAllImages([...allImages, e.target.files[0]]);
    reader.onload = function (event) {
      var imgObj = new Image();
      imgObj.src = event.target.result;
      imgObj.onload = function () {
        var image = new fabric.Image(imgObj);
        editor.canvas.centerObject(image);
        image.set({
          scaleX: editor?.canvas.getWidth() / image.width / 2,
          scaleY: editor?.canvas.getHeight() / image.height / 2,
          top: 0,
          left: 0,
          // originX: "left",
          // originY: "top",
          srcFromAttribute: true,
        });
        image.name = e.target.files[0].name;
        editor.canvas.add(image);
        // image.filters.push(
        //   new fabric.Image.filters.BlendColor({
        //     color: "orange", // change this color to your desired color
        //     mode: "multiply",
        //   })
        // );
        // image.applyFilters();
        // var dataURL = editor?.canvas.toDataURL({
        //   format: "png",
        //   quality: 0.8,
        // });
        // console.log(dataURL);
        editor?.canvas.renderAll();
      };
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const addImagePath = (e) => {
    console.log(URL.createObjectURL(e.target.files[0]));
    fabric.Image.fromURL(
      URL.createObjectURL(e.target.files[0]),
      function (img) {
        var img1 = img.set({
          scaleX: editor?.canvas.getWidth() / img.width / 2,
          scaleY: editor?.canvas.getHeight() / img.height / 2,
          top: 0,
          left: 0,
          originX: "left",
          originY: "top",
          srcFromAttribute: true,
        });
        // img1 = img1.setSourcePath('h');
        editor?.canvas.add(img1);
      }
    );
    // const file = e.target.files[0];
    // const reader = new FileReader();
    // reader.onload = function (event) {
    //   const img = new Image();
    //   img.onload = function () {
    //     const fabricImg = new fabric.Image(img);
    //     editor?.canvas.add(fabricImg);
    //     editor?.canvas.renderAll();
    //   };
    //   img.src = event.target.result;
    // };
    // reader.readAsDataURL(file);
  };

  const addText = () => {
    const text = new fabric.Textbox("text", {
      editable: true,
    });
    editor?.canvas?.add(text);
  };
  const layerDown = () => {
    editor?.canvas?.sendBackwards(selectedObjects[0]);
    editor?.canvas?.sendToBack(selectedObjects[0]);
    editor?.canvas.discardActiveObject();
  };
  const layerUp = () => {
    console.log(selectedObjects);
    editor?.canvas?.bringForward(selectedObjects[0]);
    editor?.canvas?.bringToFront(selectedObjects[0]);
    editor?.canvas.discardActiveObject();
  };
  const deleteSelected = () => {
    console.log(selectedObjects[0].get("type") === "image");
    if (selectedObjects[0] && selectedObjects[0].get("type") === "image") {
      console.log(selectedObjects[0].name);
      setAllImages(
        allImages.filter((file) => file.name !== selectedObjects[0].name)
      );
    }
    editor?.deleteSelected();
  };
  useEffect(() => {
    editor?.canvas?.setDimensions({ height: 600, width: 900 });
    // set background image options
    var bgImgOptions = {
      // set the background color to white
      backgroundColor: "red",
      // set the scaling mode to "cover"
      backgroundScaleMode: "cover",
    };

    // load the background image
    fabric.Image.fromURL(
      "https://thumbs.dreamstime.com/b/landscape-nature-view-background-view-window-landscape-nature-view-background-view-window-wonderful-landscape-121459679.jpg",
      function (img) {
        // set the image as the background of the canvas
        editor?.canvas?.setBackgroundImage(
          img,
          editor.canvas.renderAll.bind(editor.canvas),
          bgImgOptions
        );
      }
    );
  }, [editor]);

  function toSvg() {
    console.log(editor?.canvas.toSVG());
  }
  function toJson() {
    console.log(editor?.canvas.toJSON());
  }
  async function saveTemplate() {
    try {
      fabric.Image.prototype.toObject = (function (toObject) {
        return function () {
          return fabric.util.object.extend(toObject.call(this), {
            name: this.name,
            src: `http://localhost:8085/template/sendImage/${this.name}`,
          });
        };
      })(fabric.Image.prototype.toObject);
      // fabric.Object.prototype.toObject = (function (toObject) {
      //   return function () {
      //     return fabric.util.object.extend(toObject.call(this), {
      //       name: this.name,
      //     });
      //   };
      // })(fabric.Object.prototype.toObject);
      // "assets" + this.getSrc().split(":3000")[1]
      // const response = await axios.post("/template/create", {
      //   name: "badhiya template",
      //   description: "arre bahut badhiya template",
      //   templateJson: JSON.stringify(editor?.canvas.toJSON()),
      // });
      // console.log(response);
      console.log(JSON.stringify(editor?.canvas.toJSON()));
    } catch (error) {
      console.log(error);
    }
  }
  const addImageSomewhere = (e) => {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function (f) {
      var data = f.target.result;
      fabric.Image.fromURL(
        data,
        function (img) {
          var oImg = img
            .set({ left: 0, top: 0, angle: 0, width: 100, height: 100 })
            .scale(0.9);
          editor?.canvas.add(oImg).renderAll();
          var a = editor?.canvas.setActiveObject(oImg);
          var dataURL = editor?.canvas.toDataURL({
            format: "png",
            quality: 0.8,
          });
          var dataURL = editor?.canvas.toDataURL({
            format: "jpg",
            quality: 0.8,
          });
          var dataURL = editor?.canvas.toDataURL({
            format: "jpeg",
            quality: 0.8,
          });
          console.log(dataURL);
        },
        { crossOrigin: "anonymous" }
      );
    };
    reader.readAsDataURL(file);
  };
  const addImageSvg = (e) => {
    console.log(URL.createObjectURL(e.target.files[0]));

    var myImage = new fabric.Image();

    myImage.set("src", URL.createObjectURL(e.target.files[0]));
    editor.canvas.add(myImage);
  };
  const uploadImage = async (e) => {
    try {
      const formData = new FormData();
      allImages.forEach((v) => {
        console.log(v);
        formData.append("image", v);
      });
      const res = await axios.post("/template/saveImage", formData);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const getImages = () => {
    fabric.Object.prototype.toObject = (function (toObject) {
      return function () {
        return fabric.util.object.extend(toObject.call(this), {
          name: this.name,
        });
      };
    })(fabric.Object.prototype.toObject);
    editor?.canvas.loadFromJSON(
      editor?.canvas.toJSON(),
      editor?.canvas.renderAll.bind(editor?.canvas),
      function (o, object) {
        if (object.type == "image") {
          console.log(object.name);
          // const formData = new FormData();
          // formData.append("image", e.target.files[0]);
          // const res = axios.post("/template/saveImage", formData);
          // object.setSrc(url, canvas.renderAll.bind(canvas));
        }
      }
    );
  };
  return (
    <div>
      <button onClick={onAddCircle}>Add circle</button>
      <button onClick={onAddRectangle}>Add Rectangle</button>
      <button onClick={deleteAll}>Delete all</button>
      <button onClick={addText}>Add Text</button>
      <button onClick={layerDown}>Layer Down</button>
      <button onClick={layerUp}>Layer Up</button>
      <button onClick={deleteSelected}>Delete</button>
      <button onClick={toSvg}>To SVG</button>
      <button onClick={toJson}>To JSON</button>
      <button onClick={getImages}>Get Images</button>
      <button onClick={uploadImage}>Upload Images</button>
      <button onClick={saveTemplate}>Save Template</button>
      <label htmlFor="img">Add Image</label>
      <input
        type="file"
        id="img"
        accept="image/png, image/jpeg ,image/jpg"
        onChange={addImage}
      ></input>
      <label htmlFor="img">Add Svg Image</label>
      <input
        type="file"
        id="img"
        // accept="image/png, image/jpeg ,image/jpg"
        accept=".svg"
        onChange={addImageSvg}
      ></input>
      <label htmlFor="img">Add Image Path</label>
      <input
        type="file"
        id="img"
        accept="image/png, image/jpeg ,image/jpg"
        onChange={addImagePath}
      ></input>
      <label htmlFor="img">Add Image from somewhere</label>
      <input
        type="file"
        id="img"
        accept="image/png, image/jpeg ,image/jpg"
        crossOrigin="anonymous"
        onChange={addImageSomewhere}
      ></input>
      <label htmlFor="favcolor">Select your favorite color:</label>
      <input
        type="color"
        id="favcolor"
        name="favcolor"
        // value=
        onChange={setFillColor}
      ></input>
      <FabricJSCanvas className="sample-canvas" onReady={onReady} />
    </div>
  );
};
export default AdminTemplateCreateScreen;
