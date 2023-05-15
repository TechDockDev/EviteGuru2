import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { Box, Button, TextField, FormControl } from "@mui/material";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const AdminTemplateEditScreen = ({ templateId, closeModal }) => {
  const [templateData, setTemplateData] = useState({
    name: "",
    description: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(`/template/${templateId}`, {
        name: templateData.name,
        description: templateData.description,
      });
      console.log(res);
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/template/${templateId}`);
      setTemplateData({
        name: data?.template?.name,
        description: data?.template?.description,
      });
    })();
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
                    value={templateData?.name}
                    required
                    onChange={(e) =>
                      setTemplateData({ ...templateData, name: e.target.value })
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
                    value={templateData?.description}
                    required
                    onChange={(e) =>
                      setTemplateData({
                        ...templateData,
                        description: e.target.value,
                      })
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
      </Box>
    </>
  );
};

export default AdminTemplateEditScreen;
