import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import axios from "axios";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const TemplateEdit = ({
  carouselClick,
  singleTemplateId,
  toggleTemplatePreviewModal,
  openTemplatePreviewModal,
}) => {
  const [singleTemplateData, setSingleTemplateData] = useState({});
  // /template/:id

  const closeModal = () => {
    if (openTemplatePreviewModal) {
      setSingleTemplateData({});
      toggleTemplatePreviewModal();
    } else {
      toggleTemplatePreviewModal();
    }
  };

  const getPreviewTemplate = async (res) => {
    if (singleTemplateId != "") {
      try {
        const res = await axios.get(`/template/${singleTemplateId}`);
        setSingleTemplateData(res.data);
        console.log("singleData->", res.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getPreviewTemplate();
  }, [singleTemplateId]);

  // console.log("templateData->", singleTemplateData);

  // ==============================
  return (
    <Modal
      open={openTemplatePreviewModal}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ bgcolor: "transparent", backdropFilter: "blur(3px)" }}
    >
      <Grid
        container
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxHeight: "90vh",
          width: "90%",
          maxWidth: "900px",
          boxShadow: 24,
          p: 4,
          borderRadius: "10px",
          border: "1px solid purple",
        }}
      >
        {/* 👇Cross icon to close the modal👇  */}
        <IconButton
          onClick={closeModal}
          sx={{
            color: "black",
            position: "absolute",
            right: "35px",
            top: "20px",
          }}
        >
          <CancelOutlinedIcon sx={{ bgcolor: "transparent" }} />
        </IconButton>
        {/*👆 Cross icon to close the modal👆  */}

        {/*== 👇 container grid for left sample image and description text 👇==*/}
        <Grid container item xl={11}>
          <Grid item xl={6} lg={6} md={6} sm={6}>
            <Box
              sx={{
                height: "300px",
                // border: "1px solid red",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxSizing: "border-box",
                padding: "10px",
              }}
            >
              {singleTemplateData.sampleimage ? (
                <Box
                  component="img"
                  height="100%"
                  maxWidth="100%"
                  src={`data:image/*;base64, ${singleTemplateData.sampleimage}`}
                  sx={{ display: "block" }}
                />
              ) : (
                <CircularProgress />
              )}
            </Box>
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={6}>
            <Box
              sx={{
                height: "300px",
                // border: "1px solid red",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                flexDirection: "column",
                padding: "20px 10px",
                boxSizing: "border-box",
              }}
            >
              <Typography
                variant="h1"
                fontSize="28px"
                fontWeight="600"
                width="100%"
                textAlign="left"
              >
                {singleTemplateData?.name}
              </Typography>
              <Typography
                variant="h2"
                fontSize="20px"
                width="100%"
                textAlign="left"
              >
                Description
              </Typography>
              <Typography
                variant="body"
                fontSize="16px"
                fontFamily={"Montserrat"}
                width="100%"
                textAlign="left"
              >
                {singleTemplateData?.description}
              </Typography>
              {/* <Button
                disableElevation
                variant="contained"
                sx={{
                  width: "70%",
                  color: "#fff",
                  marginRight: { sm: "20px", xs: "0px" },
                  marginBottom: { sm: "0px", xs: "10px" },
                }}
              >
                Customize
              </Button> */}
            </Box>
          </Grid>
        </Grid>
        {/*== 👆 container grid for left sample image and description text 👆==*/}
        {/* ==================================== */}
        {/*== 👇 container grid for bottom carousel👇==*/}

        <Grid container item xl={11} sx={{ padding: "20px 0" }}>
          {/* <Typography variant="h2" fontSize="20px" fontWeight="600" mb={2}>
            More like this
          </Typography> */}
          <Box
            sx={{
              height: "300px",
              // border: "1px solid red",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxSizing: "border-box",
              padding: "10px",
            }}
          >
            {singleTemplateData.sampleimage1 ? (
              <Box
                component="img"
                height="50%"
                maxWidth="50%"
                src={`data:image/*;base64, ${singleTemplateData.sampleimage1}`}
                sx={{
                  display: "block",
                  "&hover": { "background-color": "black" },
                }}
              />
            ) : (
              <CircularProgress />
            )}
          </Box>
          <Box
            sx={{
              height: "300px",
              // border: "1px solid red",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxSizing: "border-box",
              padding: "10px",
            }}
          >
            {singleTemplateData.sampleimage2 ? (
              <Box
                component="img"
                height="50%"
                maxWidth="50%"
                src={`data:image/*;base64, ${singleTemplateData.sampleimage2}`}
                sx={{ display: "block" }}
              />
            ) : (
              <CircularProgress />
            )}
          </Box>
          <Box
            sx={{
              height: "300px",
              // border: "1px solid red",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxSizing: "border-box",
              padding: "10px",
            }}
          >
            {singleTemplateData.sampleimage3 ? (
              <Box
                component="img"
                height="50%"
                maxWidth="50%"
                src={`data:image/*;base64, ${singleTemplateData.sampleimage3}`}
                sx={{ display: "block" }}
              />
            ) : (
              <CircularProgress />
            )}
          </Box>
          <Box
            sx={{
              height: "300px",
              // border: "1px solid red",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxSizing: "border-box",
              padding: "10px",
            }}
          >
            {/*== 👆 Box for image👆==*/}
            {singleTemplateData.backgroundimage ? (
              <Box
                component="img"
                height="50%"
                maxWidth="50%"
                src={`data:image/*;base64, ${singleTemplateData?.backgroundimage}`}
                sx={{ display: "block" }}
              />
            ) : (
              <CircularProgress />
            )}
          </Box>
        </Grid>
        {/*== 👆 container grid for bottom carousel👆==*/}
      </Grid>
    </Modal>
  );
};

export default TemplateEdit;
