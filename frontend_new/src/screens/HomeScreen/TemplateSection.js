import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TemplatePreview from "../TemplatePreview/TemplatePreview";
import { setTemplateList } from "../../redux/action/userActions";
import { Constants } from "../../redux/constants/action-types";

const TemplateSection = () => {
  // const [templateData, setTemplateData] = useState();
  const [loadingTemplate, setLoadingTemplate] = useState(true);
  const [openTemplatePreviewModal, seTopenTemplatePreviewModal] =
    useState(false);
  const [singleTemplateId, setSingleTemplateId] = useState("");

  const dispatch = useDispatch();

  const templateList = useSelector((state) => state?.allTemplates);
  // const { template, error, loading } = templateList;

  // console.log("Data :->", templateList);

  // get templatesList
  const getAllTemplates = async () => {
    try {
      const res = await axios.get(
        `${Constants.URL}/template/all?page=1&limit=6`
      );
      // console.log("res", res);
      dispatch(setTemplateList(res?.data?.template));
      setLoadingTemplate(false);
    } catch (error) {
      console.log("error=>", error);
    }
  };

  useEffect(() => {
    // dispatch(ATemplateList());
    getAllTemplates();
  }, []);

  const navigate = useNavigate();
  const toggleTemplatePreviewModal = (e, templateId) => {
    console.log("netw=>", templateId, openTemplatePreviewModal);

    if (!openTemplatePreviewModal) {
      setSingleTemplateId(templateId);
      seTopenTemplatePreviewModal(!openTemplatePreviewModal);
    } else {
      setSingleTemplateId("");
      seTopenTemplatePreviewModal(!openTemplatePreviewModal);
    }
  };
  //  this function is passed to carousel to handle onclick👇
  const carouselClick = (e, id) => {
    setSingleTemplateId(id);
  };

  return (
    <Stack mt={3} mb={3} padding={"10px"}>
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
          // backgroundImage: "url(./assets/leaves2.png)",
          padding: "20px 10px",
          // border: "1px solid #795DA8",
          borderRadius: "20px",
          backgroundColor: "transparent",
        }}
      >
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
        {templateList?.map((singleTemplate, index) => {
          // console.log("templates...", singleTemplate);
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
                component="img"
                width="100%"
                src={`/images/getImage?path=/${singleTemplate?.previewImage}`}
                borderRadius="10px"
              />
            </Grid>
          );
        })}
      </Grid>
      <Button
        variant="outlined"
        sx={{ width: "220px", margin: "auto" }}
        onClick={() => navigate("/browse_template")}
      >
        See more template
      </Button>
      {singleTemplateId && (
        <TemplatePreview
          carouselClick={carouselClick}
          toggleTemplatePreviewModal={toggleTemplatePreviewModal}
          singleTemplateId={singleTemplateId}
          openTemplatePreviewModal={openTemplatePreviewModal}
        />
      )}
    </Stack>
  );
};

export default TemplateSection;
