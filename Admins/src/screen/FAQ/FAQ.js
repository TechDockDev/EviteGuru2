import { Box, Button, FormControl, Grid, Stack, TextField, TextareaAutosize, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import QuestionAccordion from "./QuestionAccordion";
import { DataContext } from "../../AppContext";
import axios from "axios";

const FAQ = () => {
   const [value, setValue] = useState({ question: "", answer: "" });
   const [FAQData, setFAQData] = useState([]);
   const {snackbar} = useContext(DataContext)
   const [faqId, setFaqId] = useState("")
   // ===
   const onInputChange = (e) => {
      setValue({ ...value, [e.target.name]: e.target.value });
   };

   // ===
   const edit = (faq)=>{
     setFaqId(faq._id)
    setValue({question:faq.question, answer:faq.answer})
    getFAQs();
   }
   // ===
   const deleteFaq = async (id) => {
    try {
      const {data} = await axios.delete(`/faq/delete/${id}`, )
      snackbar(data.status, data.message);
      getFAQs()
   
    } catch (error) {
      snackbar("error", error.message);
    }
 };
   // ===
   const onUpdate = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.patch("/faq/update", {faqId: faqId, ...value})
      snackbar(data.status, data.message);
      setValue({ question: "", answer: "" })
      setFaqId("")
      getFAQs();
    } catch (error) {
      snackbar("error", error.message);
    }
 };
   // ===
   const onSubmitHandler = async (e) => {
      e.preventDefault();
      try {
        const {data} = await axios.post("/faq/create", value)
        snackbar(data.status, data.message);
        setValue({ question: "", answer: "" })
        getFAQs();
      } catch (error) {
        snackbar("error", error.message);
      }
   };
   // ===

   const getFAQs= async ()=>{
    try {
      const {data} = await axios.get("/faq/get")
      setFAQData(data.faqs)
      // snackbar(data.status, data.message);
    } catch (error) {
      snackbar("error", error.message);
    }
   }

useEffect(() => {
  getFAQs();
}, [])


   return (
      <Box paddingX={"10px"} boxSizing={"border-box"}>
         <Typography
            variant="h1"
            align="center"
            fontWeight="800"
            fontSize={"28px"}
            mb={2}
            sx={{
               color: "#795da8",
               width: "100%",
            }}>
            FAQs
         </Typography>
         {/* ===** 👇 Add a new FAQ CONTAINER👇 **=== */}

         <Grid container padding={"20px"} border={"2px solid #795da8"} borderRadius={"8px"}>
            <Grid item xs={12} mb={1}>
               <Typography
                  variant="h1"
                  align="left"
                  fontWeight="800"
                  fontSize={"18px"}
                  mb={2}
                  sx={{
                     color: "#795da8",
                     width: "100%",
                     borderBottom: "1px solid #795da8",
                     paddingBottom: "5px",
                  }}>
                  Add a new FAQ
               </Typography>
            </Grid>

            <Grid item xs={12}>
               <FormControl component={"form"} fullWidth onSubmit={faqId ==="" ? onSubmitHandler : onUpdate}>
                  <TextField required size="small" type="text" name="question" value={value.question} onChange={onInputChange} label="Question" sx={{ marginBottom: "20px" }} />
                  <TextField multiline required size="small" type="text" name="answer" value={value.answer} onChange={onInputChange} label="Answer" sx={{ marginBottom: "20px" }} />
                  {faqId !== "" ?
                  <Button type="submit" disableElevation variant="contained" sx={{ color: "white", marginBottom: { xs: "20px", sm: "0px" } }}>
                     UPDATE FAQ
                  </Button>:
                  <Button type="submit" disableElevation variant="contained" sx={{ color: "white", marginBottom: { xs: "20px", sm: "0px" } }} >
                     ADD FAQ
                  </Button>}
               </FormControl>
            </Grid>
         </Grid>
         {/* ===** 👆 Add a new FAQ CONTAINER👆 **=== */}
         {/* ===** 👇 FAQs CONTAINER👇 **=== */}
         <Stack mt={3} border={"2px solid #795da8"} borderRadius={"8px"} padding={"20px"}>
            <Typography
               variant="h1"
               align="left"
               fontWeight="800"
               fontSize={"18px"}
               mb={2}
               sx={{
                  color: "#795da8",
                  width: "100%",
                  borderBottom: "1px solid #795da8",
                  paddingBottom: "5px",
               }}>
               Manage FAQs
            </Typography>
            <Stack
               sx={{
                  "& .MuiPaper-root": {
                     bgcolor: "white",
                  },
                  "& .MuiAccordion-root:before": {
                     bgcolor: "#C4C4C4",
                  },
               }}>
               {FAQData.map((faq, index) => {
                  return <QuestionAccordion key={index} faq={faq} edit={edit}  deleteFaq={deleteFaq} />;
               })}
            </Stack>
            {/* ===** 👆 FAQs CONTAINER👆 **=== */}
         </Stack>
      </Box>
   );
};

export default FAQ;
