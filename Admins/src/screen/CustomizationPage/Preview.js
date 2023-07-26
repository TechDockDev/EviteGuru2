import { Grid, Typography, Stack, Button, Box } from "@mui/material";
import React from "react";

const Preview = () => {
   return (
      <>
         <Stack
            sx={
               {
                  //  border: "1px solid red",
                  //  borderRadius: "4px",
               }
            }>
            <Typography variant="h1" fontSize="18px" textAlign="center" fontWeight="bold" mt={1} mb={1}>
               Here is a sample of how your email will appear in your recipient’s inbox.
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
                        Sunder Gounder
                     </Typography>
                  </Typography>
                  <Typography fontSize="14px" fontWeight="bold">
                     Event Name :{" "}
                     <Typography component="span" fontSize="14px" fontWeight="normal" p={1}>
                        Sunder ki shadi
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
                        </Typography>
                        {/* dynamic host name */}
                        sent you an invitation for
                        {/* dynamic event name */}
                        <Typography component="span" display="block" fontSize="14px" fontWeight="bold">
                           Sunder ki shadi
                        </Typography>
                        {/* dynamic event name */}
                        on
                        {/* dynamic event date and time */}
                        <Typography component="span" display="block" fontSize="14px" fontWeight="bold">
                           Wenesday, March 8, 2023
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
                        <Typography component="span" display="block" fontSize="14px" fontWeight="bold">
                           Wenesday, March 8, 2023
                        </Typography>
                     </Typography>
                     {/* dynamic venue address and date time */}
                  </Grid>
                  {/* 👆 Bottom address details  👆 */}
                  {/* 👇 powered by text 👇 */}

                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}  m={2}  >
                     <Typography fontSize="14px" bgcolor="black" color="white" fontWeight="bold" width="60%" textAlign={"center"} margin="auto" p={1} borderRadius="4px">
                        Powered by EviteGuru
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
