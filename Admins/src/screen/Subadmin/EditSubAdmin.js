import { Box, Button, Paper, Typography, Grid, Input, Stack, Checkbox, TextField, Autocomplete, FormGroup, FormControlLabel } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link as RouterLink, useNavigate, useParams, NavLink } from "react-router-dom";
import SingleInput from "./SingleInput";
import { DataContext } from "../../AppContext";
const defaultValues = {
   textValue: "",

   dropdownValue: "One",
   sliderValue: 0,
};

export const EditSubAdmin = () => {
   const params = useParams();
   let [singleAdminId, setsingleAdminId] = useState({});

   const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      permission: [],
      superAdmin: "",
   });
   const [checkboxData, setCheckboxData] = useState({
      Template: false,
      Users: false,
      Subscription: false,
      "Sub Admin": false,
      Notifications: false,
      Coupons: false,
      Template: false,
      Template: false,
   });
   const { snackbar } = useContext(DataContext);
   const navigate = useNavigate();

   // console.log("inside the edit >", params.id);

   const singleAdmin = async (res, req) => {
      try {
         const { data } = await axios.get(`/${params?.id}`);
         console.log("-->", data?.admin);

         setFormData({
            name: data?.admin?.name,
            email: data?.admin?.email,
            phone: data?.admin?.phone,
            permission: data?.admin?.permission,
            superAdmin: data?.admin?.superAdmin,
         });
         const tmp = checkboxData;
         data?.admin?.permission?.forEach((element) => {
            tmp[element] = true;
         });
         setCheckboxData({ ...tmp });
      } catch (error) {
         snackbar("error", error.message);
      }
   };

   //  ===

   const editAdminbyId = async () => {
      try {
         let tempArr = []
         for (const key in checkboxData) {
            if(checkboxData[key] === true){
               tempArr.push(key);
            }                           
         }
         const {data} = await axios.put(`/${params?.id}`, {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            permission: tempArr,
            superAdmin: formData.superAdmin,
         });
         snackbar(data.status, data.message)
                  
      } catch (error) {
         snackbar("error", error.message);
      }
   };
   // ===
   const onPermissionChange = (e) => {
      setCheckboxData({ ...checkboxData, [e.target.name]: e.target.checked });
   };
   // ===
   const handleChange = (e, value) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };
   console.log(formData);

   // ===

   const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
   const checkedIcon = <CheckBoxIcon fontSize="small" />;

   const submitHandler = (e) => {
      e.preventDefault();
      editAdminbyId();
      navigate("/admin/admin_list");
   };

   useEffect(() => {
      singleAdmin();
   }, []);

   return (
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
               paddingBottom: "40px",
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
               Edit Admin
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
               {/* <SingleInput
            labelText={"Password"}
            inputType={"text"}
            inputName={"password"}
            inputValue={formData.password}
            onChangeHandler={handleChange}
            labelInputId={"password"}
            requiredTrue={true}
            placeholderText={"set Password"}
          /> */}
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
               {/* == 👇permission  ==*/}

             { (formData?.superAdmin === false  || formData?.superAdmin === "false") &&  <Grid container mt={2}>
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
                  <Grid item xl={8} lg={8} md={8} sm={8} xs={12} multiple>
                     <FormGroup row>
                        {subadminPermission.map((option, index) => {
                           return (
                              <FormControlLabel
                                 key={index}
                                 sx={{
                                    width: "fit-content",
                                 }}
                                 control={<Checkbox checked={checkboxData[option.permission]} name={option.permission} onChange={onPermissionChange} />}
                                 label={option.permission}
                              />
                           );
                        })}
                     </FormGroup>
                  </Grid>
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
   );
};

export default EditSubAdmin;
const subadminPermission = [{ permission: "Template" }, { permission: "Subscription" }, { permission: "Users" }, { permission: "Sub Admin" }, { permission: "Notifications" }, { permission: "Coupons" }];
