import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  NavLink,
  Navigate,
  Link as RouterLink,
  useNavigate,
} from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import { aCreatetemplate, ATemplateEdits } from "../redux/action/adminAction";
import { useParams } from "react-router-dom";
import {
  Container,
  Box,
  Button,
  Stack,
  TextField,
  FormControl,
  Alert,
} from "@mui/material";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const AdminTemplateEditScreen = (resEdit) => {
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo, loading, error } = adminLogin;

  let editTemplate = resEdit.template;
  const templateID = editTemplate._id;

  const [templateData, setTemplateData] = useState({
    name: "",
    description: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(`/template/edit/${templateID}`, {
        name: templateData.name,
        description: templateData.description,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTemplateData({
      name: editTemplate?.name,
      description: editTemplate?.description,
    });
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Box sx={style}>
        {adminInfo && (
          <>
            <form onSubmit={(e) => submitHandler(e)}>
              <Grid container sx={{ p: 1 }}>
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
                  Edit Template
                </Typography>
                <Grid item xs={12} sx={{ mb: 4 }}>
                  {/* NAME */}
                  <FormControl id="name" fullWidth>
                    <TextField
                      size="small"
                      label="Template Name"
                      id="name"
                      type="text"
                      placeholder="Enter name"
                      value={templateData.name}
                      required
                      onChange={(e) =>
                        setTemplateData({ name: e.target.value })
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sx={{ mb: 4 }}>
                  {/* DESCRIPTION */}
                  <FormControl id="description" fullWidth>
                    <TextField
                      size="small"
                      type="text"
                      label="Description"
                      id="description"
                      placeholder="Enter description"
                      multiline
                      maxRows={4}
                      value={templateData.description}
                      required
                      onChange={(e) =>
                        setTemplateData({ description: e.target.value })
                      }
                    />
                  </FormControl>
                </Grid>
                <Button sx={{ m: "auto" }} variant="outlined" type="submit">
                  Submit
                </Button>
              </Grid>
            </form>
          </>
        )}
      </Box>
    </>
  );
};

export default AdminTemplateEditScreen;
