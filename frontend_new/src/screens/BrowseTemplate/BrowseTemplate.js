import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import TemplatePreview from "../TemplatePreview/TemplatePreview";
import { useNavigate } from "react-router-dom";

const BrowseTemplate = () => {
  const [templateData, setTemplateData] = useState([]);
  const [openTemplatePreviewModal, seTopenTemplatePreviewModal] =
    useState(false);
  const [singleTemplateId, setSingleTemplateId] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const [loadingTemplate, setLoadingTemplate] = useState(true);

  const toggleTemplatePreviewModal = (e, templateId) => {
    if (!openTemplatePreviewModal) {
      setSingleTemplateId(templateId);
      seTopenTemplatePreviewModal(!openTemplatePreviewModal);
    } else {
      setSingleTemplateId("");
      seTopenTemplatePreviewModal(!openTemplatePreviewModal);
    }
  };

  const getTemplate = async () => {
    try {
      setLoadingTemplate(true);
      const res = await axios.get(`/api/v1/user/template/all`);
      console.log(res?.data?.template);
      setTemplateData(res?.data?.template);
      setLoadingTemplate(false);
      // navigate(`/dashboard/edit/${res.data.template[0]._id}`);
      // setTotalPages(Math.ceil(res.data.total / 6));
    } catch (error) {
      console.log(error);
    }
  };
  //  this function is passed to carousel to handle onclick👇
  const carouselClick = (e, id) => {
    setSingleTemplateId(id);
  };
  //  this function is passed to carousel to handle onclic👆

  useEffect(() => {
    getTemplate();
  }, []);

  const loadMoreContent = async () => {
    setPage(1 + page);
    // console.log("totalpage->", totalPages);

    if (page !== totalPages) {
      try {
        setLoadingTemplate(true);
        const res = await axios.get(
          `template/template-list?page=${page + 1}&limit=6`
        );
        setTemplateData([...templateData, ...res?.data?.template]);
        setLoadingTemplate(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Stack mt={11} mb={3} padding={"10px"}>
      <Typography
        variant="h1"
        sx={{
          color: "#795DA8",
          fontWeight: "700",
          fontSize: { sm: "45px", xs: "32px" },
          textAlign: "center",
          // border:"1px solid green"
        }}
      >
        Browse Template
      </Typography>
      <Grid
        container
        sx={{
          width: "95%",
          margin: " 30px auto",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          bgcolor: "#f1eef6",
          backgroundImage: "url(./assets/leaves2.png)",
          padding: "20px 10px",
          border: "1px solid #795DA8",
          borderRadius: "20px",
        }}
      >
        {templateData?.map((singleTemplate, index) => {
          return (
            <Grid
              // component={"button"}
              boxShadow=" 7px 7px 10px 5px grey"
              item
              key={index}
              xl={3.5}
              lg={3.5}
              md={3.5}
              sm={5}
              xs={10}
              margin="10px"
              // padding="5px"
              sx={{
                position: "relative",
                border: "none",
                cursor: "pointer",
                borderRadius: "10px",
                boxSizing: "border-box",
                overflow: "hidden",
                transition: "all 300ms ease",
                "&:hover img": {
                  transition: "all 300ms ease",
                  scale: "1.2",
                },
                "&:hover .MuiBox-root": {
                  transition: "all 300ms ease",
                  opacity: "1",
                },
                "&:hover .MuiButton-root": {
                  transition: "all 300ms ease",
                  opacity: "1",
                },
              }}
              onClick={(e) => {
                toggleTemplatePreviewModal(e, singleTemplate._id);
              }}
            >
              <Box
                sx={{
                  opacity: "0",
                  display: "flex",
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  bgcolor: "rgba(0, 0, 0, 0.36)",
                  zIndex: "1000",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="text"
                  sx={{
                    color: "white",
                    border: "1px solid white",
                    opacity: "0",
                  }}
                >
                  Customize
                </Button>
              </Box>

              <Box
                display="block"
                borderRadius="10px"
                component="img"
                width="100%"
                src={` /images/getImage?path=/${singleTemplate?.previewImage}`}
                // /template/previewImage/${singleTemplate?.previewImage
                // /images/getImage?path=/
              />
            </Grid>
          );
        })}
        {loadingTemplate ? (
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <CircularProgress
              color="primary"
              sx={{
                bgcolor: "transparent !important",
                "& svg": {
                  bgcolor: "transparent !important",
                },
              }}
            />{" "}
          </Grid>
        ) : (
          ""
        )}
      </Grid>
      <Button
        variant="outlined"
        disabled={page === totalPages}
        sx={{ width: "220px", margin: "auto" }}
        onClick={() => loadMoreContent()}
      >
        {page === totalPages ? "Nothing more to display" : "see more template"}
      </Button>
      <TemplatePreview
        carouselClick={carouselClick}
        toggleTemplatePreviewModal={toggleTemplatePreviewModal}
        singleTemplateId={singleTemplateId}
        data={templateData}
        openTemplatePreviewModal={openTemplatePreviewModal}
      />
    </Stack>
  );
};

export default BrowseTemplate;
