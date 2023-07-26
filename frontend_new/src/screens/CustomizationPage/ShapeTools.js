import { Box, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import CircleIcon from "@mui/icons-material/Circle";
import Brightness1OutlinedIcon from "@mui/icons-material/Brightness1Outlined";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import RectangleIcon from "@mui/icons-material/Rectangle";
import RectangleOutlinedIcon from "@mui/icons-material/RectangleOutlined";
import ChangeHistoryOutlinedIcon from "@mui/icons-material/ChangeHistoryOutlined";
// IoTriangle
import { IoTriangle } from "react-icons/io5";
const ShapeTools = ({ addShape }) => {
  const shapeToolsStyle = {
    color: "#667087",
    "& svg": { fontSize: "45px" },
    "&:hover": {
      bgcolor: "transparent",
      borderColor: "#795DA8",
      "& svg": { color: "#795DA8" },
      "& span": { color: "#795DA8" },
    },
    "&:active": { scale: ".9" },
  };

  return (
    <Box
      width={"100%"}
      maxWidth={"250px"}
      p={0.1}
      mb={1}
      border={"1px solid #E6E2E2"}
    >
      <Stack width={"100%"}>
        <Typography
          variant="body1"
          fontWeight={"bold"}
          color={"#795DA8"}
          component={"p"}
          ml={1}
        >
          Add shape
        </Typography>
      </Stack>
      <Stack
        display={"flex"}
        direction={"row"}
        alignItems={"center"}
        // flexWrap={"wrap"}
        justifyContent={"space-between"}
      >
        <IconButton onClick={() => addShape("Line")} sx={{ ...shapeToolsStyle }}>
          <HorizontalRuleIcon />
        </IconButton>
        <IconButton onClick={() => addShape("Triangle")} sx={{ ...shapeToolsStyle }}>
          <IoTriangle style={{ fontSize: "40px" }} />
        </IconButton>
        <IconButton onClick={() => addShape("Circle")} sx={{ ...shapeToolsStyle }}>
          <CircleIcon />
        </IconButton>
        {/* <IconButton sx={{ ...shapeToolsStyle }}>
        <Brightness1OutlinedIcon />
      </IconButton> */}

        <IconButton onClick={() => addShape("Rect")} sx={{ ...shapeToolsStyle }}>
          <RectangleIcon />
        </IconButton>
        {/* <IconButton sx={{ ...shapeToolsStyle }}>
        <RectangleOutlinedIcon />
      </IconButton> */}
        {/* <IconButton sx={{ ...shapeToolsStyle }}>
        <ChangeHistoryOutlinedIcon />
      </IconButton> */}

        {/* IoTriangle */}
      </Stack>
    </Box>
  );
};

export default ShapeTools;
