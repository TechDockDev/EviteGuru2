import {
  Box,
  Button,
  Paper,
  Typography,
  Grid,
  Input,
  Stack,
  Checkbox,
  TextField,
  Autocomplete,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link as RouterLink, useNavigate, NavLink } from "react-router-dom";

import { FormProvider, useForm } from "react-hook-form";
import SingleInput from "./SingleInput";
const defaultValues = {
  textValue: "",

  dropdownValue: "One",
  sliderValue: 0,
};

export const AddSubAdmins = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    permission: [],
    superAdmin: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [arrayPermission, setArrayPermission] = useState([]);
  const addSubAdmin = async (res, req) => {
    try {
      const { data } = await axios.post("/admin/create-subadmin", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        permission: formData.permission,
        superAdmin: formData.superAdmin,
      });

      // setAddPlan(req.data);
      console.log("singleData->", data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e, index) => {
    if (e.target.name === "permission") {
      let tempPerm = [...formData.permission];
      tempPerm[index] = e.target.value;
      setFormData({ ...formData, permission: tempPerm });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      console.log(formData);
    }
  };
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const methods = useForm({ defaultValues: defaultValues });

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log("daata", arrayPermission);
    arrayPermission.forEach(function (obj) {
      formData.permission.push(obj.permission);
    });
    // console.log(formData.permission);
    addSubAdmin(
      formData.name,
      formData.email,
      formData.password,
      formData.phone,
      formData.permission,
      formData.superAdmin
    );
    navigate("/admin/admin_list");
  };

  useEffect(() => {
    addSubAdmin(
      formData.name,
      formData.email,
      formData.password,
      formData.phone,
      formData.permission,
      formData.superAdmin
    );
  }, []);

  return (
    <Stack width="100%" margin="auto" alignItems={"center"} p={2}>
      <Paper
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          p: 2,
          bgcolor: "white",
          width: "80%",

          borderRadius: "20px",
        }}
        elevation={10}
      >
        {/* title */}
        <Typography
          variant="h4"
          align="center"
          fontWeight="800"
          mb={2}
          sx={{
            color: "#795da8",
            width: "100%",
          }}
        >
          Add Admins
        </Typography>
        {/* title */}

        {/* form element */}

        <Grid
          // border="1px solid green"
          width="90%"
          p={1}
          container
          component="form"
          onSubmit={submitHandler}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {/* == 👇 Plan Name 👇  ==*/}
          <SingleInput
            labelText={"Sub Name"}
            inputType={"text"}
            inputName={"name"}
            inputValue={formData.name}
            onChangeHandler={handleChange}
            labelInputId={"name"}
            requiredTrue={true}
            placeholderText={"Sub admin name"}
          />
          {/* == 👆 Plan Name 👆   ==*/}

          {/* == 👇 email 👇  ==*/}
          <SingleInput
            labelText={"Email"}
            inputType={"email"}
            inputName={"email"}
            inputValue={formData.email}
            onChangeHandler={handleChange}
            labelInputId={"email"}
            requiredTrue={true}
            placeholderText={"Enter email"}
          />
          {/* == 👆 email   ==*/}

          {/* == 👇 password 👇  ==*/}
          <SingleInput
            labelText={"Password"}
            inputType={"text"}
            inputName={"password"}
            inputValue={formData.password}
            onChangeHandler={handleChange}
            labelInputId={"password"}
            requiredTrue={true}
            placeholderText={"set Password"}
          />
          {/* == 👆 password   ==*/}

          {/* == 👇 Phone 👇  ==*/}
          <SingleInput
            labelText={"Phone"}
            inputType={"number"}
            inputName={"phone"}
            inputValue={formData.phone}
            onChangeHandler={handleChange}
            labelInputId={"phone"}
            requiredTrue={true}
            placeholderText={"Enter Phone No."}
          />
          {/* == 👆 Phone   ==*/}

          {/* == 👇 superAdmin 👇  ==*/}
          <Grid container mt={2}>
            <Grid
              component={"label"}
              htmlFor={"superAdmin"}
              item
              xl={4}
              lg={4}
              md={4}
              sm={4}
              xs={12}
              sx={{
                fontFamily: "Montserrat",
                fontSize: "20px",
                display: "flex",
                alignItems: "center",
              }}
            >
              Super Admin *
            </Grid>
            <Grid
              component={"select"}
              required={true}
              name="superAdmin"
              value={formData.superAdmin}
              onChange={handleChange}
              id={"superAdmin"}
              item
              xl={8}
              lg={8}
              md={8}
              sm={8}
              xs={12}
              sx={{
                height: "50px",
                outline: "none",
                border: "1px solid black",
                borderRadius: "8px",
                paddingX: "10px",
                fontSize: "18px",
                "&:focus": { border: "2px solid #795DA8" },
              }}
            >
              <option value={null}>Please choose an option</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </Grid>
          </Grid>
          {/* == 👆 superAdmin   ==*/}

          {/* == 👇 setArrayPermission 👇  ==*/}
          <Grid container mt={2}>
            <Grid
              component={"label"}
              htmlFor={"permission"}
              item
              xl={4}
              lg={4}
              md={4}
              sm={4}
              xs={12}
              sx={{
                fontFamily: "Montserrat",
                fontSize: "20px",
                display: "flex",
                alignItems: "center",
              }}
            >
              Permission *
            </Grid>
            <Autocomplete
              multiple
              id="Permission"
              options={subadminPermission}
              disableCloseOnSelect
              getOptionLabel={(option) => option.permission}
              onChange={(event, value) => setArrayPermission(value)}
              renderOption={(props, option, { selected }) => (
                <li
                  {...props}
                  style={{
                    background: "white",
                    color: "#795da8",
                    fontWeight: "bold",
                  }}
                >
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.permission}
                </li>
              )}
              style={{ width: 500, color: "#795da8" }}
              renderInput={(params) => {
                return (
                  <>
                    <TextField {...params} placeholder="Permission" />
                  </>
                );
              }}
            />
          </Grid>
          {/* == 👆permission  ==*/}

          {/* buttons container */}
          <Grid item mt={2} xs={12} width="100%" textAlign="center">
            <Button
              variant={"contained"}
              type="submit"
              sx={{
                color: "white",
                width: "100%",
                mb: 1,
              }}
              size="large"
            >
              Submit
            </Button>
          </Grid>

          {/* buttons container */}
          <Button
            fullWidth
            variant={"contained"}
            sx={{ color: "white" }}
            component={NavLink}
            to="/admin/admin_list"
          >
            Back
            {/* {plan.buttonText} */}
          </Button>
        </Grid>

        {/* form element */}
      </Paper>
    </Stack>
  );
};

export default AddSubAdmins;

const subadminPermission = [
  { permission: "Template" },
  { permission: "Subscription" },
  { permission: "Users" },
  { permission: "Sub Admin" },
  { permission: "Notifications " },
  { permission: "Coupons" },
];
