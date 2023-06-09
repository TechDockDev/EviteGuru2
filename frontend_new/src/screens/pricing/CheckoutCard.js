import {
  Button,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const CheckoutCard = (props) => {
  const proceedToPay = async (plantId, type) => {
    await props?.handlePurchase(plantId, type);
  };
  return (
    <>
      <Card
        sx={{
          minWidth: 280,
          backdropFilter: "blur(2px)",
          background: "rgba(149, 99, 255, 1)",
          // background:
          //   "linear-gradient(223.5deg, rgb(172 148 224 / 45%) 2.5%, rgba(240, 240, 240, 0.5) 98%) ",
          background:
            "radial-gradient(circle, rgb(172 148 224 /65%) 2.5%, rgba(240, 240, 240, 1) 98%) ",
          mixBlendMode: "darken",
        }}
      >
        <CardContent>
          <Stack mb={1} spacing={1}>
            <Typography
              sx={{
                fontWeight: "bolder",
              }}
              variant="h5"
            >
              {props?.checkOutInfo?.plan?.name}{" "}
              <span style={{ fontSize: "14px", color: "rgba(87, 87, 87, 1)" }}>
                {`(${props?.checkOutInfo?.requestType}ly)`}
              </span>
            </Typography>
            <Typography
              variant="body2"
              component={"p"}
              fontWeight={"400"}
              fontSize={"18px"}
              sx={{ color: "rgba(87, 87, 87, 1)", marginTop: "0px" }}
            >
              {props?.checkOutInfo?.plan?.guestLimit} Guest|{" "}
              {props?.checkOutInfo?.plan?.templateLimit} Template
            </Typography>
          </Stack>
          <Divider
            sx={{
              "&.MuiDivider-root": {
                borderColor: "rgba(116, 116, 116, 1)",
              },
            }}
          />
          <List>
            <ListItem
              alignItems="flex-start"
              secondaryAction={
                <Typography sx={{ fontWeight: "bolder" }} aria-label="comment">
                  $
                  <span style={{ textDecoration: "line-through" }}>
                    {
                      props?.checkOutInfo?.plan?.price[
                        `${props?.checkOutInfo?.requestType}ly`
                      ]
                    }
                  </span>
                </Typography>
              }
            >
              <ListItemText sx={{ fontWeight: "bolder" }}>
                Total Amount
              </ListItemText>
            </ListItem>
            <ListItem
              alignItems="flex-start"
              secondaryAction={
                <Typography sx={{ fontWeight: "bolder" }} aria-label="comment">
                  <span
                    style={{ fontSize: "10px", color: "rgba(0, 160, 83, 1)" }}
                  >
                    {props?.discountPercent
                      ? `(${props?.discountPercent}%)`
                      : ""}
                  </span>
                  -${props?.discount}
                </Typography>
              }
            >
              <ListItemText sx={{ fontWeight: "bolder" }}>
                Coupon Discount
              </ListItemText>
            </ListItem>
            <ListItem
              alignItems="flex-start"
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <ListItemText sx={{ fontWeight: "bolder" }}>
                Effective Amount
              </ListItemText>
              <Typography variant="h6" sx={{ fontWeight: "bolder" }}>
                $
                {props?.checkOutInfo?.plan?.price[
                  `${props?.checkOutInfo?.requestType}ly`
                ] - props?.discount}
              </Typography>
            </ListItem>
          </List>
        </CardContent>
      </Card>
      <Button
        disableElevation
        variant="contained"
        // fullWidth
        sx={{ mt: 1, color: "white" }}
        onClick={() =>
          proceedToPay(
            props?.checkOutInfo?.plan?._id,
            props?.checkOutInfo?.requestType
          )
        }
      >
        Proceed To Pay
      </Button>
      {/* {console.log("plan id..", props?.checkOutInfo?.plan?._id)} */}
    </>
  );
};

export default CheckoutCard;
