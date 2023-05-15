import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import PricingCard from "./PricingCard";
import Faqs from "./Faqs";

function Pricing() {
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

  const allFaqs = [
    {
      question: "Where can I watch?",
      description:
        "Nibh quisque suscipit fermentum netus nulla cras porttitor euismod nulla. Orci, dictumst nec aliquet id ullamcorper venenatis. Fermentum sulla craspor ttitore  ismod nulla.",
    },
    {
      question: "Where can I watch?",
      description:
        "Nibh quisque suscipit fermentum netus nulla cras porttitor euismod nulla. Orci, dictumst nec aliquet id ullamcorper venenatis. Fermentum sulla craspor ttitore  ismod nulla.",
    },
    {
      question: "Where can I watch?",
      description:
        "Nibh quisque suscipit fermentum netus nulla cras porttitor euismod nulla. Orci, dictumst nec aliquet id ullamcorper venenatis. Fermentum sulla craspor ttitore  ismod nulla.",
    },
    {
      question: "Where can I watch?",
      description:
        "Nibh quisque suscipit fermentum netus nulla cras porttitor euismod nulla. Orci, dictumst nec aliquet id ullamcorper venenatis. Fermentum sulla craspor ttitore  ismod nulla.",
    },
  ];
  return (
    <Box
      sx={{
        marginTop: { md: "85px", xs: "70px" },
        // display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        // border:"1px solid blue "
      }}
    >
      <Stack mt={4} alignItems={"center"}>
        <Typography
          mt={{ md: 4, xs: 0 }}
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
      <Stack mt={4}>
        <Grid container display={"flex"} justifyContent={"center"}>
          {allPlans &&
            allPlans.map((plan, index) => {
              return (
                <Grid item lg={3} md={4} sm={5.5} xs={11.5} p={2} key={index}>
                  <PricingCard plan={plan} />
                </Grid>
              );
            })}
        </Grid>
      </Stack>
      <Stack p={1} mt={2} alignItems={"center"}>
        <Faqs content={allFaqs} />
      </Stack>
    </Box>
  );
}

export default Pricing;
