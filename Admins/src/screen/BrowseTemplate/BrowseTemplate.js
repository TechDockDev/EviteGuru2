import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import TemplatePreview from "../TemplatePreview/TemplatePreview";

const BrowseTemplate = () => {
  const [templateData, setTemplateData] = useState();
  const [openTemplatePreviewModal, seTopenTemplatePreviewModal] =
    useState(false);
  const [singleTemplateId, setSingleTemplateId] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

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
      const res = await axios.get(
        `template/template-list?page=${page}&limit=6`
      );
      setTemplateData(res.data.template);
      setTotalPages(Math.ceil(res.data.total / 6));
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
        const res = await axios.get(
          `template/template-list?page=${page + 1}&limit=6`
        );
        setTemplateData([...templateData, ...res.data.template]);
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
          justifyContent: "center",
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
              component={"button"}
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
                border: "none",
                cursor: "pointer",
                transition: "all 150ms ease",
                borderRadius: "10px",
                "&:hover": {
                  scale: "1.03",
                },
                "&:active": { scale: ".95" },
              }}
              onClick={(e) => {
                toggleTemplatePreviewModal(e, singleTemplate._id);
              }}
            >
              <Box
                display="block"
                borderRadius="10px"
                component="img"
                width="100%"
                src={`data:image/*;base64, ${singleTemplate.sampleimage}`}
              />
            </Grid>
          );
        })}
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
        openTemplatePreviewModal={openTemplatePreviewModal}
      />
    </Stack>
  );
};

export default BrowseTemplate;
