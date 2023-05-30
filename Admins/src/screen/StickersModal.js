import { Box, Menu, MenuItem, Modal, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../AppContext";
import axios from "axios";

const StickersModal = ({ open, handleClose, addStickers }) => {
   const [stickersData, setStickersData] = useState([]);
   const { snackbar } = useContext(DataContext);

   const getStickers = async () => {
      try {
         const { data } = await axios.get("template/stickers");
         setStickersData(data.stickers);
      } catch (error) {
         snackbar("error", error.message);
      }
   };

   console.log(stickersData);

   useEffect(() => {
      getStickers();
   }, []);

   const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: { xs: "85%", sm: "400px" },
      bgcolor: "white",
      boxShadow: 24,
      p: { xs: 2, sm: 4 },
      outline: "none",
      height: "60vh",
      boxSizing: "border-box",
      "& img": {
         boxShadow: "2px 5px 5px grey",
         width: "70px",
         height: "70px",
      },
   };

   return (
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
         <Box sx={style}>
            <Typography variant="h5" fontSize={"20px"} fontWeight={"800"} textAlign={"center"}>
               Select sticker
            </Typography>
            <Stack mt={2} direction={"row"} flexWrap={"wrap"} overflow={"auto"}>
               {stickersData?.map((stkr, index) => {
                  console.log(stkr);
                  
                 return <MenuItem key={index}

                     onClick={(e) => {
                        handleClose();
                        addStickers(e);
                     }}
                     value={`/images/getImage?path=/${stkr?.image}`}>
                     <img alt="image" src={`/images/getImage?path=/${stkr?.image}`} />
                  </MenuItem>;
               })}
            </Stack>
         </Box>
      </Modal>
   );
};

export default StickersModal;
