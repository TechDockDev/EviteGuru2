import { Box, Button, Paper, Typography, Grid, Input, Stack, Select, MenuItem, IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { DataContext } from "../../AppContext";
export const EditPricingContent = () => {
   const params = useParams();
   const navigate = useNavigate();
   const [value, setValue] = useState();
   const [descriptionNumber, setDescriptionNumber] = useState([]);
   const [description, setDescription] = useState({});
  const {snackbar} = useContext(DataContext)
   useEffect(() => {
      (async () => {
         try {
            const { data } = await axios.get(`/plan/${params.id}`);
            setValue(data.plan);
            let temp = {};
            data?.plan.description?.forEach((element, index) => {
               temp = { ...temp, [`description${index}`]: element };
            });
            setDescription(temp);
         } catch (error) {
           snackbar("error", error.message)
         }
      })();
   }, []);
   useEffect(() => {
      setDescriptionNumber(Array.from({ length: Object.keys(description)?.length }, () => Math.random()));
      return () => {
         setDescriptionNumber([]);
      };
   }, [Object.keys(description)?.length]);

   const addDescription = () => {
      setDescriptionNumber([...descriptionNumber, Math.random()]);
      setDescription({
         ...description,
         [`description${Object.keys(description)?.length}`]: "",
      });
   };

   const handleChange = (e) => {
      if (e.target.name === "monthly" || e.target.name === "yearly") {
         return setValue({
            ...value,
            price: { ...value.price, [e.target.name]: e.target.value },
         });
      }
      setValue({ ...value, [e.target.name]: e.target.value });
   };
   const handleDescription = (e, index) => {
      setDescription({ ...description, [e.target.name]: e.target.value });
   };

   const removeDescription = (index) => {
      setDescriptionNumber(descriptionNumber.filter((item, i) => i !== index));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const data = { ...value, description: Object.values(description) };
         const res = await axios.patch(`/plan/${params.id}`, data);
         snackbar(res.data.status, res.data.message)
         navigate("/admin/pricing");
      } catch (error) {
        snackbar("error", error.message)
      }
   };
   return (
      <Stack width="100%" margin="auto" alignItems={"center"} padding={2} boxSizing={"border-box"}>
         <Paper
            sx={{
               display: "flex",
               justifyContent: "center",
               flexDirection: "column",
               p: 5,
               bgcolor: "white",
               borderRadius: "20px",
            }}
            elevation={10}>
            <Box component="form"  autoComplete="off" onSubmit={handleSubmit}>
               <Typography
                  variant="h1"
                  align="center"
                  fontWeight="800"
                  fontSize={"28px"}
                  sx={{
                     color: "#795da8",
                     width: "100%",
                     mb: 2,
                  }}>
                  Edit Subscription
               </Typography>
               <Stack direction={"column"} spacing={2}>
                  <TextField size="small" label="Name" name="name" value={value?.name || ""} variant="outlined"  onChange={handleChange} required />

                  {descriptionNumber?.map((v, i) => (
                     <Stack direction={"row"} alignItems={"center"} spacing={1} key={v} position={"relative"}>
                        <>
                           <TextField size="small" label="Description" name={`description${i}`} value={description[`description${i}`]} onChange={handleDescription} variant="outlined" fullWidth />
                      
                              <IconButton
                                 aria-label="remove"
                                 size="small"
                                 onClick={() => removeDescription(i)}
                                 sx={{
                                  padding:"0",
                                   position: "absolute",
                                   right:"-5px",
                                   top:"-5px",
                                   transition: "all 200ms ease",
                                   backgroundColor: "#795DA8",
                                   color: "white",
                                   "&:hover": {
                                      backgroundColor: "#CEC5DC",
                                      color: "#795DA8",
                                   },
                                }}>
                                   <CloseIcon sx={{fontSize:"15px"}} />
                              </IconButton>
                        
                        </>
                     </Stack>
                  ))}
                <Box width={"100%"} textAlign={"right"} sx={{
                    marginTop:"5px !important",
                    marginBottom:"10px !important"
                  }} >
                     <Button
                        disableElevation

                        size="small"
                        onClick={addDescription}
                        sx={{
                           
                           
                        }}>
                        Add More Description
                     </Button>
                  </Box>
               </Stack>
               <Stack spacing={2} direction={"row"}>
                  <TextField size="small" label="Monthly Price" name="monthly" value={value?.price?.monthly || ""} variant="outlined" type="number" onChange={handleChange} />
                  <TextField size="small" label="Yearly Price" name="yearly" value={value?.price?.yearly || ""} type="number" variant="outlined" onChange={handleChange}  />
               </Stack>
               <Stack spacing={2} mt={2}  direction={"row"}>
                  <TextField size="small" label="Template Limit" name="templateLimit" value={value?.templateLimit || ""} variant="outlined" type="number" onChange={handleChange} />
                  <TextField size="small" label="Guest Limit" name="guestLimit" value={value?.guestLimit || ""} type="number" variant="outlined" onChange={handleChange}  />
               </Stack>
               <Box width={"100%"} display={"flex"} justifyContent={"space-between"}>
                  <Button variant="contained" type="submit" sx={{ color: "white", my: "20px" }}>
                     Submit
                  </Button>
                  <Button onClick={() => navigate("/admin/pricing")} variant="outlined" sx={{ my: "20px" }}>
                     Cancel
                  </Button>
               </Box>
            </Box>
         </Paper>
      </Stack>
   );
};

export default EditPricingContent;
