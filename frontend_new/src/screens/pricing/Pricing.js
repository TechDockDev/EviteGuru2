import { Box, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PricingCard from "./PricingCard";
import Faqs from "./Faqs";
import axios from "axios";
import { Constants } from "../../redux/constants/action-types";
import { useDispatch, useSelector } from "react-redux";
import { openSnackbar } from "../../redux/action/userActions";

function Pricing() {
  const { userDetail } = useSelector((state) => state);
  const dispatch = useDispatch();
  // ==================================
  // console.log("userDetails=>", userDetail);
  const [allPlans, setallPlans] = useState();
  const [allFaqs, setAllFaqs] = useState([]);
  const [loading, setLoading] = useState({
    faqsLoading: false,
    plansLoading: false,
  });
  const [open, setOpen] = useState(false);
  const [browsePlanDetails, setBrowsePlanDetails] = useState(null);
  const handleShow = () => setOpen(!open);
  const handleModalOpen = (plan) => {
    setBrowsePlanDetails(plan);
  };

  // ====endOf getAllFaqs =======
  const getAllFaqs = async () => {
    setLoading({ ...loading, faqsLoading: true });
    try {
      const res = await axios.get(`${Constants.URL}/faq/get`);
      if (res.status === 200) {
        // console.log("response=>", res);
        setAllFaqs(res?.data?.faqs);
        setLoading({ ...loading, faqsLoading: false });
      }
    } catch (error) {
      setLoading({ ...loading, faqsLoading: false });
      // console.log("error=>", error);
      dispatch(openSnackbar("something went wrong", "error"));
    }
  };
  // ====get subscritpiton list
  const getAllSubscritptions = async () => {
    setLoading({ ...loading, plansLoading: true });
    try {
      const res = await axios.get(`${Constants.URL}/plan/all`);
      if (res.status === 200) {
        // console.log("res=>", res?.data?.plans);
        setLoading({ ...loading, plansLoading: false });
        setallPlans(res?.data?.plans);
      }
    } catch (error) {
      console.log("error=>", error);
      setLoading({ ...loading, plansLoading: false });
    }
  };
  // ===========================
  useEffect(() => {
    getAllSubscritptions();
    getAllFaqs();
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
        <Grid container justifyContent={"center"} alignItems={"center"} sx={{}}>
          {loading?.plansLoading ? (
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px",
              }}
            >
              <CircularProgress
                color="primary"
                sx={{
                  bgcolor: "transparent !important",
                  "& svg": {
                    bgcolor: "transparent !important",
                  },
                }}
              />{" "}
            </Grid>
          ) : (
            allPlans &&
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
            })
          )}
        </Grid>
      </Stack>
      <Stack p={1} mt={2} alignItems={"center"}>
        {loading?.faqsLoading ? (
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <CircularProgress
              color="primary"
              sx={{
                bgcolor: "transparent !important",
                "& svg": {
                  bgcolor: "transparent !important",
                },
              }}
            />{" "}
          </Grid>
        ) : (
          <Faqs content={allFaqs} />
        )}
      </Stack>
    </Box>
  );
}

export default Pricing;
