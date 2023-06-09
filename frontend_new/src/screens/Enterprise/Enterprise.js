import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { Constants } from "../../redux/constants/action-types";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { openSnackbar, register } from "../../redux/action/userActions";
import Inputs from "./Inputs";
import LogInModal from "../LoginModal/LogInModal";
import RegisterModal from "../RegisterModal/RegisterModal";

const Enterprise = () => {
  const dispatch = useDispatch();
  // === userDetail ================
  const { userDetail } = useSelector((state) => state);
  const [values, setValues] = useState(null);
  const [open, setopen] = useState(false);
  const [registerOpen, setregisterOpen] = useState(false);
  const toggleRegisterModal = () => {
    setregisterOpen(!registerOpen);
  };
  const toggleLoginModal = () => {
    setopen(!open);
  };
  //   handlechange ======
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  console.log("values=>", values);
  //  endof handleChange==
  // ===handlesubmit ===========
  const handleSubmit = async (e) => {
    console.log("working");
    e.preventDefault();
    try {
      if (userDetail?.isUser) {
        if (
          values === null ||
          values?.inviteeLimit == "" ||
          values?.templateLimit == "" ||
          values?.comment == "" ||
          !values?.inviteesLimit ||
          !values?.templateLimit ||
          !values?.email ||
          !values?.phone ||
          !values?.firstName ||
          !values?.lastName
        ) {
          // alert("Please fill all required feilds");
          dispatch(openSnackbar("please fill all required feilds", "warning"));
        } else {
          const res = await axios.post(
            `${Constants.URL}/enterprise/create`,
            values
          );
          if (res.status === 200) {
            console.log("response=>", res);
            dispatch(openSnackbar(res?.data?.message, "success"));
            setValues(null);
            // alert(res.data.message);
          }
        }
      } else {
        // alert("Login First");
        toggleLoginModal();
        dispatch(
          openSnackbar(
            "Your are not logged in , please login first !",
            "warning"
          )
        );
      }
    } catch (error) {
      console.log("error=>", error);
      dispatch(
        openSnackbar("something went wrong , please try again", "error")
      );
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
          fontSize={{ md: "38px", xs: "25px" }}
          fontWeight={"900"}
          textAlign={"center"}
        >
          Evite Guru{" "}
          <span style={{ color: "rgba(121, 93, 168, 1)" }}>Enterprise</span>{" "}
          Plan
        </Typography>
        <Typography
          variant="h6"
          textAlign={"center"}
          fontSize={{ xs: "12px", md: "18px" }}
        >
          Fill in your details and our team will be in touch to get you started
          with your Enterprise
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
            p={2}
          >
            <Grid item sm={11} md={8} xs={12}>
              <Stack
                direction={{ xs: "column", md: "row", sm: "row" }}
                justifyContent={"space-between"}
              >
                <Inputs
                  labelText={"First Name"}
                  inputType={"text"}
                  inputName={"firstName"}
                  labelInputId={"firstName"}
                  inputValue={values?.firstName || ""}
                  onChangeHandler={(e) => handleChange(e)}
                  requiredTrue={true}
                  placeholderText={"Enter First Name"}
                />
                <Inputs
                  labelText={"Last Name"}
                  inputType={"text"}
                  inputName={"lastName"}
                  labelInputId={"lastName"}
                  inputValue={values?.lastName || ""}
                  onChangeHandler={(e) => handleChange(e)}
                  requiredTrue={true}
                  placeholderText={"Enter Last Name"}
                />
              </Stack>
              <Stack
                direction={{ xs: "column", md: "row", sm: "row" }}
                justifyContent={"space-between"}
              >
                <Inputs
                  labelText={"Company"}
                  inputType={"text"}
                  inputName={"company"}
                  labelInputId={"company"}
                  inputValue={values?.company || ""}
                  onChangeHandler={(e) => handleChange(e)}
                  // requiredTrue={true}
                  placeholderText={"Enter Company"}
                />
                <Inputs
                  labelText={"Title"}
                  inputType={"text"}
                  inputName={"title"}
                  labelInputId={"title"}
                  inputValue={values?.title || ""}
                  onChangeHandler={(e) => handleChange(e)}
                  // requiredTrue={true}
                  placeholderText={"Enter Title"}
                />
              </Stack>
              <Stack
                direction={{ xs: "column", md: "row", sm: "row" }}
                justifyContent={"space-between"}
              >
                <Inputs
                  labelText={"Work Email"}
                  inputType={"email"}
                  inputName={"email"}
                  labelInputId={"email"}
                  inputValue={values?.email || ""}
                  onChangeHandler={(e) => handleChange(e)}
                  requiredTrue={true}
                  placeholderText={"Enter Work Email"}
                />
                <Inputs
                  labelText={"Phone Number"}
                  inputType={"phone"}
                  inputName={"phone"}
                  labelInputId={"phone"}
                  inputValue={values?.phone || ""}
                  onChangeHandler={(e) => handleChange(e)}
                  requiredTrue={true}
                  placeholderText={"Enter Phone Number"}
                />
              </Stack>
              <Stack
                direction={{ xs: "column", md: "row", sm: "row" }}
                justifyContent={"space-between"}
              >
                <Inputs
                  labelText={"Template Limit"}
                  inputType={"number"}
                  inputName={"templateLimit"}
                  labelInputId={"templateLimit"}
                  inputValue={values?.templateLimit || ""}
                  onChangeHandler={(e) => handleChange(e)}
                  requiredTrue={true}
                  placeholderText={"Enter Required Numbers of Templates"}
                />
                <Inputs
                  labelText={"Invitees Limit"}
                  inputType={"number"}
                  inputName={"inviteesLimit"}
                  labelInputId={"inviteesLimit"}
                  inputValue={values?.inviteesLimit || ""}
                  onChangeHandler={(e) => handleChange(e)}
                  requiredTrue={true}
                  placeholderText={"Enter Required Numbers of Invitees"}
                />
              </Stack>
              <Stack justifyContent={"center"} alignItems={"center"}>
                <Inputs
                  labelText={"Comment or other message (if any)"}
                  inputType={"textarea"}
                  inputName={"comment"}
                  inputValue={values?.comment || ""}
                  onChangeHandler={(e) => handleChange(e)}
                  labelInputId={"comment"}
                  requiredTrue={false}
                  placeholderText={"Enter your message"}
                  rows={"3"}
                />
              </Stack>

              <Stack
                mt={2}
                justifyContent={"center"}
                alignContent={"center"}
                alignItems={"center"}
              >
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ color: "white", px: 4, borderRadius: "4px", py: 1 }}
                  type="submit"
                  disableElevation
                >
                  Submit your request
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Stack>
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
    </Box>
  );
};

export default Enterprise;
