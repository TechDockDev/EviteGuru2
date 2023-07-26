import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  InputLabel,
  ListItemButton,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
const TextTools = ({
  changeFont,
  changeColor,
  bold,
  italic,
  underline,
  strike,
  font,
  color,
  textAlign,
}) => {
  console.log("color=>", color);

  const fonts = [
    "Sacramento",
    "Parisienne",
    "Montserrat",
    "Pinyon Script",
    "Arial",
    "Helvetica",
  ];
  // ===👇 TEXT Toolbar button type 3 👇===

  const ListItemButtonStyle3 = {
    padding: "0px",
    transition: "all 200ms ease",
    marginY: "8px",
    display: "flex",
    justifyContent: "center",
    "& .MuiListItemIcon-root": {
      minWidth: "",
    },
    "& svg": {
      fontSize: "25px",
      marginRight: "5px",
    },
    "&:hover": {
      bgcolor: "transparent",
      borderColor: "#795DA8",
      "& svg": { color: "#795DA8" },
      "& span": { color: "#795DA8" },
    },
    "&:active": { scale: ".9" },
  };

  return (
    <>
      {/*  👇 TOOLS TO EDIT TEXT(VISIBLE WHEN TEXT IS SELECTED)  👇    */}
      {/* <Draggable onDrag={handleDrag}> */}
      <Box mt={2} width={"100%"} overflow={"auto"} bgcolor={"white"}>
        <Stack
          //   direction={"row"}
          alignItems={"start"}
          justifyContent={"center"}
          border={"1px solid #E6E2E2"}
          paddingX={"5px"}
          boxSizing={"border-box"}
          width={"100%"}
          p={1}
          mb={1}
          // sx={{ cursor: "move" }}
        >
          {/*  👇 change font type button  👇    */}
          <ListItemButton sx={{ ...ListItemButtonStyle3 }}>
            <FormControl fullWidth>
              <InputLabel id="font-family-select-label">Fonts</InputLabel>
              <Select
                labelId="font-family-select-label"
                id="font-family-select"
                value={font}
                label="Font Family"
                size="small"
                onChange={changeFont}
              >
                {fonts?.map((font, index) => {
                  return (
                    <MenuItem key={index} value={font}>
                      {font}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </ListItemButton>
          {/* 👆 change font type button 👆   */}
          {/*  👇 change font COLOR button  👇    */}
          <ListItemButton
            sx={{ ...ListItemButtonStyle3 }}
            // onClick={changeColor}
          >
            <label>
              <Box
                width={"35px"}
                height={"35px"}
                bgcolor={color}
                border={"2px solid black"}
                sx={{ borderRadius: "100%", mr: 1 }}
              />
              <input
                id="colorSelector"
                type="color"
                value={color}
                onChange={changeColor}
                style={{ display: "none" }}
              />
            </label>
            <TextField
              type="text"
              size="small"
              value={color}
              sx={{ width: "100px", padding: "0px" }}
              onChange={changeColor}
            />
          </ListItemButton>
          {/* 👆 change font COLOR button 👆   */}
          <ButtonGroup
            variant="outlined"
            aria-label="outlined button group"
            sx={{ marginBottom: "10px" }}
          >
            <Button onClick={() => textAlign("left")}>
              <FormatAlignLeftIcon />
            </Button>
            <Button onClick={() => textAlign("center")}>
              <FormatAlignCenterIcon />
            </Button>
            <Button onClick={() => textAlign("right")}>
              <FormatAlignRightIcon />
            </Button>
            <Button onClick={() => textAlign("justify")}>
              <FormatAlignJustifyIcon />
            </Button>
          </ButtonGroup>
          <ButtonGroup
            variant="outlined"
            aria-label="outlined button group"
            sx={{ marginBottom: "10px" }}
          >
            {/*  👇 Font Style BOLD  👇    */}
            <Button size={"small"} onClick={bold}>
              <FormatBoldIcon />
            </Button>
            {/* 👆 Font Style BOLD 👆   */}
            {/*  👇 Font Style ITALIC  👇    */}
            <Button size={"small"} onClick={italic}>
              <FormatItalicIcon />
            </Button>
            {/* 👆 Font Style ITALIC 👆   */}
            {/*  👇 Font Style UNDERLINE  👇    */}
            <Button size={"small"} onClick={underline}>
              {" "}
              <FormatUnderlinedIcon />
            </Button>
            {/* 👆 Font Style UNDERLINE 👆   */}
            {/*  👇 Font Style STRIKETHROUGH  👇    */}
            {/* <Button size={"small"} onClick={strike}>
              {" "}
              <StrikethroughSIcon />
            </Button> */}

            {/* 👆 Font Style STRIKETHROUGH 👆   */}
          </ButtonGroup>
        </Stack>
      </Box>
      {/* </Draggable> */}
      {/* 👆 TOOLS TO EDIT TEXT(VISIBLE WHEN TEXT IS SELECTED) 👆   */}
    </>
  );
};

export default TextTools;
