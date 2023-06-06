import React, { useContext, useState , useEffect} from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import PieChart2 from "./PieChart2";
import { DataContext } from "../../AppContext";
import axios from "axios";

const RSVPSummaryCard = ({ guestList, id }) => {
  const [stats, setStats] = useState({})
   
   const { snackbar } = useContext(DataContext);

   const getStats = async () => {
      try {
         const { data } = await axios.get(`/events/stats/${id}`);
         setStats(data.stats)
      } catch (error) {
         snackbar("error", error.message);
      }
   };
console.log('*****>>>', stats);

   useEffect(() => {
      getStats();
   }, []);

   return (
      <Paper
         sx={{
            width: { md: "100%", xs: "100%" },
            bgcolor: "rgba(250, 250, 250, 1)",
            padding: "20px",
            // border: "2px solid red",
            boxSizing: "border-box",
         }}
         elevation={10}>
         <Typography variant="h1" sx={{ fontSize: "18px", fontWeight: "700" }}>
            RSVP Summary
         </Typography>
         {stats?.["Not Invited"] === guestList.length ? (
            <Stack marginY={"40px"}>
               <Typography variant="h3" fontSize={"16px"} fontWeight={"600"}>
                  No guest invited yet
               </Typography>
            </Stack>
         ) : (
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
               <Stack>
                  <Box
                     sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        //   mt: 2,
                        color: "green",
                     }}>
                     <Typography width="100%" sx={{ fontSize: "16px", fontWeight: "800" }}>
                        Attending
                     </Typography>
                     <Typography textAlign={"right"} width="100%" fontWeight={"800"}>
                        {stats?.attending}
                     </Typography>
                  </Box>
                  <Box
                     sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        mt: 2,
                        color: "red",
                     }}>
                     <Typography sx={{ fontSize: "16px", fontWeight: "800" }}>Not Attending</Typography>
                     <Typography textAlign={"right"} width="100%" fontWeight={"800"}>
                        {stats?.["Not Attending"]}
                     </Typography>
                  </Box>
                  <Box
                     sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        mt: 2,
                        color: "#7885eb",
                     }}>
                     <Typography sx={{ fontSize: "16px", fontWeight: "800" }}>Pending</Typography>
                     <Typography textAlign={"right"} width="100%" fontWeight={"800"}>
                        {stats?.pending}
                     </Typography>
                  </Box>
                  <Box
                     sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        mt: 2,
                        color: "#c452eb",
                     }}>
                     <Typography sx={{ fontSize: "16px", fontWeight: "800" }}>Open</Typography>
                     <Typography textAlign={"right"} width="100%" fontWeight={"800"}>
                        {stats?.open}
                     </Typography>
                  </Box>
               </Stack>

               <PieChart2 guestList={guestList} stats={stats}/>
            </Stack>
         )}
      </Paper>
   );
};

export default RSVPSummaryCard;
