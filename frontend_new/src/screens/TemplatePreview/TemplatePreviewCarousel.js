import React, { useEffect, useState } from "react";
import ItemsCarousel from "react-items-carousel";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, useMediaQuery } from "@mui/material";
import axios from "axios";
import "./TemplatePreviewCarousel.css";
import { Constants } from "../../redux/constants/action-types";

const TemplatePreviewCarousel = (props) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [templateData, setTemplateData] = useState();
  const matchesXS = useMediaQuery("(max-width:390px)");
  const matchesSM = useMediaQuery("(max-width:600px)");
  const matchesMD = useMediaQuery("(max-width:900px)");
  // ================
  const getTemplate = async () => {
    try {
      const res = await axios.get(`${Constants.URL}/template/all`);
      console.log(res.data);

      setTemplateData(res?.data);
    } catch (error) {
      console.log(error);
    }
  };
  // ================

  useEffect(() => {
    getTemplate();
  }, []);
  // ==============

  return (
    <Box
      sx={{
        padding: `0 ${40}px`,
        width: "100%",
        height: "150px",
        boxSizing: "border-box",
      }}
    >
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        // numberOfCards={4}d
        numberOfCards={matchesXS ? 1 : matchesSM ? 2 : matchesMD ? 3 : 4}
        gutter={20}
        leftChevron={<ChevronLeftIcon />}
        rightChevron={<ChevronRightIcon />}
        outsideChevron
        chevronWidth={40}
        infiniteLoop={true}
        classes={{
          wrapper: "wrapper",
          itemsWrapper: "itemsWrapper",
          itemsInnerWrapper: "itemsInnerWrapper",
          itemWrapper: "itemWrapper",
          rightChevronWrapper: "rightChevronWrapper",
          leftChevronWrapper: "leftChevronWrapper",
        }}
      >
        {templateData?.template?.map((singleTemplate, index) => {
          return (
            <Box
              component="img"
              onClick={(e) => {
                props?.carouselClick(e, singleTemplate._id);
              }}
              height="150px"
              key={index}
              sx={{
                display: "block",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "all .3s ease",
                "&:hover": {
                  scale: "0.95",
                  "&:active": {
                    scale: "1",
                  },
                },
              }}
              src={`${Constants.IMG_PATH}/${singleTemplate?.previewImage}`}
            />
          );
        })}
      </ItemsCarousel>
    </Box>
  );
};

export default TemplatePreviewCarousel;
