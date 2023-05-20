import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const DealsAndOffers = () => {
  const [value, setValue] = useState({});
  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  return (
    <Stack direction={"column"} spacing={3} m={3}>
      <Typography variant="h5">Send Promotions</Typography>
      <TextField placeholder="Subject" onChange={handleChange} />
      <TextField
        multiline
        rows={10}
        placeholder="Body"
        onChange={handleChange}
      />
      <Button variant="contained" sx={{ color: "white" }}>
        Next
      </Button>
    </Stack>
  );
};

export default DealsAndOffers;
