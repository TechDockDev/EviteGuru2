import {
  Box,
  Button,
  Paper,
  Typography,
  Grid,
  Input,
  Stack,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Link as RouterLink,
  useNavigate,
  useParams,
  NavLink,
} from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import SingleInput from "./SingleInput";
const defaultValues = {
  textValue: "",

  dropdownValue: "One",
  sliderValue: 0,
};

export const EditPricingContent = () => {
  const params = useParams();

  let [singleSubscription, setSingleSubscription] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    description: [""],
    price: "",
    withdrawalMonths: "",
    templateLimits: "",
    guestLimits: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo, error } = adminLogin;
  // console.log("inside the edit >", params.id);

  const singleSub = async (res, req) => {
    try {
      const { data } = await axios.get(`/admin/plans/${params.id}`);
      // setSingleSubscription(data.data);

      setFormData({
        name: data.name,
        description: data.description,
        price: data.price,
        withdrawalMonths: data.withdrawalMonths,
        templateLimits: data.templateLimits,
        guestLimits: data.guestLimits,
      });
      // console.log("Inside the Plan", data.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("Single plan list outside the axios >", singleSubscription);

  const editSubscriptions = async (res, req) => {
    try {
      const data = await axios.put(`/admin/plans/${params.id}`, {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        withdrawalMonths: formData.withdrawalMonths,
        templateLimits: formData.templateLimits,
        guestLimits: formData.guestLimits,
      });

      // setAddPlan(req.data);
      // console.log("singleData->", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e, index) => {
    if (e.target.name === "description") {
      let tempDesc = [...formData.description];
      tempDesc[index] = e.target.value;
      setFormData({ ...formData, description: tempDesc });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      console.log(formData);
    }
  };

  // const handleChanges = (event) => {
  //   setWithdrawalMonths(event.target.value);
  // };
  const methods = useForm({ defaultValues: defaultValues });
  const { handleSubmit, reset, control, setValue } = methods;
  // const onSubmit = (data: "csdcsc") => console.log(data);

  const submitHandler = (e) => {
    e.preventDefault();
    editSubscriptions(
      formData.name,
      formData.description,
      formData.price,
      formData.withdrawalMonths,
      formData.templateLimits,
      formData.guestLimits
    );
    navigate("/admin/pricing");
  };

  useEffect(() => {
    singleSub();
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
          Edit Plans
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
            labelText={"Plan Name"}
            inputType={"text"}
            inputName={"name"}
            inputValue={formData.name}
            onChangeHandler={handleChange}
            labelInputId={"name"}
            placeholderText={"Name Plan type"}
          />
          {/* == 👆 Plan Name 👆   ==*/}
          {/* == 👇 Plan Description 👇  ==*/}
          <Stack width="100%">
            {formData.description.map((li, index) => {
              return (
                <SingleInput
                  key={index}
                  labelText={`Description Line ${index + 1}`}
                  inputType={"text"}
                  inputName={"description"}
                  inputValue={formData.description[index]}
                  onChangeHandler={(e) => handleChange(e, index)}
                  labelInputId={"description"}
                  placeholderText={"Plan description"}
                />
              );
            })}
            <Box
              sx={{
                width: "100%",
                textAlign: "right",
              }}
            >
              <IconButton>
                <AddIcon
                  onClick={() => {
                    let temp = [...formData.description];
                    temp.push("");
                    setFormData({ ...formData, description: temp });
                  }}
                />
              </IconButton>
              <IconButton>
                <RemoveIcon
                  onClick={() => {
                    if (formData.description.length !== 1) {
                      let temp = [...formData.description];
                      temp.pop();
                      setFormData({ ...formData, description: temp });
                    } else {
                    }
                  }}
                />
              </IconButton>
            </Box>

            {/* <Button
              onClick={() => {
                let temp = [...formData.description];
                temp.push("");
                setFormData({ ...formData, description: temp });
              }}
            >
              Add more
            </Button> */}
          </Stack>

          {/* == 👆 Plan Description 👆   ==*/}
          {/* == 👇 Price 👇  ==*/}
          <SingleInput
            labelText={"Price"}
            inputType={"number"}
            inputName={"price"}
            inputValue={formData.price}
            onChangeHandler={handleChange}
            labelInputId={"price"}
            placeholderText={"Set Price"}
          />
          {/* == 👆 Price👆   ==*/}
          {/* == 👇 Template Limit 👇  ==*/}
          <SingleInput
            labelText={"Template Limit"}
            inputType={"number"}
            inputName={"templateLimits"}
            inputValue={formData.templateLimits}
            onChangeHandler={handleChange}
            labelInputId={"templateLimits"}
            placeholderText={"Set template limit"}
          />
          {/* == 👆 Template Limit   ==*/}
          {/* == 👇 Validity(months) 👇  ==*/}
          <Grid container mt={2}>
            <Grid
              component={"label"}
              htmlFor={"validity"}
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
              validity *
            </Grid>
            <Grid
              component={"select"}
              name="withdrawalMonths"
              value={formData.withdrawalMonths}
              onChange={handleChange}
              id={"validity"}
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
              <option value={1}>1 Month</option>
              <option value={12}>12 Month</option>
            </Grid>
          </Grid>
          {/* == 👆 Validity(months)   ==*/}
          {/* == 👇 Guest Limit 👇  ==*/}
          <SingleInput
            labelText={"Guest Limit"}
            inputType={"number"}
            inputName={"guestLimits"}
            inputValue={formData.guestLimits}
            onChangeHandler={handleChange}
            labelInputId={"guestLimits"}
            placeholderText={"Set guest limit"}
          />
          {/* == 👆 Guest Limit   ==*/}

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
            <Button
              fullWidth
              variant={"contained"}
              sx={{ color: "white" }}
              component={NavLink}
              to="/admin/pricing"
            >
              Back
              {/* {plan.buttonText} */}
            </Button>
          </Grid>
          {/* buttons container */}
        </Grid>

        {/* form element */}
      </Paper>
    </Stack>
  );
};

export default EditPricingContent;
