import {
  Box,
  CircularProgress,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";

import {
  DataGrid,
  GridToolbar,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageTitle } from "../../redux/action/defaultActions";
import axios from "axios";
import { useState } from "react";
import { Constants } from "../../redux/constants/action-types";
import { openSnackbar } from "../../redux/action/userActions";

const AddressBook = () => {
  const { pageTitle } = useSelector((state) => state);
  const [allContacts, setAllContacts] = useState([]);
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();
  function CustomeToolBar() {
    return (
      <Grid container>
        <Grid
          item
          md={5}
          sm={12}
          xs={12}
          sx={{ alignItems: "center", display: "flex" }}
        >
          <GridToolbar
            csvOptions={{
              fileName: "Contact-List",
              // delimiter: ";",
              // utf8WithBom: true,
            }}
            printOptions={{
              hideFooter: true,
              hideToolbar: true,
            }}
          />
        </Grid>
        <Grid
          item
          md={7}
          sm={12}
          xs={12}
          sx={{ alignItems: "center", display: "flex" }}
        >
          <Stack width={"100%"}>
            <GridToolbarQuickFilter
              fullWidth
              variant="outlined"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "rgba(158, 158, 158, 1)",
                  borderRadius: "10px",
                  borderColor: "rgba(158, 158, 158, 1)",
                },
              }}
            />
          </Stack>
        </Grid>
      </Grid>
    );
  }
  const columns = [
    {
      field: "_id",
      headerName: "Sr. No.",
      width: 90,
      renderCell: (index) =>
        index?.api?.getRowIndexRelativeToVisibleRows(index?.row?._id) + 1,
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      // type: "number",
      width: 150,
    },
    {
      field: "email",
      headerName: "email",
      width: 200,
    },
  ];

  // ===extract all contact list to a single list ===
  const extractAllcontacts = (guestLists) => {
    guestLists.forEach((list) => {
      setAllContacts([...allContacts, ...list]);
    });
  };
  // console.log("contact list=>", allContacts);
  // =====end of function ===========================
  // ==== get contact list ====
  const getContactList = async () => {
    try {
      const res = await axios.get(`${Constants.URL}/guest/user/`);
      if (res.status === 200) {
        // console.log("response=>", res?.data?.guestList);
        // extractAllcontacts(res?.data?.guestList);
        setAllContacts(res?.data?.guestList);
        setloading(false);
      }
    } catch (error) {
      console.log("error=>", error);
      dispatch(openSnackbar("error , something went wrong", "error"));
    }
  };
  // ====end of contact list===
  // useEffect
  useEffect(() => {
    getContactList();
    dispatch(setPageTitle("Address Book"));
    return () => {
      dispatch(setPageTitle(""));
    };
  }, []);

  return (
    <>
      <Box
        sx={{
          // border: "2px solid red",
          height: "100%",
          width: {
            xl: "calc(100vw - 250px)",
            lg: "calc(100vw - 270px)",
            md: "calc(100vw - 270px)",
            sm: "100vw",
            xs: "100vw",
          },
          maxWidth: "1150px",
          padding: "0 20px 20px 20px",
          boxSizing: "border-box",
        }}
      >
        {/* title */}
        <Box
          sx={{
            m: 1,
          }}
        >
          <Typography
            variant="h1"
            sx={{ fontSize: "25px", fontWeight: "800" }}
            textAlign={"center"}
          >
            All Contacts
          </Typography>
        </Box>
        {/* title */}
        {loading ? (
          <Stack alignItems={"center"} justifyContent={"center"} mt={2}>
            <CircularProgress
              color="primary"
              sx={{
                bgcolor: "transparent !important",
                "& svg": {
                  bgcolor: "transparent !important",
                },
              }}
            />
          </Stack>
        ) : (
          <>
            <Stack mt={2}>
              <DataGrid
                components={{ Toolbar: CustomeToolBar }}
                //   slots={{ toolbar: QuickSearchToolbar }}
                rows={allContacts}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 8,
                    },
                  },
                }}
                getRowId={(row) => row._id}
                autoHeight={true}
                pageSizeOptions={[5]}
                // checkboxSelection
                disableRowSelectionOnClick
                getRowClassName={(params) =>
                  params?.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
                }
                sx={{
                  bgcolor: "none",
                  border: "none",
                  px: 2,
                  "& .odd": { bgcolor: "#F7F7F7 !important" },
                  "& .MuiCheckbox-root": {
                    color: "black",
                  },
                  "& .MuiDataGrid-columnHeaderTitle": {
                    fontWeight: "800",
                  },
                }}
              />
            </Stack>
          </>
        )}

        {/* ============  👆 Guests list table👆============= */}
      </Box>
    </>
  );
};

export default AddressBook;
