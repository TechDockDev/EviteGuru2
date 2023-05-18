import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useDispatch, useSelector } from "react-redux";
import { SingleAndMultipalGuest } from "../../oldredux/action/userAction";

const AddGuests = ({ toggleAddUserModal }) => {
  const dispatch = useDispatch();

  const [guests, setGuests] = useState([{}]);

  // const [ single_guest , setSingle_guest] = useState({})

  // const userLogin = useSelector((state) => state.userLogin);
  const { userDetail } = useSelector((state) => state);
  // const { userInfo } = userLogin;

  const templateEdit = useSelector((state) => state.templateEdit);
  //   const { temp } = templateEdit;

  // console.log(temp)

  //   const id = temp._id;

  const handleChange = (e, index) => {
    const tempValues = [...guests];
    tempValues[index][e.target.name] = e.target.value;
    setGuests(tempValues);
    // setSingle_guest(tempValues)
    console.log(tempValues);
  };

  const SubmitHamdler = (e) => {
    e.preventDefault();
    //  dispatch(SingleAndMultipalGuest(id, guests));
  };

  const addMoreContact = () => {
    setGuests([...guests, {}]);
  };

  return (
    <Stack
      component="form"
      onSubmit={SubmitHamdler}
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "80%",
        //  bgcolor: " rgba(133, 103, 157, 0.47)",
        bgcolor: "white",
        border: "1px solid white",
        borderRadius: "3px",
        p: 3,
      }}
    >
      {/* 👇Cross icon to close the modal👇  */}
      <IconButton
        onClick={toggleAddUserModal}
        sx={{
          color: "black",
          position: "absolute",
          right: "15px",
          top: "10px",
        }}
      >
        <CancelOutlinedIcon sx={{ bgcolor: "transparent" }} />
      </IconButton>
      {/*👆 Cross icon to close the modal👆  */}

      <Typography variant="h1" fontSize={"20px"} fontWeight="bold" mb={1}>
        Add New Contact
      </Typography>

      <Grid container sx={{ maxHeight: "70vh", overflow: "auto" }}>
        {guests.map((guest, index) => {
          return (
            <Grid
              key={index}
              item
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              display="flex"
              sx={{
                flexDirection: { xl: "row", sm: "row", xs: "column" },
                border: { xl: "none", sm: "none", xs: "1px solid grey" },
                padding: { sm: "0", xs: "8px" },
                borderRadius: { sm: "0", xs: "10px" },
                mb: { sm: 0, xs: 1 },
              }}
            >
              {/* First Name */}
              <TextField
                type={"text"}
                mt={1}
                sx={{
                  marginX: "5px",
                  "& .MuiInput-root:before": {
                    borderBottom: "2px dashed #1A73E8",
                  },
                  "& .Mui-focused": { borderColor: "yellow" },
                }}
                fullWidth
                id="`first_name`"
                name="first_name"
                value={guests[index].first_name || ""}
                label={`First Name`}
                variant="standard"
                size="small"
                onChange={(e) => handleChange(e, index)}
              />

              {/* Last Name */}
              <TextField
                type={"text"}
                mt={1}
                sx={{
                  marginX: "5px",
                  "& .MuiInput-root:before": {
                    borderBottom: "2px dashed #1A73E8",
                  },
                  "& .Mui-focused": { borderColor: "yellow" },
                }}
                fullWidth
                id="`last_name`"
                name="last_name"
                value={guests[index].last_name || ""}
                label={`Last Name`}
                variant="standard"
                size="small"
                onChange={(e) => handleChange(e, index)}
              />

              {/* Mobile Number*/}
              <TextField
                mt={1}
                type="number"
                sx={{
                  marginX: "5px",
                  "& .MuiInput-root:before": {
                    borderBottom: "2px dashed #DB4437",
                  },
                }}
                fullWidth
                id="`phone`"
                name="phone"
                value={guests[index].phone || ""}
                label={`Mobile Number`}
                variant="standard"
                size="small"
                onChange={(e) => handleChange(e, index)}
              />

              {/* Email ID*/}
              <TextField
                type={"text"}
                mt={1}
                sx={{
                  marginX: "5px",
                  "& .MuiInput-root:before": {
                    borderBottom: "2px dashed #0F9D58",
                  },
                  "& .Mui-focused": { borderColor: "yellow" },
                }}
                fullWidth
                id="`email`"
                name="email"
                value={guests[index].email || ""}
                label={`Email`}
                variant="standard"
                size="small"
                onChange={(e) => handleChange(e, index)}
              />
            </Grid>
          );
        })}
        <Box mt={2} textAlign="right" width="100%">
          <Button variant="text" onClick={addMoreContact}>
            Add More
          </Button>
        </Box>
      </Grid>
      <Box width="100%" textAlign="center">
        <Button
          variant="contained"
          type="submit"
          sx={{ color: "white", width: "150px" }}
        >
          Submit
        </Button>
      </Box>
    </Stack>
  );
};

