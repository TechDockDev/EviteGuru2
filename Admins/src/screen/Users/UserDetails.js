import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Grid, Modal, Paper, Stack, TextField, Typography } from "@mui/material";

const UserDetails = () => {
   const { id } = useParams();
   const [open, setOpen] = useState(false);
   const [user, setUser] = useState();
   const [giftCount, setGiftCount] = useState();
   const [giftType, setGiftType] = useState("Gift Invitees");
   const [totalEvents, setTotalEvents] = useState(0);
   const navigate = useNavigate();
   const getUser = async () => {
      try {
         const res = await axios.get(`/user/${id}`);
         setUser(res.data.user);
         const response = await axios.get(`/events/user/total/${id}`);
         setTotalEvents(response.data.totalEventsByUser);
      } catch (error) {
         console.log(error);
      }
   };
   useEffect(() => {
      getUser();
   }, []);

   const style = {
      color: "#005a75",
      fontWeight: "600",
   };

   const modalStyle = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
   };
   const formStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      borderRadius: "10px",
   };
   const handleClose = () => {
      setOpen(false);
   };
   const gift = async (type) => {
      setGiftType(type);
      setOpen(true);
   };

   const handleGift = async (e) => {
      try {
         e.preventDefault();
         let res;
         if (giftType === "Gift Invitees") {
            res = await axios.patch("/user/gift-invitees", {
               userId: id,
               giftedInvitees: giftCount,
            });
         } else {
            res = await axios.patch("/user/gift-templates", {
               userId: id,
               giftedTemplates: giftCount,
            });
         }
         console.log(res);
         setOpen(false);
      } catch (error) {
         console.log(error);
      }
   };
   const suspendUser = async () => {
      try {
         const res = await axios.patch("/user/suspend", {
            userId: id,
         });
         setUser(res.data.user);

         console.log(res);
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <Stack sx={{padding:"0px 20px"}}>
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
            User details
         </Typography>
         <Paper elevation={3} sx={{ padding: 5 }}>
            <Grid container spacing={2}>
               <Grid item xs={12} sm={3.9}>
                  <Typography sx={style}>Name</Typography>
                  <Typography>{user?.name}</Typography>
               </Grid>
               <Grid item xs={12} sm={3.9}>
                  <Typography sx={style}>Email Address</Typography>
                  <Typography>{user?.email}</Typography>
               </Grid>
               <Grid item xs={12} sm={3.9}>
                  <Typography sx={style}>Phone Number</Typography>
                  <Typography>{user?.phone}</Typography>
               </Grid>
               <Grid item xs={12} sm={3.9}>
                  <Typography sx={style}>Events</Typography>
                  <Typography
                     onClick={() => {
                        navigate(`/admin/events/${user._id}`);
                     }}
                     sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}>
                     {totalEvents}
                  </Typography>
               </Grid>
               <Grid item xs={12} sm={3.9}>
                  <Typography sx={style}>Plan</Typography>
                  <Typography>{user?.subscription?.name}</Typography>
               </Grid>
               <Grid item xs={12} sm={3.9}>
                  <Typography sx={style}>Expiring on</Typography>
                  <Typography>{user?.planEndDate}</Typography>
               </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginTop: "20px" }}>
               <Grid item xs={12} sm={3.9}>
                  <Button disableElevation variant="contained" sx={{ color: "white" }} onClick={() => gift("Gift Invitees")}>
                     Gift Invitees
                  </Button>
               </Grid>
               <Grid item xs={12} sm={3.9}>
                  <Button disableElevation variant="contained" sx={{ color: "white" }} onClick={() => gift("Gift Templates")}>
                     Gift Templates
                  </Button>
               </Grid>
               <Grid item xs={12} sm={3.9}>
                  <Button disableElevation variant="contained" sx={{ color: "white" }} onClick={suspendUser}>
                     {user?.suspended && "un"}suspend User
                  </Button>
               </Grid>
            </Grid>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
               <Box sx={modalStyle}>
                  <form onSubmit={handleGift} style={formStyle}>
                     <TextField type="number" required label={giftType} onChange={(e) => setGiftCount(e.target.value)} />
                     <Button variant="contained" type="submit">
                        {giftType}
                     </Button>
                  </form>
               </Box>
            </Modal>
         </Paper>
         <Button
         onClick={()=>navigate(-1)}
         disableElevation variant="outlined" sx={{mt:2 , width:"fit-content"}} >
              Back       
         </Button>
      </Stack>
   );
};

export default UserDetails;
