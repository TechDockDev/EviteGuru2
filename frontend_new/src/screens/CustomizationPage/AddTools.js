import { Box, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { TbTextRecognition } from "react-icons/tb";
import ExtensionIcon from "@mui/icons-material/Extension";

const AddTools = ({ addText, toggleStickersModal, onUploadImage }) => {
  // ===👇 Toolbar button 👇===
  const ListItemButtonStyle = {
    padding: "5px 0px",
    transition: "all 200ms ease",
    border: "1px solid #E6E2E2",
    width: "85px",
    maxWidth: "85px",
    marginY: "8px",
    display: "flex",
    flexDirection: "column",
    "&:hover": {
      bgcolor: "transparent",
      borderColor: "#795DA8",
      "& svg": { color: "#795DA8" },
      "& span": { color: "#795DA8" },
    },
    "&:active": { scale: ".9" },
  };
  return (
    <Box display={"flex"} flexDirection={"row"}>
      <ListItemButton
        component={"label"}
        sx={{
          ...ListItemButtonStyle,
        }}
      >
        <ListItemIcon sx={{ color: "#667087", "& svg": { fontSize: "50px" } }}>
          <input
            accept="image/*"
            style={{ display: "none" }}
            type="file"
            onChange={onUploadImage}
          />
          <InsertPhotoIcon />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{
            sx: {
              color: "black",
              fontSize: "12px",
              fontFamily: "Montserrat",
              textAlign: "center",
            },
          }}
        >
          Image
        </ListItemText>
      </ListItemButton>
      <ListItemButton sx={{ ...ListItemButtonStyle }} onClick={addText}>
        <ListItemIcon sx={{ color: "#667087", "& svg": { fontSize: "50px" } }}>
          <TbTextRecognition />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{
            sx: {
              color: "black",
              fontSize: "12px",
              fontFamily: "Montserrat",
              textAlign: "center",
            },
          }}
        >
          Text
        </ListItemText>
      </ListItemButton>
      <ListItemButton
        sx={{ ...ListItemButtonStyle }}
        onClick={toggleStickersModal}
      >
        <ListItemIcon sx={{ color: "#667087", "& svg": { fontSize: "50px" } }}>
          <ExtensionIcon />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{
            sx: {
              color: "black",
              fontSize: "12px",
              fontFamily: "Montserrat",
              textAlign: "center",
            },
          }}
        >
          Stickers
        </ListItemText>
      </ListItemButton>
    </Box>
  );
};

export default AddTools;
