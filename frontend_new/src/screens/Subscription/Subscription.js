import React, { useState } from "react";

import { Grid, Stack, Typography } from "@mui/material";
import PricingCard from "../pricing/PricingCard";
import { useEffect } from "react";
import { setPageTitle } from "../../redux/action/defaultActions";
import { useDispatch } from "react-redux";
import axios from "axios";

const Subscriptions = () => {
  const dispatch = useDispatch();
  const [allPlans, setallPlans] = useState();

  // ====get subscritpiton list
  const getAllSubscritptions = async () => {
    try {
      const res = await axios.get("/api/v1/user/plan/all");
      if (res.status === 200) {
        console.log("res=>", res?.data?.plans);
        setallPlans(res?.data?.plans);
      }
    } catch (error) {}
  };
  // ===========================
  useEffect(() => {
    dispatch(setPageTitle("Subscription"));
    getAllSubscritptions();

    return () => {
      dispatch(setPageTitle(""));
    };
  }, []);

  return (
    <>
      <Stack
        width={"100%"}
        mt={2}
        textAlign={"center"}
        justifyContent={"cnter"}
      >
        <Typography
          mt={{ md: 3, xs: 0 }}
          variant="h5"
          fontSize={{ md: "38px" }}
          fontWeight={"900"}
        >
          Evite Guru Pricing
        </Typography>
        <Typography variant="h6" fontSize={{ xs: "12px", md: "18px" }}>
          Start now for free, upgrade later. No hidden fees.
        </Typography>
      </Stack>
      <Stack
        mt={3}
        alignItems={"center"}
        justifyContent={"center"}
        alignContent={"center"}
        p={1}
      >
        <Grid
          container
          display={"flex"}
          justifyContent={"space-between"}
          spacing={1}
          width={"100%"}
          // alignContent={"center"}
          alignItems={"center"}
        >
          {allPlans &&
            allPlans.map((plan, index) => {
              return (
                <Grid item lg={3.5} md={4.5} sm={5.5} xs={12} key={index}>
                  <PricingCard plan={plan} />
                </Grid>
              );
            })}
        </Grid>
      </Stack>
    </>
  );
};

export default Subscriptions;
