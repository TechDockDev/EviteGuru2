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
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate, NavLink } from "react-router-dom";

export const AddPriceContent = () => {
  const navigate = useNavigate();
  const [descriptionNumber, setDescriptionNumber] = useState([Math.random()]);
  const [value, setValue] = useState();
  const [description, setDescription] = useState([]);

  const addDescription = () => {
    setDescriptionNumber([...descriptionNumber, Math.random()]);
  };

  const handleChange = (e) => {
    if (e.target.name === "monthly" || e.target.name === "yearly") {
      return setValue({
        ...value,
        price: { ...value.price, [e.target.name]: e.target.value },
      });
    }
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const handleDescription = (e) => {
    setDescription({ ...description, [e.target.name]: e.target.value });
  };

  const removeDescription = (index) => {
    setDescriptionNumber(descriptionNumber.filter((item, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...value, description: Object.values(description) };
    const res = await axios.post("/admin/create-plan", data);
    console.log(res);
    navigate("/admin/pricing");
  };

  return (
    <Stack width="100%" margin="auto" alignItems={"center"} p={2}>
      <Paper
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          p: 5,
          bgcolor: "white",
          borderRadius: "20px",
        }}
        elevation={10}
      >
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1 },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Typography
            variant="h4"
            color="primary"
            gutterBottom
            sx={{ fontWeight: "800", textTransform: "uppercase" }}
          >
            Add Subscription
          </Typography>
          <Stack direction={"column"} spacing={2}>
            <TextField
              label="Name"
              name="name"
              variant="outlined"
              sx={{ width: "40ch" }}
              onChange={handleChange}
            />

            {descriptionNumber.map((v, i) => (
              <Stack
                direction={"row"}
                alignItems={"center"}
                spacing={1}
                key={v}
              >
                <>
                  <TextField
                    label="Description"
                    name={`description${i}`}
                    onChange={handleDescription}
                    variant="outlined"
                    fullWidth
                  />
                  <Box>
                    <IconButton
                      aria-label="remove"
                      size="small"
                      onClick={() => removeDescription(i)}
                      sx={{
                        transition: ".3s ease all",
                        backgroundColor: "#795DA8",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "#CEC5DC",
                          color: "#795DA8",
                        },
                      }}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </Box>
                </>
              </Stack>
            ))}
            <Box>
              <IconButton
                aria-label="add"
                size="small"
                onClick={addDescription}
                sx={{
                  transition: ".3s ease all",
                  backgroundColor: "#795DA8",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#CEC5DC",
                    color: "#795DA8",
                  },
                }}
              >
                <AddIcon />
              </IconButton>
            </Box>
          </Stack>
          <Stack spacing={2} direction={"row"}>
            <TextField
              label="Monthly Price"
              name="monthly"
              variant="outlined"
              type="number"
              onChange={handleChange}
              sx={{ width: "20ch" }}
            />
            <TextField
              label="Yearly Price"
              name="yearly"
              type="number"
              variant="outlined"
              onChange={handleChange}
              sx={{ width: "20ch" }}
            />
          </Stack>
          <Stack spacing={2} direction={"row"}>
            <TextField
              label="Template Limit"
              name="templateLimit"
              variant="outlined"
              type="number"
              onChange={handleChange}
              sx={{ width: "20ch" }}
            />
            <TextField
              label="Guest Limit"
              name="guestLimit"
              type="number"
              variant="outlined"
              onChange={handleChange}
              sx={{ width: "20ch" }}
            />
          </Stack>
          <Button
            variant="contained"
            type="submit"
            sx={{ color: "white", my: "20px" }}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </Stack>
  );
};

export default AddPriceContent;
