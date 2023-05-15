import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Slide,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

import TemplatePreviewCarousel from "./TemplatePreviewCarousel";
// import Design from "../CustomizationPage/Design";

const TemplatePreview = ({
  carouselClick,
  singleTemplateId,
  toggleTemplatePreviewModal,
  openTemplatePreviewModal,
}) => {
  const [singleTemplateData, setSingleTemplateData] = useState({});
  // const [openLoginModal, setOpenLoginModal] = useState(false);
  // /template/:id

  const navigate = useNavigate();

  const { userDetail } = useSelector((state) => state);

  // const toggleLogInModal = () => {
  //    setOpenLoginModal(!openLoginModal);
  //  };

  const closeModal = () => {
    if (openTemplatePreviewModal) {
      setSingleTemplateData({});
      toggleTemplatePreviewModal();
    } else {
      toggleTemplatePreviewModal();
    }
  };

  const getPreviewTemplate = async () => {
    if (singleTemplateId != "") {
      try {
        const res = await axios.get(`template/single/${singleTemplateId}`);
        setSingleTemplateData(res?.data?.template);
        console.log("singleData->", res.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // console.log('single Template Data :=> ',resEdit)

  const submit = () => {
    navigate("/");
    alert("Plz Login");
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
          bgcolor: "white",
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
              {singleTemplateData?.previewImage ? (
                <Box
                  component="img"
                  height="100%"
                  maxWidth="100%"
                  src={`/images/getImage?path=/${singleTemplateData?.previewImage}`}
                  // /template/previewImage/${singleTemplate?.previewImage}
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
              {userDetail ? (
                <Button
                  disableElevation
                  onClick={() =>
                    navigate(`/dashboard/edit/${singleTemplateData?._id}`)
                  }
                  variant="contained"
                  sx={{
                    width: "70%",
                    color: "#fff",
                    marginRight: { sm: "20px", xs: "0px" },
                    marginBottom: { sm: "0px", xs: "10px" },
                  }}
                >
                  Customize
                </Button>
              ) : (
                <Button
                  disableElevation
                  onClick={submit}
                  variant="contained"
                  sx={{
                    width: "70%",
                    color: "#fff",
                    marginRight: { sm: "20px", xs: "0px" },
                    marginBottom: { sm: "0px", xs: "10px" },
                  }}
                >
                  Customize
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
        {/*== 👆 container grid for left sample image and description text 👆==*/}
        {/* ==================================== */}
        {/*== 👇 container grid for bottom carousel👇==*/}

        <Grid container item xl={11} sx={{ padding: "20px 0" }}>
          <Typography variant="h2" fontSize="20px" fontWeight="600" mb={2}>
            More like this
          </Typography>
          <TemplatePreviewCarousel carouselClick={carouselClick} />
        </Grid>
        {/*== 👆 container grid for bottom carousel👆==*/}
      </Grid>
    </Modal>
  );
};

export default TemplatePreview;
