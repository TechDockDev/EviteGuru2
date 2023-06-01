import { Box, Button, FormControl, Grid, Stack, TextField, Typography, Modal, Paper } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { DataContext } from "../../AppContext";
import SingleSticker from "./SingleSticker";

const ManageStickers = () => {
   const [stickersData, setStickersData] = useState([]);
   const [imgurl, setImgurl] = useState("");
   const { snackbar } = useContext(DataContext);
   const formData = new FormData();
   const [value, setValue] = useState({ name: "", sticker: "" });
   const onInputChange = (e) => {
      formData.append("name", e.target.value);
      setValue({ ...value, name: e.target.value });
   };

  
   const onFileChange = (e) => {
      const file = e.target.files[0];
      setValue({ ...value, sticker: e.target.files[0] });

      if (file) {
         formData.append("sticker", file);

         const url = URL.createObjectURL(file);
         setImgurl(url);
      }
   };

   const getStickers = async () => {
      try {
         const { data } = await axios.get("template/stickers");
         setStickersData(data.stickers);
      } catch (error) {
         snackbar("error", error.message);
      }
   };

   const uploadSticker = async (e) => {
      e.preventDefault();
      try {
         console.log(formData);
         const formData1 = new FormData();
         formData1.append("name", value.name);
         formData1.append("sticker", value.sticker);
         const { data } = await axios.post("template/addSticker", formData1);
         snackbar(data.status, data.message);
         getStickers();
         setValue({ name: "", sticker: "" });
         setImgurl("");
      } catch (error) {
         snackbar("error", error.message);
      }
   };

   useEffect(() => {
      getStickers();
   }, []);

   const deleteSticker = async (id) => {
      try {
         const { data } = await axios.delete(`/template/sticker/${id}`);
         snackbar(data.status, data.message);
         getStickers();
      } catch (error) {
         snackbar("error", error.message);
      }
   };
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
            }}>
            Manage Stickers
         </Typography>
         {/* ===** 👇 Add a new sticker CONTAINER👇 **=== */}

         <Grid container padding={"20px"} border={"2px solid #795da8"} borderRadius={"8px"}>
            <Grid item xs={12} mb={1}>
               <Typography
                  variant="h1"
                  align="left"
                  fontWeight="800"
                  fontSize={"18px"}
                  mb={2}
                  sx={{
                     color: "#795da8",
                     width: "100%",
                     borderBottom: "1px solid #795da8",
                     paddingBottom: "5px",
                  }}>
                  Add a new sticker
               </Typography>
            </Grid>

            {/* === 👇 UPLOAD STICKERS👇   === */}
            <Grid item xs={12} sm={6}>
               <FormControl component={"form"} fullWidth onSubmit={uploadSticker}>
                  <Stack>
                     <input style={{ border: "1px solid #C4C4C4", padding: "9px 5px", borderRadius: "4px" }} required type="file" name="sticker" accept={"image/*"} crossOrigin="Anonymous" onChange={onFileChange} />
                  </Stack>
                  <TextField required size="small" type="text" name="name" value={value.name} onChange={onInputChange} label="Sticker Name" sx={{ marginY: "20px" }} />
                  {imgurl !== "" && (
                     <Button type="submit" disableElevation variant="contained" sx={{ color: "white", marginBottom: { xs: "20px", sm: "0px" } }}>
                        Upload Sticker
                     </Button>
                  )}
               </FormControl>
            </Grid>
            {/* === 👆 UPLOAD STICKERS👆   === */}
            {/* === 👇 PREVIEW STICKER BEFORE UPLOAD👇   === */}
            <Grid item xs={12} sm={6} display={"flex"} justifyContent={"center"} alignItems={"center"}>
               <Stack sx={{ border: "2px solid #795DA8", borderRadius: "8px", padding: "10px", width: "150px", height: "150px" }}>
                  <Box component={"img"} src={imgurl !== "" ? imgurl : "/assets/imgPlaceholder.svg"} alt="" height={"100%"} />
               </Stack>
            </Grid>
            {/* === 👆 PREVIEW STICKER BEFORE UPLOAD👆   === */}
         </Grid>
         {/* ===** 👆 Add a new sticker CONTAINER👆 **=== */}
         {/* ===** 👇 Available Stickers CONTAINER👇 **=== */}

         <Grid container mt={3} padding={"20px"} border={"2px solid #795da8"} borderRadius={"8px"}>
            <Grid item xs={12} mb={1}>
               <Typography
                  variant="h1"
                  align="left"
                  fontWeight="800"
                  fontSize={"18px"}
                  mb={2}
                  sx={{
                     color: "#795da8",
                     width: "100%",
                     borderBottom: "1px solid #795da8",
                     paddingBottom: "5px",
                  }}>
                  Available Stickers
               </Typography>
            </Grid>
            {stickersData.map((sticker, index) => {
               return <SingleSticker key={index} sticker={sticker} deleteSticker={deleteSticker} />;
            })}
         </Grid>
         {/* ===** 👆 Available Stickers CONTAINER👆 **=== */}
       
      </Box>
   );
};

export default ManageStickers;
