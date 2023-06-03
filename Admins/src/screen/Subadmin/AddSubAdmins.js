import { Box, Button, Paper, Typography, Grid, Input, Stack, Checkbox, TextField, Autocomplete, Modal } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

import SingleInput from "./SingleInput";
import { DataContext } from "../../AppContext";

export const AddSubAdmins = () => {
   const { snackbar } = useContext(DataContext);
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      phone: "",
      permission: [],
      superAdmin: false,
   });
   const [arrayPermission, setArrayPermission] = useState([]);

   const navigate = useNavigate();

  
// ===
   const handleChange = (e, index) => {
      if (e.target.name === "permission") {
         let tempPerm = [...formData.permission];
         tempPerm[index] = e.target.value;
         setFormData({ ...formData, permission: tempPerm });
      } else {
         setFormData({ ...formData, [e.target.name]: e.target.value });
      }
   };
   const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
   const checkedIcon = <CheckBoxIcon fontSize="small" />;

   const submitHandler = async (e) => {
      e.preventDefault();
      try {
         const tmpPermissions = [];
         arrayPermission.map((p) => {
            tmpPermissions.push(p.permission);
         });
         const { data } = await axios.post("/create-subadmin", { ...formData, permission: tmpPermissions });
         snackbar(data.status, data.message);
         navigate("/admin/admin_list");
      } catch (error) {
         snackbar("error", error.message);
      }
   };

   useEffect(() => {}, []);

   return (
      <>
         <Stack width="100%" margin="auto" alignItems={"center"} p={2}>
            <Paper
               sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  p: 2,
                  bgcolor: "white",
                  width: "80%",

                  borderRadius: "20px",
               }}
               elevation={10}>
               {/* title */}
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
                  Add Admins
               </Typography>
               {/* title */}

               {/* form element */}

               <Grid
                  // border="1px solid green"
                  width="90%"
                  p={1}
                  container
                  component="form"
                  onSubmit={submitHandler}
                  sx={{
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center",
                     flexDirection: "column",
                  }}>
                  {/* == 👇 Sub-Admin Name 👇  ==*/}
                  <SingleInput labelText={"Sub-Admin Name"} inputType={"text"} inputName={"name"} inputValue={formData.name} onChangeHandler={handleChange} labelInputId={"name"} requiredTrue={true} placeholderText={"Sub-Admin name"} />
                  {/* == 👆 Sub-Admin Name 👆   ==*/}

                  {/* == 👇 email 👇  ==*/}
                  <SingleInput labelText={"Email"} inputType={"email"} inputName={"email"} inputValue={formData.email} onChangeHandler={handleChange} labelInputId={"email"} requiredTrue={true} placeholderText={"Enter email"} />
                  {/* == 👆 email   ==*/}

                  {/* == 👇 password 👇  ==*/}
                  <SingleInput labelText={"Password"} inputType={"password"} inputName={"password"} inputValue={formData.password} onChangeHandler={handleChange} labelInputId={"password"} requiredTrue={true} placeholderText={"set Password"} />
                  {/* == 👆 password   ==*/}

                  {/* == 👇 Phone 👇  ==*/}
                  <SingleInput labelText={"Phone"} inputType={"number"} inputName={"phone"} inputValue={formData.phone} onChangeHandler={handleChange} labelInputId={"phone"} requiredTrue={true} placeholderText={"Enter Phone No."} />
                  {/* == 👆 Phone   ==*/}

                  {/* == 👇 superAdmin 👇  ==*/}
                  <Grid container mt={2}>
                     <Grid
                        component={"label"}
                        htmlFor={"superAdmin"}
                        item
                        xl={4}
                        lg={4}
                        md={4}
                        sm={4}
                        xs={12}
                        sx={{
                           fontFamily: "Montserrat",
                           fontSize: "16px",
                           display: "flex",
                           alignItems: "center",
                        }}>
                        Super Admin *
                     </Grid>
                     <Grid
                        component={"select"}
                        required={true}
                        name="superAdmin"
                        value={formData.superAdmin}
                        onChange={handleChange}
                        id={"superAdmin"}
                        item
                        xl={8}
                        lg={8}
                        md={8}
                        sm={8}
                        xs={12}
                        sx={{
                           height: "40px",
                           outline: "none",
                           border: "1px solid black",
                           borderRadius: "8px",
                           paddingX: "8px",
                           fontSize: "16px",
                           "&:focus": { border: "2px solid #795DA8" },
                        }}>
                        <option value={null}>Please choose an option</option>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                     </Grid>
                  </Grid>
                  {/* == 👆 superAdmin   ==*/}

                  {/* == 👇 permission 👇  ==*/}
                 {   (formData?.superAdmin === false || formData?.superAdmin === "false"  )&& <Grid container mt={2}>
                     <Grid
                        component={"label"}
                        htmlFor={"permission"}
                        item
                        xl={4}
                        lg={4}
                        md={4}
                        sm={4}
                        xs={12}
                        sx={{
                           fontFamily: "Montserrat",
                           fontSize: "16px",
                           display: "flex",
                           alignItems: "center",
                        }}>
                        Permission *
                     </Grid>
                    <Grid
                        
                        component={Autocomplete}
                        item
                        xl={8}
                        lg={8}
                        md={8}
                        sm={8}
                        xs={12}
                        multiple
                        sx={{
                           borderRadius: "8px",
                           "& .MuiFormControl-root, .MuiInputBase-root": {
                              padding: "0px",
                              height: "100%",
                              borderRadius: "8px",
                           },
                           "& input": {
                              paddingLeft: "10px !important",
                           },
                        }}
                        id="permission"
                        options={subadminPermission}
                        disableCloseOnSelect
                        getOptionLabel={(formData, b) => formData.permission}
                        onChange={(event, value) => setArrayPermission(value)}
                        renderOption={(props, option, { selected }) => (
                           <li
                              {...props}
                              style={{
                                 background: "white",
                                 color: "#795da8",
                                 fontWeight: "bold",
                              }}>
                              <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                              {option.permission}
                           </li>
                        )}
                        renderInput={(params) => {
                           return (
                              <>
                                 <TextField {...params} placeholder="Permission" />
                              </>
                           );
                        }}
                     />
                  </Grid>}
                  {/* == 👆permission  ==*/}

                  {/* buttons container */}
                  <Grid item mt={3} xs={12} width="100%" textAlign="center">
                     <Button
                        disableElevation
                        variant={"contained"}
                        type="submit"
                        sx={{
                           color: "white",
                           width: "100%",
                           mb: 1,
                        }}
                        size="large">
                        Submit
                     </Button>
                     <Button disableElevation fullWidth variant={"outlined"} component={NavLink} to="/admin/admin_list">
                        Back
                        {/* {plan.buttonText} */}
                     </Button>
                  </Grid>
               </Grid>

               {/* form element */}
            </Paper>
         </Stack>
        
      </>
   );
};

export default AddSubAdmins;

const subadminPermission = [{ permission: "Template" }, { permission: "Subscription" }, { permission: "Users" }, { permission: "Sub Admin" }, { permission: "Notifications" }, { permission: "Coupons" },{ permission: "Enterprise" } ,  { permission: "Accounts" }];
