import {
  Button,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import SmsIcon from "@mui/icons-material/Sms";

const PromotionalMail = () => {
  const navigate = useNavigate();
  const [type, setType] = React.useState(() => "mail");
  const [value, setValue] = useState({});
  const handleDevices = (event, newDevices) => {
    if (newDevices.length) {
      setType(newDevices);
    }
  };
  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const saveEmail = () => {
    sessionStorage.clear();
    sessionStorage.setItem("email", JSON.stringify(value));
    navigate("/admin/send-promotion-message");
  };

  const saveMessage = () => {
    sessionStorage.clear();
    sessionStorage.setItem("message", JSON.stringify(value));
    navigate("/admin/send-promotion-message");
  };
  return (
    <Stack direction={"column"} spacing={3} m={3}>
      <Typography variant="h5">Send Promotions</Typography>
      <ToggleButtonGroup
        value={type}
        onChange={handleDevices}
        aria-label="device"
        exclusive
      >
        <ToggleButton
          value="mail"
          aria-label="mail"
          sx={{
            "&.MuiToggleButton-root": {
              color: "black",
            },
            "&.Mui-selected": {
              backgroundColor: "#795DA8",
              color: "white",
            },
          }}
        >
          <EmailIcon />
        </ToggleButton>
        <ToggleButton
          value="sms"
          aria-label="sms"
          sx={{
            "&.MuiToggleButton-root": {
              color: "black",
            },
            "&.Mui-selected": {
              backgroundColor: "#795DA8",
              color: "white",
            },
          }}
        >
          <SmsIcon />
        </ToggleButton>
      </ToggleButtonGroup>
      {type === "mail" ? (
        <>
          <TextField
            placeholder="Subject"
            name="subject"
            onChange={handleChange}
            required
          />
          <TextField
            multiline
            rows={10}
            name="body"
            placeholder="Body"
            onChange={handleChange}
            required
          />
        </>
      ) : (
        <TextField
          multiline
          rows={10}
          name="message"
          placeholder="Message"
          onChange={handleChange}
        />
      )}
      <Button
        variant="contained"
        sx={{ color: "white" }}
        onClick={type === "mail" ? saveEmail : saveMessage}
      >
        Next
      </Button>
    </Stack>
  );
};

export default PromotionalMail;
