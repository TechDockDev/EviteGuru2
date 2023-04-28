import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { aCreatetemplate } from "../redux/action/adminAction";

import {
  Container,
  FormControl,
  Box,
  Button,
  Paper,
  CardMedia,
  Card,
  Modal,
} from "@mui/material";

import FormLabel from "@mui/material/FormLabel";
import Input from "@mui/material/Input";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
const AdminTemplateCreateScreen = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo, loading, error } = adminLogin;


  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sampleimage, setSampleimage] = useState("");
  const [sampleimage1, setSampleimage1] = useState("");
  const [sampleimage2, setSampleimage2] = useState("");
  const [sampleimage3, setSampleimage3] = useState("");
  const [backgroundimage, setBackgroundimage] = useState("");
  const [imgUrl, setImgUrl] = useState(null);
  const [imgUrl1, setImgUrl1] = useState(null);
  const [imgUrl2, setImgUrl2] = useState(null);
  const [imgUrl3, setImgUrl3] = useState(null);
  const [imgUrl4, setImgUrl4] = useState(null);

  const [open, setOpen] = useState(false);
  const [openTemplatePreviewModal, setOpenTemplatePreviewModal] =
    useState(false);

  const toggleTemplatePreviewModal = (e, image) => {
    if (!openTemplatePreviewModal) {
      setOpen(image);
      setOpenTemplatePreviewModal(!openTemplatePreviewModal);
    } else {
      setOpen("");
      setOpenTemplatePreviewModal(!openTemplatePreviewModal);
    }
  };
  const imageHandler = (e) => {
    setSampleimage(e.target.files[0]);
    setImgUrl(URL.createObjectURL(e.target.files[0]));
  };

  const imageHandler1 = (e) => {
    setSampleimage1(e.target.files[0]);
    setImgUrl1(URL.createObjectURL(e.target.files[0]));
  };

  const imageHandler2 = (e) => {
    setSampleimage2(e.target.files[0]);
    setImgUrl2(URL.createObjectURL(e.target.files[0]));
    console.log("inside handler", sampleimage2);
  };

  const imageHandler3 = (e) => {
    setSampleimage3(e.target.files[0]);
    setImgUrl3(URL.createObjectURL(e.target.files[0]));
  };

  const imageHandler4 = (e) => {
    setBackgroundimage(e.target.files[0]);
    setImgUrl4(URL.createObjectURL(e.target.files[0]));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", name);
    form.append("description", description);
    form.append("sampleimage", sampleimage);
    form.append("sampleimage1", sampleimage1);
    form.append("sampleimage2", sampleimage2);
    form.append("sampleimage3", sampleimage3);
    form.append("backgroundimage", backgroundimage);

    dispatch(
      aCreatetemplate(
        name,
        description,
        sampleimage,
        sampleimage1,
        sampleimage2,
        sampleimage3,
        backgroundimage
      )
    );
    navigate("/admin/template-list");
    props.showAlertBar("Template is uploaded", "success");
  };

  return (
    <>
      <Container
        maxWidth="sm"
        //  sx={{ border:"1px solid red"}}
      >
        <Box
          sx={{
            padding: "2px",
            border: "2px solid purple",
            borderRadius: "20px",
            padding: "10px 25px",
          }}
        >
          <Typography
            variant="h5"
            sx={{ textAlign: "center", fontWeight: "800", mb: 2 }}
          >
            Create Template
          </Typography>

          {/* {loadingUpdate && <Loader />}
    			{errorUpdate && <Message type='error'>{errorUpdate}</Message>} */}

          {/* {loading ? (
    				<Loader />
    			) : error ? (
    				<Message type='error'>{error}</Message>
    			) : ( */}
          {adminInfo ? (
            <Box component="form" onSubmit={(e) => submitHandler(e)}>
              <Grid container>
                <Grid item xs={12} sx={{ mb: 2 }}>
                  {/* NAME */}
                  <FormControl id="name" fullWidth>
                    {/* <Typography component={"label"} fontWeight="600" htmlFor="name"> Template Name</Typography> */}
                    <TextField
                      size="small"
                      label="Template Name"
                      id="name"
                      type="text"
                      placeholder="Enter name"
                      value={name}
                      required
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sx={{ mb: 2 }}>
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
                      value={description}
                      required
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                {/* ======================================= */}
                <Grid
                  item
                  container
                  xs={12}
                  sx={{ display: "flex", alignItems: "center" }}
                  mb={2}
                >
                  <Grid item xs={6}>
                    {/* SAMPLE IMAGE */}
                    <FormControl id="sampleimage" fullWidth>
                      {/* <Typography>Main Sample Image</Typography> */}
                      <TextField
                        id="sampleimage"
                        type="file"
                        label="Sample Image"
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => imageHandler(e)}
                        required
                        small="small"
                        sx={{ mb: 1, mr: 2 }}
                      />
                    </FormControl>
                  </Grid>
                  {imgUrl ? (
                    <>
                      <Grid
                        item
                        xs={6}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Box
                          onClick={(e) => {
                            setOpen(e, imgUrl);
                          }}
                          component="img"
                          sx={{
                            width: "100px",
                            maxHeight: "100px",
                            cursor: "pointer",
                          }}
                          src={imgUrl}
                        />
                      </Grid>
                      {/* <Button onClick={handleOpen}>View Sample Image</Button> */}
                      <Modal open={open} onClose={openTemplatePreviewModal}>
                        <Grid
                          item
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Box
                            component="img"
                            sx={{
                              width: "50%",
                              maxHeight: "50%",
                            }}
                            src={imgUrl}
                          />
                        </Grid>
                      </Modal>
                    </>
                  ) : (
                    ""
                  )}
                </Grid>

                {/* ======================================= */}

                <Grid
                  item
                  container
                  xs={12}
                  sx={{ display: "flex", alignItems: "center" }}
                  mb={2}
                >
                  <Grid item xs={6}>
                    {/* SAMPLE IMAGE 1 */}
                    <FormControl id="sampleimage1" isRequired>
                      <TextField
                        InputLabelProps={{ shrink: true }}
                        id="sampleimage1"
                        type="file"
                        label="Sample Image 1"
                        required
                        height="75vp"
                        width="100%"
                        small="small"
                        sx={{ mb: 1, mr: 2 }}
                        onChange={(e) => imageHandler1(e)}
                      />
                    </FormControl>
                  </Grid>
                  {imgUrl1 ? (
                    <Grid
                      item
                      xs={6}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Box>
                        <Box
                          onClick={() => {
                            console.log("image preview modal");
                          }}
                          component="img"
                          sx={{
                            mt: "10px",
                            width: "100px",
                            maxHeight: "100px",
                            cursor: "pointer",
                          }}
                          src={imgUrl1}
                        />
                      </Box>
                    </Grid>
                  ) : (
                    ""
                  )}
                </Grid>
                {/* SAMPLE IMAGE2 ++++++++++++++++++++++++++++++++++++++*/}
                <Grid
                  item
                  container
                  xs={12}
                  sx={{ display: "flex", alignItems: "center" }}
                  mb={2}
                >
                  <Grid item xs={6}>
                    <FormControl id="sampleimage2">
                      <TextField
                        InputLabelProps={{ shrink: true }}
                        id="sampleimage2"
                        type="file"
                        label="Sample Image 2"
                        required
                        height="75vp"
                        width="100%"
                        small="small"
                        sx={{ mb: 1, mr: 2 }}
                        onChange={(e) => imageHandler2(e)}
                      />
                    </FormControl>
                  </Grid>
                  {imgUrl2 ? (
                    <Grid
                      item
                      xs={6}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Box>
                        <Box
                          onClick={() => {
                            console.log("image preview modal");
                          }}
                          component="img"
                          s
                          sx={{
                            mt: "10px",
                            width: "100px",
                            maxHeight: "100px",
                            cursor: "pointer",
                          }}
                          src={imgUrl2}
                        />
                      </Box>
                    </Grid>
                  ) : (
                    ""
                  )}
                </Grid>

                {/* SAMPLE IMAGE 3 */}
                <Grid
                  item
                  container
                  xs={12}
                  sx={{ display: "flex", alignItems: "center" }}
                  mb={2}
                >
                  <Grid item xs={6}>
                    <FormControl id="sampleimage3">
                      <TextField
                        InputLabelProps={{ shrink: true }}
                        type="file"
                        id="sampleimage3"
                        label="Sample Image 3"
                        required
                        height="100%"
                        width="100%"
                        small="small"
                        sx={{ mb: 1, mr: 2 }}
                        onChange={(e) => imageHandler3(e)}
                      />
                    </FormControl>
                  </Grid>
                  {imgUrl3 ? (
                    <Grid
                      item
                      xs={6}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Box
                        onClick={() => {
                          console.log("image preview modal");
                        }}
                        component="img"
                        s
                        sx={{
                          mt: "10px",
                          width: "100px",
                          maxHeight: "100px",
                          cursor: "pointer",
                        }}
                        src={imgUrl3}
                      />
                    </Grid>
                  ) : (
                    ""
                  )}
                </Grid>

                {/* BACKGROUND IMAGE +++++++++++++++++++++++++++++++++++++ */}
                <Grid
                  item
                  container
                  xs={12}
                  sx={{ display: "flex", alignItems: "center" }}
                  mb={2}
                >
                  <Grid item xs={6}>
                    <FormControl id="background_image">
                      <TextField
                        type="file"
                        InputLabelProps={{ shrink: true }}
                        label="Background Image"
                        required
                        sx={{ mb: 1, mr: 2 }}
                        width="100%"
                        small="small"
                        onChange={(e) => imageHandler4(e)}
                      />
                    </FormControl>
                  </Grid>
                  {imgUrl4 ? (
                    <Grid
                      item
                      xs={6}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Box
                        onClick={() => {
                          console.log("image preview modal");
                        }}
                        component="img"
                        s
                        sx={{
                          mt: "10px",
                          width: "100px",
                          maxHeight: "100px",
                          cursor: "pointer",
                        }}
                        src={imgUrl4}
                      />
                    </Grid>
                  ) : (
                    ""
                  )}
                </Grid>
              </Grid>
              <Box textAlign="center" mt={2} mb={2}>
                <Button
                  type="submit"
                  variant="contained"
                  // isLoading={loading}
                  sx={{
                    color: "white",
                  }}
                >
                  Upload
                </Button>
              </Box>
            </Box>
          ) : (
            <h1>Error</h1>
          )}
        </Box>
      </Container>
    </>
  );
};

export default AdminTemplateCreateScreen;
