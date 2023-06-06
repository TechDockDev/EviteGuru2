import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import PieChart2 from "./PieChart2";

const RSVPSummaryCard = (props) => {
  return (
    <Box
      sx={{
        width: { md: "100%", xs: "100%" },
        bgcolor: "rgba(250, 250, 250, 1)",

        padding: "20px",
        border: "2px solid rgba(121, 93, 168, 1)",
        borderRadius: "15px",
        boxSizing: "border-box",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: "18px",
          fontWeight: "700",
          mb: 1,
        }}
      >
        RSVP Summary
      </Typography>
      {props?.stats && props?.stats?.totalInvitees > 0 ? (
        <Stack
          direction={{ md: "row", lg: "row", sm: "row", xs: "column" }}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Stack width={"100%"}>
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
                color: "#FE3169",
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
                color: "rgb(250,167,27)",
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

          <PieChart2 stats={props?.stats} />
        </Stack>
      ) : (
        <Typography variant="caption">No Invitation sent yet !</Typography>
      )}
    </Box>
  );
};

export default RSVPSummaryCard;
