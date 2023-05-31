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
import { useSelector } from "react-redux";

const PricingCard = (props) => {
  const { userDetail } = useSelector((state) => state);
  const navigate = useNavigate();
  // =====handlePurchase =======
  const handlePurchasePlan = async (planId, type) => {
    try {
      const res = await axios.post(`${Constants.URL}/plan/purchase`, {
        planId: planId,
        planType: type,
      });
      window.location.href = res.data.url;
    } catch (error) {
      console.log("error=>", error);
    }
  };
  // ===endOf handlePurchase ===
  return (
    <Card
      elevation={userDetail?.subscription?._id === props?.plan?._id ? 24 : 4}
      sx={{
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

        <List sx={{ mt: 1 }}>
          {props?.plan?.description &&
            props?.plan?.description?.map((item, index) => {
              console.log("plan=>", props?.plan?._id);
              return (
                <ListItem disablePadding key={index} sx={{ marginY: "5px" }}>
                  <ListItemIcon sx={{ minWidth: "", marginRight: "15px" }}>
                    {/* {item.status ? ( */}
                    <AiFillCheckCircle
                      style={{ color: "rgba(59, 40, 91, 1)", fontSize: "20px" }}
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
                onClick={() => handlePurchasePlan(props?.plan?._id, "month")}
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
                onClick={() => handlePurchasePlan(props?.plan?._id, "year")}
              >
                $ {props?.plan?.price?.yearly} -/ Year
              </Button>
            </Stack>
          ) : (
            <Button variant="outlined" fullWidth color="primary">
              Contact Us
            </Button>
          )}
        </CardActions>
      )}
    </Card>
  );
};

export default PricingCard;