export default AddGuests;

// import { Box, Button, Grid, IconButton,  Stack, TextField, Typography } from "@mui/material";
// import React, { useState } from "react";
// import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
// import { useDispatch, useSelector } from "react-redux";
// import { SingleAndMultipalGuest } from "../../redux/action/userAction";

// const AddGuests = ({toggleAddUserModal}) => {

//    const dispatch = useDispatch();

//    // const [ guestsDetails , setGuestsDetails ] = useState([{}]);

//    const handleChange = (e, index) => {
//       const GuestValue = [ ...guestsDetails]
//       GuestValue[index][e.target.name] = e.target.value;
//       setGuestsDetails(GuestValue)
//       console.log(GuestValue)

//    }

//    const [ data , setData ] = useState({});

//    // const [guests, setGuests] = useState([{}]);

//    // const handleChange = (e, index) => {
//    //    const tempValues = [...guests];
//    //    tempValues[index][e.target.name] = e.target.value;
//    //    setGuests(tempValues);
//    //    console.log(tempValues);
//    // };

//    const addMoreContact = () => {
//       setGuestsDetails([...guestsDetails, {}]);
//    };

//    return (
//       <Stack
//          sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: "80%",
//             //  bgcolor: " rgba(133, 103, 157, 0.47)",
//             bgcolor: "white",
//             border: "1px solid white",
//             borderRadius: "3px",
//             p: 3,
//          }}>
//          {/* 👇Cross icon to close the modal👇  */}
//          <IconButton onClick={toggleAddUserModal} sx={{ color: "black", position: "absolute", right: "15px", top: "10px" }}>
//             <CancelOutlinedIcon sx={{ bgcolor: "transparent" }} />
//          </IconButton>
//          {/*👆 Cross icon to close the modal👆  */}

//          <Typography variant="h1" fontSize={"20px"} fontWeight="bold" mb={1}>
//             Add New Contact
//          </Typography>

//          <Grid container sx={{ maxHeight: "70vh", overflow: "auto" }}>
//             {guestsDetails.map((guest, index) => {
//                return (
//                   <Grid item xl={12} lg={12} md={12} sm={12} xs={12} display="flex">
//                      {/* First Name */}
//                      <TextField
//                      type={"text"}

//                         mt={1}
//                         sx={{ marginX: "5px", "& .MuiInput-root:before": { borderBottom: "2px dashed #1A73E8" }, "& .Mui-focused": { borderColor: "yellow" } }}
//                         fullWidth
//                         id="`first_name`"
//                         name="first_name"
//                         value={guestsDetails[index].first_name}
//                         label={`First Name`}
//                         variant="standard"
//                         size="small"
//                         onChange={(e) => handleChange(e, index)}
//                      />

//                      {/* Last Name */}
//                      <TextField
//                      type={"text"}

//                         mt={1}
//                         sx={{ marginX: "5px", "& .MuiInput-root:before": { borderBottom: "2px dashed #1A73E8" }, "& .Mui-focused": { borderColor: "yellow" } }}
//                         fullWidth
//                         id="`last_name`"
//                         name="last_name"
//                         value={guestsDetails[index].last_name}
//                         label={`Last Name`}
//                         variant="standard"
//                         size="small"
//                         onChange={(e) => handleChange(e, index)}
//                      />

//                      {/* Email ID*/}
//                      <TextField
//                      type={"text"}
//                         mt={1}
//                         sx={{ marginX: "5px", "& .MuiInput-root:before": { borderBottom: "2px dashed #0F9D58" }, "& .Mui-focused": { borderColor: "yellow" } }}
//                         fullWidth
//                         id="`email`"
//                         name="email"
//                         value={guestsDetails[index].email}
//                         label={`Email`}
//                         variant="standard"
//                         size="small"
//                         onChange={(e) => handleChange(e, index)}
//                      />

//                      {/* Mobile Number*/}
//                      <TextField mt={1} type="number" sx={{ marginX: "5px", "& .MuiInput-root:before": { borderBottom: "2px dashed #DB4437" } }} fullWidth id="`phone`" name="phone" value={guestsDetails[index].phone} label={`Mobile Number`} variant="standard" size="small" onChange={(e) => handleChange(e, index)} />
//                   </Grid>
//                );
//             })}
//          </Grid>
//          <Box mt={2} textAlign="right" width="100%">
//             <Button variant="text" onClick={addMoreContact}>
//                Add More
//             </Button>
//          </Box>
//       </Stack>
//    );
// };

// export default AddGuests;
