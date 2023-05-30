import { Accordion, AccordionDetails, AccordionSummary, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
const QuestionAccordion = ({ faq, edit, deleteFaq }) => {
   return (
      <Accordion>
         <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography fontWeight={"600"}>{faq.question}</Typography>
            <Stack direction={"row"} marginLeft={"auto"} paddingX={"5px"}>
               <IconButton
                  onClick={(e) => {
                     e.stopPropagation();
                     edit(faq);
                  }}
                  sx={{
                     padding: "0px",
                     marginRight: "5px",
                     "&:hover": {
                        bgcolor: "white",
                        scale: "1.2",
                        transition: "all 200ms ease",
                        color: "#795DA8",
                     },
                  }}>
                  <EditIcon />
               </IconButton>
               <IconButton
                  onClick={(e) => {
                     e.stopPropagation();
                     deleteFaq(faq._id);
                  }}
                  sx={{
                     padding: "0px",
                     "&:hover": {
                        bgcolor: "white",
                        scale: "1.2",
                        transition: "all 200ms ease",
                        color: "#795DA8",
                     },
                  }}>
                  <DeleteIcon />
               </IconButton>
            </Stack>
         </AccordionSummary>
         <AccordionDetails>
            <Typography>{faq.answer}</Typography>
         </AccordionDetails>
      </Accordion>
   );
};

export default QuestionAccordion;
