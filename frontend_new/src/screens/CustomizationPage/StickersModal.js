import { Box, Menu, MenuItem, Modal, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Constants } from "../../redux/constants/action-types";

const StickersModal = ({ open, handleClose, addStickers }) => {
  const [stickers, setStickers] = useState();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "85%", sm: "400px" },
    bgcolor: "white",
    boxShadow: 24,
    p: { xs: 2, sm: 4 },
    outline: "none",
    height: "60vh",
    boxSizing: "border-box",
    "& img": {
      boxShadow: "2px 5px 5px grey",
      width: "70px",
      height: "70px",
    },
  };

  // ==== get all stickers ============
  const getAllStickers = async () => {
    try {
      const res = await axios.get("/api/v1/user/variation/stickers");
      if (res.status === 200) {
        console.log("stickers=>", res);
        setStickers(res?.data?.stickers);
      }
    } catch (error) {}
  };
  //  =======endOf get Stickers ======
  // ===useEffect ====================
  useEffect(() => {
    getAllStickers();
  }, []);

  // ====endOf use Effect ============
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          variant="h5"
          fontSize={"20px"}
          fontWeight={"800"}
          textAlign={"center"}
        >
          Select sticker
        </Typography>
        <Stack mt={2} direction={"row"} flexWrap={"wrap"} overflow={"auto"}>
          {stickers &&
            stickers?.map((item, index) => {
              return (
                <MenuItem
                  key={index}
                  onClick={(e) => {
                    handleClose();
                    addStickers(`${Constants.IMG_PATH}/${item?.image}`);
                  }}
                  // value={`http://192.168.29.249:8085/${item?.image}`}
                >
                  <img
                    alt="image"
                    src={`${Constants.IMG_PATH}/${item?.image}`}
                    //   src="/assets/heroImage2.png"
                    width={"50px"}
                  />
                </MenuItem>
              );
            })}
          {/* <MenuItem
            onClick={(e) => {
              handleClose();
              addStickers(e);
            }}
            value={"/assets/leaves2.png"}
          >
            <img alt="image" src="/assets/leaves2.png" width={"50px"} />
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              handleClose();
              addStickers(e);
            }}
            value={"/assets/heroImage2.png"}
          >
            <img alt="image" src="/assets/heroImage2.png" />
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              handleClose();
              addStickers(e);
            }}
            value={"/assets/leaves3.png"}
          >
            <img alt="image" src="/assets/leaves3.png" />
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              handleClose();
              addStickers(e);
            }}
            value={"/assets/footerDecoSir.png"}
          >
            <img alt="image" src="/assets/footerDecoSir.png" />
          </MenuItem> */}
        </Stack>
      </Box>
    </Modal>
  );
};

export default StickersModal;
