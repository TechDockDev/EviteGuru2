import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

const AddCoupon = () => {
  const [values, setValues] = useState({ amountType: "", plans: [] });
  const [plans, setPlans] = useState([]);
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post("/coupon/create", values);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/plan/all");
        setPlans(res.data.plan);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div>
      <Box>
        <Stack
          direction={{ lg: "row", md: "column" }}
          spacing={3}
          m={2}
          alignItems={"center"}
          component="form"
          onSubmit={handleSubmit}
        >
          <TextField
            name="name"
            variant="standard"
            label="Coupon"
            onChange={handleChange}
          />
          <TextField
            variant="standard"
            type="number"
            label="Enter Amount or %"
            name="amount"
            onChange={handleChange}
          />
          <TextField
            select
            label="Amount In"
            name="amountType"
            sx={{ width: "25ch" }}
            value={values?.amountType}
            onChange={handleChange}
          >
            <MenuItem value="price">Price</MenuItem>
            <MenuItem value="percentage">Percentage</MenuItem>
          </TextField>
          <TextField
            select
            name="plans"
            SelectProps={{
              multiple: true,
              value: values.plans,
              onChange: handleChange,
            }}
            label="Select Plan"
            sx={{ minWidth: "30ch" }}
          >
            {plans.map((plan) => (
              <MenuItem key={plan._id} value={plan.name}>
                {plan.name}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            size="small"
            sx={{ color: "white", py: 1 }}
            type="submit"
          >
            Add Coupon
          </Button>
        </Stack>
      </Box>
    </div>
  );
};

export default AddCoupon;
