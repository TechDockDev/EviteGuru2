import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ActiveCardInfo = () => {
  const navigate = useNavigate();
  // ===========================
  const { userDetail } = useSelector((state) => state);
  console.log("userDetail", userDetail);
  return (
    <Card
      sx={{
        minWidth: 275,
        bgcolor: "transparent",
        borderRadius: "16px",
        py: 2,
        boxShadow: "0px 2px 24px -1px rgb(0 0 0 / 10%)",
      }}
      // elevation={18}
    >
      <CardContent sx={{ justifyContent: "space-between" }}>
        {userDetail?.subscription ? (
          <>
            <Typography
              variant="h5"
              fontWeight={"600"}
              textAlign={"center"}
              color="text.secondary"
              gutterBottom
            >
              Your Current Plan
            </Typography>
            <Divider />
            <Typography
              mt={1}
              textAlign={"center"}
              fontWeight={"600"}
              sx={{ color: "rgba(81, 81, 81, 1)" }}
            >
              {userDetail?.subscription?.name}
            </Typography>
            <Stack alignItems={"center"} justifyContent={"center"} mt={1}>
              <Typography mt={1}>Invitees - {userDetail?.guestNum}</Typography>
              <Typography mt={1}>
                Templates - {userDetail?.templateNum}
              </Typography>
              <Typography variant="h6" mt={1} fontSize={"15px"}>
                Expiry :{" "}
                <span style={{ color: "red", fontSize: "15px" }}>
                  {userDetail?.planEndDate}{" "}
                </span>
              </Typography>
            </Stack>
          </>
        ) : (
          <Typography variant="h6" textAlign={"center"}>
            No Active Plans
          </Typography>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button
          size="small"
          variant="contained"
          sx={{ color: "white", py: 1 }}
          onClick={() => {
            navigate("/dashboard/subscriptions");
          }}
        >
          {userDetail?.subscription ? "CHANGE PLAN" : "GET A PLAN"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ActiveCardInfo;
