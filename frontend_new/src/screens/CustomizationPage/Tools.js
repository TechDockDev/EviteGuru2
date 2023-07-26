import { Box, ListItemButton, Stack } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon/ListItemIcon";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import React from "react";

import { ImMakeGroup } from "react-icons/im";
import { TbLayersDifference, TbLayersSubtract } from "react-icons/tb";
import { FaRegObjectGroup } from "react-icons/fa";
import { FaRegObjectUngroup } from "react-icons/fa";
import { BsLayerBackward } from "react-icons/bs";
import { BsLayerForward } from "react-icons/bs";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DeleteIcon from "@mui/icons-material/Delete";
const GroupTools = ({
  groupSelectedLayers,
  groupAllLayers,
  unGroup,
  bringToTop,
  moveBackward,
  moveToBack,
  moveForward,
  clone,
  removeSelectedObject = { removeSelectedObject },
}) => {
  // ===👇 Toolbar button type 2 👇===

  const ListItemButtonStyle2 = {
    padding: "0px",
    transition: "all 200ms ease",
    // width: "85px",
    marginY: "8px",
    display: "flex",
    "& svg": {
      fontSize: "25px",
      marginRight: "5px",
    },
    "& span": { fontWeight: "500" },
    "&:hover": {
      bgcolor: "transparent",
      borderColor: "#795DA8",
      "& svg": { color: "#795DA8" },
      "& span": { color: "#795DA8" },
    },
    "&:active": { scale: ".9" },
  };
  return (
    <Box width={"100%"} border={"1px solid #E6E2E2"} >
      {/*  👇==== Group Selected ====  👇    */}
      <Stack
        //   direction={"row"}
        alignItems={"start"}
        justifyContent={"center"}
        border={"1px solid #E6E2E2"}
        paddingX={"5px"}
        boxSizing={"border-box"}
        width={"100%"}
        p={1}
        // sx={{ cursor: "move" }}
      >
        <ListItemButton
          sx={{ ...ListItemButtonStyle2 }}
          onClick={groupSelectedLayers}
        >
          <ListItemIcon sx={{ color: "#667087" }}>
            <ImMakeGroup />
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
            Group Selected
          </ListItemText>
        </ListItemButton>

        {/* 👆 ==== Group Selected ==== 👆   */}
        {/*  👇==== GroupAll ====  👇    */}
        <ListItemButton
          sx={{ ...ListItemButtonStyle2 }}
          onClick={groupAllLayers}
        >
          <ListItemIcon sx={{ color: "#667087" }}>
            <FaRegObjectGroup />
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
            Group ALL
          </ListItemText>
        </ListItemButton>

        {/* 👆 ==== GroupAll ==== 👆 TbLayersSubtract  */}
        {/*  👇==== UnGroup ====  👇    */}
        <ListItemButton sx={{ ...ListItemButtonStyle2 }} onClick={unGroup}>
          <ListItemIcon
            sx={{ color: "#667087", "& svg": { fontSize: "50px" } }}
          >
            <FaRegObjectUngroup />
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
            Ungroup
          </ListItemText>
        </ListItemButton>

        {/* 👆 ==== UnGroup ==== 👆   */}
        {/*  👇==== Bring To Top ====  👇    */}
        <ListItemButton onClick={bringToTop} sx={{ ...ListItemButtonStyle2 }}>
          <ListItemIcon sx={{ color: "#667087" }}>
            <BsLayerForward />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{
              sx: {
                color: "black",
                fontSize: "12px",
                fontWeight: "800",
              },
            }}
          >
            Move Forward
          </ListItemText>
        </ListItemButton>

        {/* 👆 ==== Bring To Top ==== 👆   */}
        {/*  👇==== move layer back  ====  👇    */}
        <ListItemButton onClick={moveBackward} sx={{ ...ListItemButtonStyle2 }}>
          <ListItemIcon sx={{ color: "#667087" }}>
            <BsLayerBackward />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{
              sx: {
                color: "black",
                fontSize: "12px",
                fontWeight: "800",
              },
            }}
          >
            Move to back
          </ListItemText>
        </ListItemButton>
        {/* 👆 ==== move layer back ==== 👆   */}
        {/* ====move layers backward */}
        <ListItemButton sx={{ ...ListItemButtonStyle2 }} onClick={moveToBack}>
          <ListItemIcon sx={{ color: "#667087" }}>
            <TbLayersDifference />
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
            Push to Back
          </ListItemText>
        </ListItemButton>
        {/* mover layer backward === */}
        {/* ====move layers to front */}
        <ListItemButton sx={{ ...ListItemButtonStyle2 }} onClick={moveForward}>
          <ListItemIcon sx={{ color: "#667087" }}>
            <TbLayersSubtract />
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
            Bring To Top
          </ListItemText>
        </ListItemButton>
        {/* mover layer to top === */}
        {/*  👇==== Clone Object  ====  👇    */}
        <ListItemButton onClick={clone} sx={{ ...ListItemButtonStyle2 }}>
          <ListItemIcon sx={{ color: "#667087" }}>
            <FileCopyIcon />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{
              sx: {
                color: "black",
                fontSize: "12px",
                fontWeight: "800",
              },
            }}
          >
            Clone
          </ListItemText>
        </ListItemButton>
        {/* 👆 ==== Clone Object ==== 👆   */}
        {/*  👇==== Remove ====  👇    */}
        <ListItemButton
          sx={{ ...ListItemButtonStyle2 }}
          onClick={removeSelectedObject}
        >
          <ListItemIcon
            sx={{ color: "#667087", "& svg": { fontSize: "50px" } }}
          >
            <DeleteIcon />
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
            Remove
          </ListItemText>
        </ListItemButton>
        {/* 👆 ==== Remove ==== 👆   */}
      </Stack>
    </Box>
  );
};

export default GroupTools;
