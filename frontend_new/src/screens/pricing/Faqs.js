import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
const Faqs = (props) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      {props?.content &&
        props?.content?.map((item, index) => {
          return (
            <Accordion
              elevation={0}
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
              key={index}
              sx={{
                bgcolor: "rgba(250, 250, 250, 1)",
                width: { md: "85%", sm: "100%" },

                marginBottom: "2px",
                "&:before": {
                  position: "static !important",
                },
                "& .MuiAccordion-root ": {
                  // borderColor: "rgba(205, 214, 218, 0.25)",
                },
              }}
            >
              {/* ClearIcon */}
              <AccordionSummary
                expandIcon={
                  expanded === `panel${index}` ? <ClearIcon /> : <AddIcon />
                }
                aria-controls={`panel${index}bh-content`}
                id={`panel${index}bh-header`}
              >
                <Stack
                  justifyContent={"space-between"}
                  spacing={2}
                  direction={"row"}
                >
                  <Typography
                    component={"dd"}
                    sx={{
                      fontWeight: 900,
                      color: "rgba(216, 209, 227, 1)",
                      fontSize: { md: "30px", sm: "20px" },
                    }}
                  >
                    0{index + 1}
                  </Typography>
                  <Typography
                    sx={{
                      flexShrink: 0,
                      fontWeight: "900",
                      fontSize: { md: "30px", sm: "20px" },
                    }}
                  >
                    {item?.question}
                  </Typography>
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{item?.description}</Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
    </>
  );
};

export default Faqs;
