import { Grid, Typography, Stack, Button, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { GetSingleDetails } from "../../oldredux/action/userAction"; 
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Preview = () => {

   const EventDetails = useSelector((state) => state.EventDetails);
   const { events , loading , error } = EventDetails;

   // const templateEdit = useSelector((state) => state.templateEdit);
   // const { temp } = templateEdit

   // console.log('This Is TEmplate',events)
   useEffect(() => {
       console.log('This Is TEmplate',events)
   },[events])
   return (
      <>
         <Stack>
            <Typography variant="h1" fontSize="18px" textAlign="center" fontWeight="bold" mt={1} mb={1}>
               Here is a sample of how your email will appear in your recipient's inbox.
            </Typography>
            <Grid
               container
               sx={{
                  border: "1px solid black",
                  borderRadius: "4px",
               }}>
               {/* == 👇 Preview header container | From & Sender Name👇  ==*/}
               <Grid item xl={12} lg={12} md={12} sm={12} xs={12} p={1} borderBottom="1px solid black">
                  <Typography fontSize="14px" fontWeight="bold">
                     From :{" "}
                     <Typography component="span" fontSize="14px" fontWeight="normal" p={1}>
                        Sunder Bandar
                        {/* {event.host_name} */}
                     </Typography>
                  </Typography>
                  <Typography fontSize="14px" fontWeight="bold">
                     Event Name :{" "}
                     <Typography component="span" fontSize="14px" fontWeight="normal" p={1}>
                        Sunder ki shadi 
                        {/* {event.event_name} */}
                     </Typography>
                  </Typography>
               </Grid>
               {/* == 👆 Preview header container  | From & Sender Name👆   ==*/}
               {/* =================== */}
               {/* == 👇 Preview main section container |  Description and preview image 👇  ==*/}
               <Grid item container xl={12} lg={12} md={12} sm={12} xs={12} p={1} sx={{ display: "flex", justifyContent: "center" }}>
                  {/* 👇 Description 👇 */}
                  <Grid
                     item
                     xl={4}
                     lg={4}
                     md={5}
                     sm={10}
                     xs={10}
                     p={1}
                     m={2}
                     // border="1px solid green"
                  >
                     <Typography fontSize="14px" fontWeight="normal" textAlign={"center"}>
                        {/* dynamic host name */}
                        <Typography component="span" display="block" fontSize="14px" fontWeight="bold">
                           Sunder Gounder{" "}
                           {/* {event.host_name}{" "} */}
                        </Typography>
                        {/* dynamic host name */}
                        sent you an invitation for
                        {/* dynamic event name */}
                        <Typography component="span" display="block" fontSize="14px" fontWeight="bold">
                           Sunder ki shadi
                           {/* {event.event_name} */}
                        </Typography>
                        {/* dynamic event name */}
                        on
                        {/* dynamic event date and time */}
                        <Typography component="span" display="block" fontSize="14px" fontWeight="bold">
                           Wenesday, March 8, 2023
                           {/* Date {event.date} , Time {event.time} */}
                        </Typography>
                        {/* dynamic event date and time */}
                     </Typography>
                  </Grid>
                  {/* 👆 Description 👆 */}

                  {/* == 👇 Template preview button and image 👇  ==*/}
                  <Grid item container xl={12} lg={12} md={12} sm={12} xs={12} p={1} sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                     <Button variant="contained" sx={{ color: "white", mb: 3 }} disableElevation={true}>
                        Open Preview
                     </Button>
                     <Box component={"img"} src={"https://images.greetingsisland.com/images/invitations/wedding/previews/ivy-and-sage_3.png?auto=format,compress&w=440"} alt="" sx={{ width: "70%", border: "1px solid green", height: "400px" }} />
                     <Typography fontSize="12px" fontWeight="bold" mt={2}>
                        This email is personalized for you. Please do not forward
                     </Typography>
                  </Grid>
                  {/* == 👆 Template preview button and image 👆   ==*/}
                  {/* 👇 Bottom address details 👇 */}
                  <Grid
                     item
                     xl={4}
                     lg={4}
                     md={5}
                     sm={10}
                     xs={10}
                     p={1}
                     m={2}
                     // border="1px solid green"
                  >
                     {/* dynamic venue address and date time */}

                     <Typography fontSize="14px" fontWeight="normal" textAlign={"center"}>
                        the oberoi,the oberoi, chandigarh
                        {/* Venue Name :- {event.venue_name} , Venue Address :- {event.venue_address} */}
                        <Typography component="span" display="block" fontSize="14px" fontWeight="bold">
                           Wenesday, March 8, 2023
                           {/* Date {event.date} , Time {event.time} */}
                        </Typography>
                     </Typography>
                     {/* dynamic venue address and date time */}
                  </Grid>
                  {/* 👆 Bottom address details  👆 */}
                  {/* 👇 powered by text 👇 */}

                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}  m={2}  >
                     <Typography fontSize="14px" bgcolor="black" color="white" fontWeight="bold" width="60%" textAlign={"center"} margin="auto" p={1} borderRadius="4px">
                        Powered by Evite Guru
                     </Typography>
                  </Grid>
                  {/* 👆 powered by text  👆 */}
            
               </Grid>
               {/* == 👆 Preview main section container  | Description and preview image 👆   ==*/}
            </Grid>
         </Stack>
      </>
   );
};

export default Preview;
