import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import PieChart2 from "./PieChart2";

const RSVPSummaryCard = () => {
  return (
    <Paper
      sx={{
        width: { md: "100%", xs: "100%" },
        bgcolor: "rgba(250, 250, 250, 1)",
        padding: "20px",
        // border: "2px solid red",
        boxSizing: "border-box",
      }}
      elevation={10}
    >
      <Typography variant="h1" sx={{ fontSize: "18px", fontWeight: "700" }}>
        RSVP Summary
      </Typography>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              //   mt: 2,
              color: "green",
            }}
          >
            <Typography
              width="100%"
              sx={{ fontSize: "16px", fontWeight: "800" }}
            >
              Attending
            </Typography>
            <Typography textAlign={"right"} width="100%" fontWeight={"800"}>
              0
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              mt: 2,
              color: "red",
            }}
          >
            <Typography sx={{ fontSize: "16px", fontWeight: "800" }}>
              Not Attending
            </Typography>
            <Typography textAlign={"right"} width="100%" fontWeight={"800"}>
              0
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              mt: 2,
              color: "blue",
            }}
          >
            <Typography sx={{ fontSize: "16px", fontWeight: "800" }}>
              Pending
            </Typography>
            <Typography textAlign={"right"} width="100%" fontWeight={"800"}>
              0
            </Typography>
          </Box>
        </Stack>

        <PieChart2 />
      </Stack>
    </Paper>
  );
};

export default RSVPSummaryCard;
