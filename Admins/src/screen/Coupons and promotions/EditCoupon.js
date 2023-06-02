import { Box, Button, MenuItem, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { DataContext } from "../../AppContext";
import { useNavigate, useParams } from "react-router-dom";

const EditCoupon = () => {
   const [values, setValues] = useState({name:"", amount:"", amountType: "", plans: [] });
   const [plans, setPlans] = useState([]);
   const { snackbar } = useContext(DataContext);
   const navigate = useNavigate();
   const {id} = useParams();
   // ===
   const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
   };
   // ===
   const handleSubmit = async (e) => {
       e.preventDefault();
      try {
         const res = await axios.patch(`/coupon/${id}`, values);
         snackbar(res.data.status, res.data.message);
         navigate("/admin/promotions");
      } catch (error) {
         snackbar("error", error.message);
      }
   };
// ===
const getCoupon =  async () => {
    try {
       const {data} = await axios.get(`/coupon/${id}`);
        setValues({
            name:data.coupon.name,
            amount:data.coupon.amount,
            amountType:data.coupon.amountType,
            plans:data.coupon.plans,
        })
       
    } catch (error) {
      snackbar("error", error.message);

    }
 };

   //    ===
   const getPlans = async () => {
      try {
         const res = await axios.get("/plan/all");
         setPlans(res.data.plans);
      } catch (error) {
        snackbar("error", error.message);

      }
   };
   //    ===
   useEffect(() => {
    getCoupon()
    getPlans()
   }, []);
   //    ===
   return (
      <Box padding={"0px 20px 20px 20px"}>
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
            Edit Coupon
         </Typography>
         <Stack spacing={3} m={2} alignItems={"center"} component="form" onSubmit={handleSubmit}>
            <TextField required size="small" fullWidth name="name" variant="outlined" label="Coupon Name" onChange={handleChange} placeholder="Add coupon name" value={values.name}/>
            <TextField required size="small" fullWidth variant="outlined" type="number" label="Amount or %" name="amount" onChange={handleChange} placeholder="Enter Amount or %" value={values.amount} />
            <TextField required size="small" fullWidth select label="Amount In" name="amountType" value={values?.amountType} onChange={handleChange}>
               <MenuItem value="price">Price</MenuItem>
               <MenuItem value="percentage">Percentage</MenuItem>
            </TextField>
            <TextField
               required
               size="small"
               fullWidth
               select
               name="plans"
               SelectProps={{
                  multiple: true,
                  value: values.plans,
                  onChange: handleChange,
               }}
               label="Select Plan">
               {plans?.map((plan) => (
                  <MenuItem key={plan._id} value={plan.name}>
                     {plan.name}
                  </MenuItem>
               ))}
            </TextField>
            <Stack direction={"row"} justifyContent={"space-between"} width={"100%"}>
               <Button disableElevation variant="contained" sx={{ color: "white" }} type="submit">
                  Update Coupon
               </Button>
               <Button
                  onClick={() => {
                     navigate("/admin/promotions");
                  }}
                  disableElevation
                  variant="outlined">
                  Cancel
               </Button>
            </Stack>
         </Stack>
      </Box>
   );
};

export default EditCoupon;
