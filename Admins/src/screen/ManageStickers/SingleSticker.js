import { Box, Grid, IconButton, Stack, Typography, Modal, Paper, Button } from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
const SingleSticker = ({ sticker, deleteSticker }) => {
   const [deleteModal, setDeleteModal] = useState(false);
   //    =========
   const toggleDeleteModal = () => {
      setDeleteModal(!deleteModal);
   };
   //    =========
   return (
      <>
         <Grid item xs={12} mxs={6} sm={4} md={4} xxmd={3} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
            <Stack sx={{ border: "2px solid #795DA8", borderRadius: "8px", padding: "5px", width: "150px", height: "150px", position: "relative" }}>
               <IconButton
                  onClick={toggleDeleteModal}
                  sx={{
                     position: "absolute",
                     top: "0px",
                     right: "0px",
                     borderRadius: "2px 8px 0px 2px",
                     background: "white",
                     padding: "4px",
                     "&:hover": {
                        color: "#795DA8",
                        background: "white",

                        "& svg": {
                           transition: "all 200ms ease",
                           scale: "1.2",
                        },
                     },
                  }}>
                  <DeleteIcon />
               </IconButton>
               <Box component={"img"} src={`http://192.168.29.249:8085/images/getImage?path=${sticker.image}`} alt="" height={"100%"} />
            </Stack>
            <Typography fontSize={"14px"} fontWeight={"600"} marginY={"5px"}>
               {sticker.name}
            </Typography>
         </Grid>
         {/* ***********  confirm delete modal ************** */}
         <Modal
            open={deleteModal}
            // open={true}
            onClose={toggleDeleteModal}
            closeAfterTransition
            sx={{ bgcolor: "transparent", backdropFilter: "blur(2px)" }}>
            <Paper
               sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: { sm: 400, xs: "90%" },
                  bgcolor: " rgba(133, 103, 157, 0.47)",
                  border: "1px solid white",
                  borderRadius: "20px",
                  p: 5,
                  boxSizing:"border-box"
               }}>
               <Typography
                  variant="h1"
                  sx={{
                     fontSize: "25px",
                     fontWeight: "600",
                     textAlign: "center",
                     color: "white",
                  }}>
                  Delete sticker
               </Typography>
               <Typography
                  sx={{
                     mt: 2,
                     textAlign: "center",
                     color: "white",
                  }}>
                  Are sure you want to delete {sticker.name} ?
               </Typography>
               <Button
                  onClick={() => {
                     deleteSticker(sticker._id);
                     toggleDeleteModal();
                  }}
                  variant="contained"
                  sx={{
                     color: "white",
                     bgcolor: "#3B285B",
                     width: "100%",
                     mt: 2,
                     "&:hover": {
                        scale: "1.02",

                        bgcolor: "#3B285B",
                     },
                  }}
                  disableElevation>
                  Yes
               </Button>
               <Button
                  onClick={toggleDeleteModal}
                  variant="outlined"
                  sx={{
                     color: "white",
                     borderColor: "#3B285B",
                     width: "100%",
                     mt: 2,
                     "&:hover": {
                        scale: "1.02",
                        borderColor: "#3B285B",
                     },
                  }}
                  disableElevation>
                  No
               </Button>
            </Paper>
         </Modal>
      </>
   );
};

export default SingleSticker;
