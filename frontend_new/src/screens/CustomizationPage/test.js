import { Box, Button, Container } from "@mui/material";
import React from "react";
import { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import CropModal from "./CropModal";

const Test = () => {
  const [open, setOpen] = React.useState(false);
  const [imageData, setImageData] = useState({ url: "", file: null });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleShow = (imgUrl) => {
    handleOpen();
  };
  const [zoom, setZoom] = useState(1);
  const [cropper, setCropper] = useState({
    src: null,
    crop: {
      unit: "%",
      x: 0,
      y: 0,
      width: 50,
      height: 50,
    },
  });

  console.log("cropper=>", cropper);
  const [imageRef, setImageRef] = useState(null);

  // const onSelectFile = (e) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     const reader = new FileReader();
  //     reader.addEventListener("load", () =>
  //       setCropper({ ...cropper, src: reader.result })

  //     );
  //     reader.readAsDataURL(e.target.files[0]);
  //   }
  // };
  const handleSelectImage = (e) => {
    const image = e.target.files[0];
    setImageData({ url: URL.createObjectURL(e.target.files[0]), file: image });

    // handleShow(URL.createObjectURL(e.target.files[0]),image);
    handleOpen();
  };

  // If you setState the crop in here you should return false.
  const onImageLoaded = (image) => {
    setImageRef(image);
  };

  const onCropComplete = (crop) => {
    makeClientCrop(crop);
  };

  const onCropChange = (crop, percentCrop) => {
    setCropper({ ...cropper, crop: crop });
  };

  const makeClientCrop = async (crop) => {
    if (imageRef && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(
        imageRef,
        crop,
        "newFile.jpeg"
      );
      setCropper({ ...cropper, croppedImageUrl: croppedImageUrl });
    }
  };

  const getCroppedImg = (image, crop, fileName) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, "image/jpeg");
    });
  };

  const cropNow = async () => {
    console.log("crop=>", cropper);
    const imageData = cropper.src.replace(/^data:image\/\w+;base64,/, "");
    console.log("imgData", imageData);
    const newImage = await getCroppedImg(imageData, cropper.crop);
    console.log("newImage", newImage);
  };

  return (
    <div className="CropperWrapper" style={{ marginTop: "150px" }}>
      <div>
        {/* <input type="file" accept="image/*" onChange={handleSelectImage} /> */}
        <button onClick={handleOpen} >upload image</button>
      </div>
      {/* <Box component={Container} minHeight={"600px"}>
        {cropper?.src && (
          <ReactCrop
            src={cropper.src}
            crop={cropper.crop}
            zoom={zoom}
            ruleOfThirds
            onImageLoaded={onImageLoaded}
            onComplete={onCropComplete}
            onChange={onCropChange}
            keepSelection={true}
            fixedCropAspectRatio={475 / 600} // Set the fixed aspect ratio
            // width={475} // Set the fixed width
            // height={600} // Set the fixed height
            minWidth={475}
            minHeight={600}
            maxWidth={475}
            // maxHeight={600}
            style={{ width: 475, height: 800 }}
          >
            <img alt="Crop" src={cropper.src} />
          </ReactCrop>
        )}
      </Box>
      {cropper?.croppedImageUrl && (
        <img
          alt="Crop"
          style={{ maxWidth: "100%" }}
          src={cropper?.croppedImageUrl}
        />
      )}
      <Button onClick={cropNow}>CROP</Button> */}

      <CropModal open={open} handleClose={handleClose} imageData={imageData} />
    </div>
  );
};

export default Test;

// import { Box, Button, TextField } from "@mui/material";
// import React from "react";
// import { useCallback } from "react";
// import { useState } from "react";
// import Cropper from "react-easy-crop";

// const Test = () => {
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [yourImage, setYourImage] = useState("");

//   const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
//     console.log(croppedArea, croppedAreaPixels);
//   }, []);

//   const handleFileChange = (e) => {
//     setYourImage(URL.createObjectURL(e.target.files[0]));
//   };
//   return (
//     <Box mt={4} sx={{ marginTop: "200px" }}>
//       <TextField type="file" name="file" onChange={handleFileChange} />
//       {yourImage ? (
//         <Box width={"475px"} height={"600px"}>
//           {/* <Cropper
//             style={{ backdrop: "none", height: "600px", width: "452px" }}
//             image={yourImage}
//             crop={crop}
//             zoom={zoom}
//             aspect={4 / 3}
//             onCropChange={setCrop}
//             onCropComplete={onCropComplete}
//             onZoomChange={setZoom}
//             // onMediaLoaded={(mediaSize) => {
//             //   // Adapt zoom based on media size to fit max height
//             //   onZoomChange(CONTAINER_HEIGHT / mediaSize.naturalHeight);
//             // }}
//           /> */}
//           <Button>CROP</Button>
//         </Box>
//       ) : (
//         ""
//       )}
//     </Box>
//   );
// };

// export default Test;
