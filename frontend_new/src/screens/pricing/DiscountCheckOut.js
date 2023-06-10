import styled from "@emotion/styled";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import Coupons from "../Coupons/Coupons";
import { useEffect } from "react";
import { CiDiscount1 } from "react-icons/ci";
import CheckoutCard from "./CheckoutCard";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../redux/action/userActions";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Constants } from "../../redux/constants/action-types";
import copy from "copy-to-clipboard";

const DiscountCheckOut = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const navigate = useNavigate();
  // console.log("state", state);
  const [applied, setApplied] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [message, setMessage] = useState({
    message: "Not Applied Yet",
    type: "warning",
  });

  const handleApplyCoupon = async () => {
    try {
      if (couponCode !== "") {
        const res = await axios.post(`${Constants.URL}/coupon/apply-coupon`, {
          couponText: couponCode,
          planId: state?.plan?._id,
          planType: state?.requestType,
        });
        if (res?.status === 200) {
          // console.log("response=>", res);
          setDiscount(Number(res?.data?.discountedPrice));
          if (res?.data?.discountPercentage) {
            setDiscountPercent(Number(res?.data?.discountPercentage));
          } else {
            setDiscountPercent(0);
          }
          dispatch(openSnackbar(res?.data?.message, "success"));
          setMessage({
            ...message,
            type: "success",
            message: "Coupon Applied",
          });
          setApplied(true);
        }
      } else {
        setApplied(false);
        setDiscount(0);
        setMessage({
          ...message,
          type: "error",
          message: "No coupon code provided *",
        });
        dispatch(openSnackbar("Provide a coupon code to apply!", "error"));
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        dispatch(openSnackbar(error?.response?.data?.message, "error"));
      } else {
        dispatch(openSnackbar("error", "error"));
        console.log("error=>", error);
      }
    }
  };

  const handleRemoveCoupon = async () => {
    try {
      setCouponCode("");
      dispatch(openSnackbar("Coupon Removed!", "success"));
      setMessage({ ...message, type: "warning", message: "Coupon Removed" });
      setApplied(false);
    } catch (error) {}
  };

  // ====== handlePurchase =========
  const handlePurchase = async (planId, type) => {
    try {
      const res = await axios.post(`${Constants.URL}/plan/purchase`, {
        planId: planId,
        planType: type,
        couponText: couponCode,
      });
      window.location.href = res.data.url;
    } catch (error) {
      dispatch(openSnackbar("something went wrong", "error"));
    }
  };
  // ======endOfHandlePurchase =====

  // ====get All coupons ==========
  const getCoupons = async () => {
    try {
      const res = await axios.get(
        `${Constants.URL}/coupon/get-by-plan/${state?.plan?.name}`
      );
      if (res.status === 200) {
        // console.log("response=>", res);
        setCoupons(res?.data?.coupon);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  // ======endOf get All coupons ==

  // function to copy text to the clipboard
  const copyToClipboard = (copyText) => {
    // dispatch(openSnackbar(`copied text -> : ${copyText}`, "success"));
    dispatch(openSnackbar(`copied: ${copyText}`, "success"));
    setCouponCode(copyText);

    copy(`${copyText}`);
    setMessage({ ...message, type: "warning", message: "Click to Apply" });
    setApplied(false);
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (state) {
      scrollToTop();
      getCoupons();
    } else {
      navigate("/");
    }
    return () => {
      setDiscount(0);
    };
  }, []);

  return (
    <Box
      sx={{
        marginTop: { md: "85px", xs: "70px" },
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
      }}
      component={Container}
    >
      <Stack mt={4} alignItems={"center"}>
        <Typography
          mt={{ md: 4, xs: 0 }}
          variant="h5"
          fontSize={{ md: "38px" }}
          fontWeight={"900"}
        >
          Let’s Make Payment
        </Typography>
        <Typography
          variant="body2"
          component={"p"}
          fontSize={{ xs: "12px", md: "18px" }}
          width={"70%"}
          textAlign={"center"}
          sx={{ fontStretch: "condensed" }}
        >
          To start your subscription, input your card details to make payment.
          You will be redirected to your banks authorization page .
        </Typography>
      </Stack>
      <Stack
        mt={1}
        width={{
          md: "100%",
          xs: "80%",
          sm: "100%",
          lg: "80%",
          margin: "10px auto",
        }}
      >
        <Grid
          Container
          p={1}
          // bgcolor={"red"}
          display={"flex"}
          direction={{ md: "row", sm: "row", xs: "column" }}
          justifyContent={"space-between"}
        >
          <Grid
            item
            xs={12}
            md={8}
            lg={8}
            sm={6}
            // bgcolor={"green"}
          >
            <FormControl
              sx={{
                mt: 1,
                width: { lg: "90%", md: "90%", sm: "95%", xs: "100%" },
                bgcolor: "transparent",
                borderRadius: "16px",
                border: "transparent",
              }}
              variant="standard"
              focused
              fullWidth
            >
              <InputLabel htmlFor="standard-adornment-password" sx={{ mb: 1 }}>
                Promo Code
              </InputLabel>
              <Input
                disabled={applied ? true : false}
                id="standard-adornment-password"
                type={"text"}
                size="small"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                fullWidth
                sx={{
                  bgcolor: "rgba(238, 238, 238, 1)",
                  p: 1,
                  borderRadius: "10px",
                  borderBottom: "2px solid rgba(149, 99, 255, 1)",
                  "& .MuiInput-underline": {
                    display: "none",
                    border: "none",
                  },
                  "&::after": {
                    border: "none",
                  },
                  "&::before": {
                    border: "none",
                  },
                  "&:hover:not(.Mui-disabled, .Mui-error):before": {
                    border: "none",
                  },
                  "&.Mui-disabled": {
                    color: "transparent",
                  },
                }}
                placeholder={applied ? "" : "Apply Promo Code !"}
                startAdornment={
                  applied ? (
                    <InputAdornment
                      position="start"
                      sx={{
                        fontSize: "20px",
                        color: "rgba(59, 40, 91, 1)",
                        fontWeight: "400",
                      }}
                    >
                      <CiDiscount1 />
                      {/* {couponCode} */}
                    </InputAdornment>
                  ) : (
                    ""
                  )
                }
                endAdornment={
                  <InputAdornment position="end">
                    <Button
                      aria-label="toggle password visibility"
                      variant="text"
                      sx={{ fontWeight: "800" }}
                      onClick={
                        applied
                          ? () => handleRemoveCoupon()
                          : () => handleApplyCoupon()
                      }
                    >
                      {applied ? (
                        <Typography variant="caption" fontWeight={"bolder"}>
                          Remove
                        </Typography>
                      ) : (
                        <Typography variant="caption" fontWeight={"bolder"}>
                          Apply
                        </Typography>
                      )}
                    </Button>
                  </InputAdornment>
                }
              />
            </FormControl>
            {message?.message ? (
              <Typography
                mt={1}
                sx={{
                  color:
                    message?.type === "success"
                      ? "rgba(0, 160, 83, 1)"
                      : message?.type === "error"
                      ? "red"
                      : "#ff5722",
                }}
              >
                {message?.message}
              </Typography>
            ) : (
              ""
            )}

            <Grid
              item
              container
              mt={2}
              spacing={1}
              display={"flex"}
              direction={{ md: "row", xs: "column" }}
              justifyContent={{ xs: "center", md: "space-around" }}
              alignItems={"center"}
              alignContent={"center"}
            >
              {coupons &&
                coupons?.map((coupon, index) => {
                  return (
                    <Grid item xs={12} sm={12} md={6} key={index}>
                      <Coupons details={coupon} copyCode={copyToClipboard} />
                    </Grid>
                  );
                })}
            </Grid>
          </Grid>
          <Grid
            item
            container
            xs={12}
            md={3}
            lg={3}
            sm={6}
            display={"flex"}
            justifyContent={"center"}
            flexDirection={"column"}
            alignContent={"center"}
            alignItems={{ xs: "center", md: "center", sm: "flex-start" }}
            mt={{ xs: 2, md: 0, sm: 3, lg: 0 }}
          >
            <CheckoutCard
              checkOutInfo={state}
              discount={discount}
              handlePurchase={handlePurchase}
              applied={applied}
              discountPercent={discountPercent}
            />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
};

export default DiscountCheckOut;
