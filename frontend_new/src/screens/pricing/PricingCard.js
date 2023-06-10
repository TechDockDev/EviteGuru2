import {
  Button,
  Card,
  CardActions,
  CardContent,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

import React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AiFillCheckCircle } from "react-icons/ai";
import axios from "axios";
import { Constants } from "../../redux/constants/action-types";
import { useDispatch, useSelector } from "react-redux";
import { openSnackbar } from "../../redux/action/userActions";
import LogInModal from "../LoginModal/LogInModal";
import RegisterModal from "../RegisterModal/RegisterModal";

const PricingCard = (props) => {
  const { userDetail } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setopen] = useState(false);
  const [registerOpen, setregisterOpen] = useState(false);
  const toggleRegisterModal = () => {
    setregisterOpen(!registerOpen);
  };
  const toggleLoginModal = () => {
    setopen(!open);
  };
  // =====handlePurchase =======
  const handlePurchasePlan = async (plan, type) => {
    if (userDetail?.isUser) {
      try {
        // const res = await axios.post(`${Constants.URL}/plan/purchase`, {
        //   planId: planId,
        //   planType: type,
        // });
        // window.location.href = res.data.url;
        navigate("/discount", { state: { plan: plan, requestType: type } });
      } catch (error) {
        console.log("error=>", error);
      }
    } else {
      toggleLoginModal();
      dispatch(openSnackbar("You are not logged in, please login", "error"));
    }
  };

  // ===endOf handlePurchase ===

  const handleNavigate = () => {
    toggleLoginModal();
    dispatch(openSnackbar("You are not logged in, please login", "error"));
  };
  return (
    <>
      <Card
        elevation={userDetail?.subscription?._id === props?.plan?._id ? 24 : 4}
        sx={{
          mt: 1,
          minWidth: " 300px",
          backgroundColor: "#FAFAFA",
          borderRadius: "8px",
          padding: "10px 10px",
          bgcolor: "#FAFAFA",
          boxSizing: "border-box",
        }}
      >
        <CardContent>
          <Stack
            alignItems={"center"}
            sx={{ borderBottom: "2px solid rgba(159, 159, 159, 1)" }}
          >
            <Typography
              color="rgba(121, 93, 168, 1)"
              variant="h4"
              fontSize={"28px"}
              fontWeight={"800"}
              textTransform={"capitalize"}
              mb={1}
            >
              {props?.plan?.name}
            </Typography>
          </Stack>
          {props?.plan?.price ? (
            <Typography
              variant="body2"
              component={"p"}
              fontWeight={"600"}
              fontSize={"14px"}
              textAlign={"center"}
              mt={1}
            >
              Guest Limit : {props?.plan?.guestLimit} | Template Limit :{" "}
              {props?.plan?.templateLimit}
            </Typography>
          ) : (
            ""
          )}

          <List sx={{ mt: 1 }}>
            {props?.plan?.description &&
              props?.plan?.description?.map((item, index) => {
                // console.log("plan=>", props?.plan?._id);
                return (
                  <ListItem disablePadding key={index} sx={{ marginY: "5px" }}>
                    <ListItemIcon sx={{ minWidth: "", marginRight: "15px" }}>
                      {/* {item.status ? ( */}
                      <AiFillCheckCircle
                        style={{
                          color: "rgba(59, 40, 91, 1)",
                          fontSize: "20px",
                        }}
                      />
                    </ListItemIcon>

                    <ListItemText
                      primaryTypographyProps={{
                        sx: {
                          fontFamily: "Poppins",
                          color: "#333333",
                        },
                      }}
                      primary={item}
                    />
                  </ListItem>
                );
              })}
          </List>
        </CardContent>
        {userDetail?.subscription?._id === props?.plan?._id ? (
          <CardActions>
            <Button variant="outlined" color="success" fullWidth>
              CURRENT PLAN
            </Button>
          </CardActions>
        ) : (
          <CardActions>
            {props?.plan?.price ? (
              <Stack width={"100%"} spacing={1}>
                <Button
                  disableElevation
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: "#795DA8",
                    color: "white",
                    textTransform: "none",
                    p: 1,
                  }}
                  onClick={() => handlePurchasePlan(props?.plan, "month")}
                >
                  $ {props?.plan?.price?.monthly} -/ Month
                </Button>
                <Button
                  disableElevation
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: "rgba(59, 40, 91, 1)",
                    color: "white",
                    textTransform: "none",
                    p: 1,
                  }}
                  onClick={() => handlePurchasePlan(props?.plan, "year")}
                >
                  $ {props?.plan?.price?.yearly} -/ Year
                </Button>
              </Stack>
            ) : (
              <Button
                variant="outlined"
                fullWidth
                color="primary"
                onClick={
                  userDetail?.isUser
                    ? () => navigate("/enterprise")
                    : () => handleNavigate()
                }
              >
                Contact Us
              </Button>
            )}
          </CardActions>
        )}
      </Card>
      <LogInModal
        openLoginModal={open}
        toggleLogInModal={toggleLoginModal}
        toggleRegisterModal={toggleRegisterModal}
        setOpenLoginModal={setopen}
      />
      <RegisterModal
        openRegisterModal={registerOpen}
        setOpenRegisterModal={setregisterOpen}
      />
    </>
  );
};

export default PricingCard;
