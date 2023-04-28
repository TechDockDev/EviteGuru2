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
import FormLabel from "@mui/material/FormLabel";
import Input from "@mui/material/Input";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const AdminTemplateEditScreen = (resEdit) => {
  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo, loading, error } = adminLogin;

  let editTemplate = resEdit.template;
  const templateID = editTemplate._id;
  //console.log("sunder",templateID)
  //   console.log("single Template", editTemplate._id);

  useState(false);

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
  };

  const imageHandler3 = (e) => {
    setSampleimage3(e.target.files[0]);
    setImgUrl3(URL.createObjectURL(e.target.files[0]));
  };

  const imageHandler4 = (e) => {
    setBackgroundimage(e.target.files[0]);
    setImgUrl4(URL.createObjectURL(e.target.files[0]));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!editTemplate._id) {
      window.alert("template not found");
    } else {
      const form = new FormData();
      form.set("name", name ? name : editTemplate.description);
      form.set(
        "description",
        description ? description : editTemplate.description
      );
      form.set(
        "sampleimage",
        sampleimage ? sampleimage : editTemplate.sampleimage
      );
      form.set(
        "sampleimage1",
        sampleimage1 ? sampleimage1 : editTemplate.sampleimage1
      );
      form.set(
        "sampleimage2",
        sampleimage2 ? sampleimage2 : editTemplate.sampleimage2
      );
      form.set(
        "sampleimage3",
        sampleimage3 ? sampleimage3 : editTemplate.sampleimage3
      );
      form.set(
        "backgroundimage",
        backgroundimage ? backgroundimage : editTemplate.backgroundimage
      );

      dispatch(
        ATemplateEdits({
          _id: templateID,
          name,
          description,
          sampleimage,
          sampleimage1,
          sampleimage2,
          sampleimage3,
          backgroundimage,
        })
      );
    }
  };

  useEffect(() => {
    setName(editTemplate?.name);
    setDescription(editTemplate?.description);
    setImgUrl(`data:image/*;base64,${editTemplate?.sampleimage}`);
    setImgUrl1(`data:image/*;base64,${editTemplate?.sampleimage1}`);
    setImgUrl2(`data:image/*;base64,${editTemplate?.sampleimage2}`);
    setImgUrl3(`data:image/*;base64,${editTemplate?.sampleimage3}`);
    setImgUrl4(`data:image/*;base64,${editTemplate?.sampleimage4}`);
    setBackgroundimage(`data:image/*;base64,${editTemplate?.backgroundimage}`);
  }, []);

  return (
    <>
      <Stack
        sx={{
          position: "absolute",
          left: "50%",
          width: { xl: 400, lg: 400, md: 400, sm: 400, xs: "70%" },
          //  bgcolor: " rgba(133, 103, 157, 0.47)",
          bgcolor: "white",
          border: "1px solid white",
          borderRadius: "3px",
        }}
      >
        {/* {loadingUpdate && <Loader />}
    			{errorUpdate && <Message type='error'>{errorUpdate}</Message>} */}

        {/* {loading ? (
    				<Loader />
    			) : error ? (
    				<Message type='error'>{error}</Message>
    			) : ( */}
        {adminInfo ? (
          <>
            <form onSubmit={(e) => submitHandler(e)}>
              <Grid container sx={{ p: 3 }}>
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
                            // setOpen(e, imgUrl);
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
                      {/* <Modal open={open} onClose={openTemplatePreviewModal}>
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
                      </Modal> */}
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
            </form>
            ;
          </>
        ) : (
          <h1>Error</h1>
        )}
      </Stack>
    </>
  );
};

export default AdminTemplateEditScreen;
