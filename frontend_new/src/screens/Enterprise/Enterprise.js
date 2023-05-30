import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Constants } from "../../redux/constants/action-types";
import axios from "axios";

const Enterprise = () => {
  const [values, setValues] = useState({});

  //   handlechange ======
  const handleChange = (e) => {
    console.log("values=>", values);
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  //  endof handleChange==
  // ===handlesubmit ===========
  const handleSubmit = async (e) => {
    console.log("working");
    e.preventDefault();
    try {
      if (
        values === {} ||
        values?.inviteeLimit === "" ||
        values?.templateLimit === ""
      ) {
        alert("Please fill all required feilds");
      } else {
        const res = await axios.post(
          `${Constants.URL}/enterprise/create`,
          values
        );
        if (res.status === 200) {
          console.log("response=>", res);
          setValues(null);
          alert(res.data.message);
        }
      }
    } catch (error) {
      console.log("error=>", error);
    }
  };
  // ==endOf handleSubmit ======
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
          Evite Guru Enterprise
        </Typography>
        <Typography variant="h6" fontSize={{ xs: "12px", md: "18px" }}>
          Customize your requirement and send below to contact us.
        </Typography>
        <Typography variant="h6" fontSize={{ xs: "12px", md: "18px" }}>
          Make sure you are logged in
        </Typography>
      </Stack>
      <Stack>
        <Box
          component={"form"}
          p={2}
          alignItems={"center"}
          onSubmit={handleSubmit}
        >
          <Grid
            container
            display={"flex"}
            alignContent={"center"}
            justifyContent={"center"}
            mt={1}
          >
            <Grid
              item
              sm={8}
              md={8}
              xs={12}
              lg={6}
              // boxShadow={"#413d3d 0px 2px 6px 3px"}
              border={"0.5px solid rgba(59, 40, 91, 1)"}
              borderRadius={"10px"}
              p={1}
            >
              <Typography variant="h5">Fill This Form</Typography>
              <Stack
                direction={{ xs: "column", md: "row", sm: "row" }}
                p={{ xs: 1, md: 0, sm: 0 }}
              >
                <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                  <TextField
                    id="standard-adornment-password"
                    label="Template Limit *"
                    name="templateLimit"
                    value={values?.templateLimit ? values.templateLimit : ""}
                    onChange={handleChange}
                    placeholder="Enter Template Limit"
                    type="number"
                    size="small"
                  />
                </FormControl>
                <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                  <TextField
                    id="standard-adornment-password"
                    label="Invitees limit *"
                    name="inviteeLimit"
                    value={values?.inviteeLimit ? values.inviteeLimit : ""}
                    onChange={handleChange}
                    placeholder="Provide Invitees limit"
                    type="number"
                    size="small"
                  />
                </FormControl>
              </Stack>
              <Stack p={1} justifyContent={"center"} alignItems={"center"}>
                <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                  <TextField
                    id="standard-adornment-password"
                    label="Comment *"
                    name="comment"
                    value={values?.comment ? values.comment : ""}
                    onChange={handleChange}
                    placeholder="Your Comments"
                    type="text"
                    multiline
                  />
                </FormControl>
              </Stack>
              <Stack justifyContent={"center"}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ color: "white" }}
                  type="submit"
                >
                  Submit Request
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </Box>
  );
};

export default Enterprise;
