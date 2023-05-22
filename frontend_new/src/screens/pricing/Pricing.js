import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PricingCard from "./PricingCard";
import Faqs from "./Faqs";
import axios from "axios";

function Pricing() {
  const [allPlans, setallPlans] = useState();
  const [open, setOpen] = useState(false);
  const [browsePlanDetails, setBrowsePlanDetails] = useState(null);
  const handleShow = () => setOpen(!open);
  const handleModalOpen = (plan) => {
    setBrowsePlanDetails(plan);
  };

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
    getAllSubscritptions();
  }, []);
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
        <Grid
          container
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          {allPlans &&
            allPlans.map((plan, index) => {
              return (
                <Grid item lg={3.5} md={4} sm={5.5} xs={12} p={2} key={index}>
                  <PricingCard
                    plan={plan}
                    handleModalOpen={handleModalOpen}
                    handleShow={handleShow}
                    open={open}
                  />
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
