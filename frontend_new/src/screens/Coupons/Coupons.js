import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import React from "react";

const Coupons = (props) => {
  //   console.log("props", props);
  return (
    <Box
      width={"220px"}
      height={"90px"}
      mt={1}
      //   component={Paper}
      //   bgcolor={"rgba(251, 251, 251, 1)"}
      sx={{
        backdropFilter: "10px",
        borderRadius: "10px",
        backdropFilter: "blur(2px)",
        background: "rgba(149, 99, 255, 1)",
        // background:
        //   "linear-gradient(233deg, rgb(172 148 224 / 90%) 2.5%, rgba(240, 240, 240, 1) 98%) ",
        background:
          "linear-gradient(223.5deg, rgb(172 148 224 / 45%) 2.5%, rgba(240, 240, 240, 0.5) 98%) ",
        mixBlendMode: "darken",
      }}
      //   boxShadow={"rgba(206, 197, 220, 1) 5px 5px 20px 0px"}
      border={"1px solid rgba(240, 240, 240, 1)"}
      p={1}
      px={2}
      pb={2}
    >
      <Typography
        variant="h6"
        textAlign={"center"}
        sx={{
          color: "rgba(59, 40, 91, 1)",
          fontWeight: "800",
          textTransform: "uppercase",
        }}
      >
        {/* COUPON NAME */}
        {props?.details?.name}
      </Typography>
      <Stack direction={"row"} mt={1}>
        <Box width={"50%"} display={"flex"} flexDirection={"column"}>
          <Typography
            variant="caption"
            sx={{
              color: "rgba(59, 40, 91, 1)",
              fontWeight: "600",
              textTransform: "uppercase",
            }}
          >
            DISCOUNT
          </Typography>
          <Typography
            variant="caption"
            fontSize={"18px"}
            sx={{ color: "rgba(59, 40, 91, 1)", fontWeight: "800" }}
          >
            {/* 50% */}
            {props?.details?.amountType === "price"
              ? `$${props?.details?.amount}`
              : `%${props?.details?.amount}`}
          </Typography>
        </Box>
        <Box
          width={"50%"}
          // border={"2px dashed rgba(59, 40, 91, 1)"}
          //   p={1}
          borderRadius={"10px"}
          fontSize={"8px"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Button
            disableElevation
            variant="contained"
            size="small"
            sx={{
              color: "white",
              fontSize: "9px",
              textTransform: "uppercase",
              // border: "2px dashed rgba(59, 40, 91, 1)",
            }}
            onClick={() => props?.copyCode(props?.details?.name)}
          >
            REDEEM NOW
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default Coupons;
