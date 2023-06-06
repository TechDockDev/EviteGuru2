import { Button, FormControl, Modal, Paper, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { DataContext } from "../../AppContext";
import axios from "axios";

const EnterpriseModal = ({ openModal, toggleModal, enterpriseId, }) => {
   const [values, setValues] = useState({ planAmount: "", templates: "", invitees: "" });
   const { snackbar } = React.useContext(DataContext);
   // ===
   const inputChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
   };
   // ===
   const onSubmitHandler = async (e) => {
      e.preventDefault();
      try {
         const { data } = await axios.post("/enterprise/send", { amount: values.planAmount, enterpriseId: enterpriseId });
         console.log(data);
         snackbar(data.status, data.message);
         setValues({ planAmount: "", templates: "", invitees: "" })
         toggleModal();
      } catch (error) {
         snackbar("error", error.message);
      }
   };
   return (
      <>
         <Modal
            open={openModal}
            // open={true}
            // onClose={toggleModal}
            closeAfterTransition
            sx={{ bgcolor: "transparent", backdropFilter: "blur(2px)" }}>
            <Paper
               sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: { xl: 400, lg: 400, md: 400, sm: 400, xs: "70%" },
                  bgcolor: "white",
                  border: "1px solid white",
                  borderRadius: "20px",
                  p: 4,
               }}>
               <Typography
                  variant="h1"
                  sx={{
                     fontSize: "25px",
                     fontWeight: "600",
                     textAlign: "center",
                  }}>
                  Enterprise Plan
               </Typography>
               <FormControl sx={{ mt: 2 }} component={"form"} onSubmit={onSubmitHandler} fullWidth>
                  <TextField
                     type="number"
                     label={"Plan Amount"}
                     name="planAmount"
                     value={values.planAmount}
                     onChange={inputChange}
                     placeholder="Your amount"
                     size="small"
                     sx={{
                        color: "white",
                     }}
                  />
                  <TextField
                     type="number"
                     label={"Templates"}
                     name="templates"
                     value={values.templates}
                     onChange={inputChange}
                     placeholder="Your amount"
                     size="small"
                     sx={{
                        color: "white",
                        mt: 2,
                     }}
                  />
                  <TextField
                     type="number"
                     label={"Invitees"}
                     name="invitees"
                     value={values.invitees}
                     onChange={inputChange}
                     placeholder="Your amount"
                     size="small"
                     sx={{
                        color: "white",
                        mt: 2,
                     }}
                  />
                  <Stack mt={2} direction={"row"} spacing={1}>
                     <Button
                        type="submit"
                        variant="contained"
                        sx={{
                           color: "white",
                           bgcolor: "#3B285B",
                           width: "100%",
                           "&:hover": {
                              scale: "1.02",

                              bgcolor: "#3B285B",
                           },
                        }}
                        disableElevation>
                        Send Payment Link
                     </Button>
                     <Button
                        onClick={()=>{
                           setValues({ planAmount: "", templates: "", invitees: "" })
                           toggleModal()}}
                        variant="outlined"
                        sx={{
                           borderColor: "#3B285B",
                           width: "100%",
                           "&:hover": {
                              scale: "1.02",
                              borderColor: "#3B285B",
                           },
                        }}
                        disableElevation>
                        Cancel
                     </Button>
                  </Stack>
               </FormControl>
            </Paper>
         </Modal>
      </>
   );
};

export default EnterpriseModal;
