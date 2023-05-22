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

const ActiveCardInfo = () => {
  return (
    <Card
      sx={{
        minWidth: 275,
        bgcolor: "transparent",
        borderRadius: "16px",
        py: 2,
      }}
      elevation={18}
    >
      <CardContent sx={{ justifyContent: "space-between" }}>
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
          Single Mailing Mode
        </Typography>
        <Stack alignItems={"center"} justifyContent={"center"}>
          <Typography>Invitees - 40</Typography>
          <Typography>Templates - 10</Typography>
          <Typography variant="h6">Expires on 15 May 2023</Typography>
        </Stack>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button
          size="small"
          variant="contained"
          sx={{ color: "white", py: 1 }}
          onClick={() => {}}
        >
          Change Plan
        </Button>
      </CardActions>
    </Card>
  );
};

export default ActiveCardInfo;
