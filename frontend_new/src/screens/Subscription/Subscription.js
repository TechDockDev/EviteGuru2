import React from "react";

import { Grid, Stack, Typography } from "@mui/material";
import PricingCard from "../pricing/PricingCard";
import { useEffect } from "react";
import { setPageTitle } from "../../redux/action/defaultActions";
import { useDispatch } from "react-redux";

const Subscriptions = () => {
  const dispatch = useDispatch();
  const allPlans = [
    {
      name: "Starter",
      description: "For personal and non-commercial use",
      features: [
        { name: "Lorem ipsum dolor sit amet,consectetur", status: false },
        { name: "Lorem ipsum dolor sit amet,consectetur", status: false },
        { name: "Lorem ipsum dolor sit amet,consectetur", status: false },
        { name: "Lorem ipsum dolor sit amet,consectetur", status: true },
      ],
      price: {
        month: "$ 499 / 3 Months",
        year: " $ 999 / Year",
      },
    },
    {
      name: "Professional",
      description:
        "Everything you need for building successful voice applications",
      features: [
        { name: "Lorem ipsum dolor sit amet,consectetur", status: false },
        { name: "Lorem ipsum dolor sit amet,consectetur", status: true },
        { name: "Lorem ipsum dolor sit amet,consectetur", status: true },
        {
          name: "Lorem ipsum dolor sit amet,consectetur",
          status: true,
        },
      ],
      price: {
        month: "$ 895 / 3 Months",
        year: " $ 3000 / Year",
      },
    },
    {
      name: "Enterprise",
      description: "Great for building serious voice applications at scale",
      features: [
        { name: "Lorem ipsum dolor sit amet,consectetur", status: true },
        { name: "Lorem ipsum dolor sit amet,consectetur", status: true },
        { name: "Lorem ipsum dolor sit amet,consectetur", status: true },
        { name: "Lorem ipsum dolor sit amet,consectetur", status: true },
      ],
    },
  ];
  // ============
  useEffect(() => {
    dispatch(setPageTitle("Subscription"));

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
                <Grid item lg={3.5} md={4} sm={5.5} xs={12} key={index}>
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
