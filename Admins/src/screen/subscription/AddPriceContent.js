import { Box, Button, Paper, Typography, Grid, Input, Stack, Select, MenuItem, IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link as RouterLink, useNavigate, NavLink } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { DataContext } from "../../AppContext";

export const AddPriceContent = () => {
   const navigate = useNavigate();
   const [descriptionNumber, setDescriptionNumber] = useState([Math.random()]);
   const [value, setValue] = useState();
   const [description, setDescription] = useState([]);
   const {snackbar} = useContext(DataContext)
   const addDescription = () => {
      setDescriptionNumber([...descriptionNumber, Math.random()]);
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
   const handleDescription = (e) => {
      setDescription({ ...description, [e.target.name]: e.target.value });
   };

   const removeDescription = (index) => {
      setDescriptionNumber(descriptionNumber.filter((item, i) => i !== index));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const data = { ...value, description: Object.values(description) };
         const res = await axios.post("/plan/create-plan", data);
         snackbar(res.data.status, res.data.message);
         navigate("/admin/pricing");
      } catch (error) {
         snackbar("error", error.message);
      }
   };

   return (
      <Stack width="100%" margin="auto" alignItems={"center"} padding={2} boxSizing={"border-box"}>
         <Paper
            sx={{
               display: "flex",
               justifyContent: "center",
               flexDirection: "column",
               padding: "20px 50px",
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
                  Add Subscription
               </Typography>
               <Stack direction={"column"} spacing={2}>
                  <TextField size="small" label="Name" name="name" variant="outlined" onChange={handleChange} required />

                  {descriptionNumber.map((v, i) => (
                     <Stack direction={"row"} alignItems={"center"} spacing={1} key={v} position={"relative"}>
                        <>
                           <TextField size="small" label="Description" name={`description${i}`} onChange={handleDescription} variant="outlined" fullWidth required/>

                           <IconButton
                              aria-label="remove"
                              size="small"
                              onClick={() => removeDescription(i)}
                              sx={{
                                 padding: "0",
                                 position: "absolute",
                                 right: "-5px",
                                 top: "-5px",
                                 transition: "all 200ms ease",
                                 backgroundColor: "#795DA8",
                                 color: "white",
                                 "&:hover": {
                                    backgroundColor: "#CEC5DC",
                                    color: "#795DA8",
                                 },
                              }}>
                              <CloseIcon sx={{ fontSize: "15px" }} />
                           </IconButton>
                        </>
                     </Stack>
                  ))}
                  <Box
                     width={"100%"}
                     textAlign={"right"}
                     sx={{
                        marginTop: "5px !important",
                        marginBottom: "10px !important",
                     }}>
                     <Button disableElevation size="small" onClick={addDescription} sx={{}}>
                        Add More Description
                     </Button>
                  </Box>
               </Stack>
               <Stack spacing={2} direction={"row"}>
                  <TextField size="small" label="Monthly Price" name="monthly" variant="outlined" type="number" onChange={handleChange} />
                  <TextField size="small" label="Yearly Price" name="yearly" type="number" variant="outlined" onChange={handleChange} />
               </Stack>
               <Stack spacing={2} mt={2} direction={"row"}>
                  <TextField size="small" label="Template Limit" name="templateLimit" variant="outlined" type="number" onChange={handleChange} />
                  <TextField size="small" label="Guest Limit" name="guestLimit" type="number" variant="outlined" onChange={handleChange} />
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

export default AddPriceContent;
