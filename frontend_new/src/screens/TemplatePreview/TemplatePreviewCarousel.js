import React, { useEffect, useState } from "react";
import ItemsCarousel from "react-items-carousel";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box } from "@mui/material";
import axios from "axios";
import "./TemplatePreviewCarousel.css";

const TemplatePreviewCarousel = ({carouselClick}) => {
   const [activeItemIndex, setActiveItemIndex] = useState(0);
   const [templateData, setTemplateData] = useState();

   // ================
   const getTemplate = async () => {
      try {
         const res = await axios.get("/template/template-list?page=1&limit=6");
         // console.log(res.data);

         setTemplateData(res.data);
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
      <Box sx={{ padding: `0 ${40}px`, width: "100%", height: "150px", boxSizing: "border-box" }}>
         <ItemsCarousel
            requestToChangeActive={setActiveItemIndex}
            activeItemIndex={activeItemIndex}
            numberOfCards={4}
            gutter={20}
            leftChevron={<ChevronLeftIcon />}
            rightChevron={<ChevronRightIcon />}
            outsideChevron
            chevronWidth={40}
            infiniteLoop={true}
            classes={{ wrapper: "wrapper", itemsWrapper: "itemsWrapper", itemsInnerWrapper: "itemsInnerWrapper", itemWrapper: "itemWrapper", rightChevronWrapper: "rightChevronWrapper", leftChevronWrapper: "leftChevronWrapper" }}>

            {templateData?.template?.map((singleTemplate, index) => {
               return <Box component="img" onClick={(e)=>{carouselClick(e,singleTemplate._id)}}   height="150px" key={index} sx={{ display: "block", borderRadius: "5px", cursor:"pointer", transition:"all .3s ease" , "&:hover":{
                scale:"0.95", "&:active":{
                    scale:"1"
                }
               } }} src={`data:image/*;base64, ${singleTemplate.sampleimage}`} />;
            })}

         </ItemsCarousel>
        
      </Box>
   );
};

export default TemplatePreviewCarousel;
