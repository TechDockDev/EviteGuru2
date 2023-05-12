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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React from "react";
import HttpsIcon from '@mui/icons-material/Https';

const PricingCard = (props) => {
  return (
    <Card
      sx={{
        minWidth: 275,
        backgroundColor: "#FAFAFA",
        boxShadow: "0px 6px 25px",
      }}
    >
      <CardContent>
        <Stack
          alignItems={"center"}
          sx={{ borderBottom: "2px solid rgba(159, 159, 159, 1)" }}
          p={1}
        >
          <Typography
            color="rgba(121, 93, 168, 1)"
            variant="h4"
            fontWeight={"800"}
          >
            {props?.plan?.name}
          </Typography>
        </Stack>

        <Typography
          variant="body2"
          component={"p"}
          fontSize={"600"}
          textAlign={"center"}
          mt={1}
        >
          {props?.plan?.description}
        </Typography>

        <List sx={{ mt: 3 }}>
          {props?.plan?.features &&
            props?.plan?.features?.map((item, index) => {
              return (
                <ListItem disablePadding key={index}>
                  <ListItemIcon>
                    {item.status ? (
                      <CheckCircleIcon
                        sx={{ color: "rgba(59, 40, 91, 1)", fontSize: "30px" }}
                      />
                    ) : (
                      <HttpsIcon
                        sx={{
                          color: "rgba(164, 164, 164, 1)",
                          fontSize: "30px",
                        }}
                      />
                    )}
                  </ListItemIcon>

                  <ListItemText
                    sx={{
                      wordSpacing: "8px",
                      p: "0px",
                    }}
                    primary={item?.name}
                  />
                </ListItem>
              );
            })}
        </List>
      </CardContent>
      <CardActions>
        {props?.plan?.price ? (
          <Stack width={"100%"} spacing={1}>
            <Button
              // size="small"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "rgba(59, 40, 91, 1)",
                color: "white",
                p: 1,
              }}
            >
              {props?.plan?.price?.month}
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "rgba(59, 40, 91, 1)",
                color: "white",
                p: 1,
              }}
            >
              {props?.plan?.price?.year}
            </Button>
          </Stack>
        ) : (
          <Button variant="outlined" fullWidth color="primary">
            Contact Us
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default PricingCard;
