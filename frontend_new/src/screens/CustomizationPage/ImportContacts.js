import { Button, Grid, IconButton, Stack, Typography } from "@mui/material";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useSelector } from "react-redux";
import { Constants } from "../../redux/constants/action-types";

const ImportContacts = (props) => {
  const { createdEventDetails } = useSelector((state) => state);
  const [allContacts, setAllContacts] = useState([]);
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
  const { id } = useParams();
  function CustomeToolBar() {
    return (
      <Grid container>
        <Grid
          item
          md={6}
          sm={12}
          xs={12}
          sx={{ alignItems: "center", display: "flex" }}
        >
          {/* <GridToolbar /> */}
          <Typography variant="h6" fontWeight={"400"}>
            Search Contacts
          </Typography>
        </Grid>
        <Grid
          item
          md={6}
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
      headerName: "ID",
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
  // ==== get contact list ====
  const getContactList = async () => {
    try {
      const res = await axios.get(`${Constants.URL}/guest/user/${id}`);
      if (res.status === 200) {
        console.log("response=>", res?.data?.guestList);
        // extractAllcontacts(res?.data?.guestList);
        setAllContacts(res?.data?.guestList);
      }
    } catch (error) {
      console.log("error=>", error);
    }
  };
  // ====end of contact list===
  // ===handle Import =========
  const handleImport = async () => {
    try {
      console.log("imported contact", rowSelectionModel);
      const res = await axios.post(
        `${Constants.URL}/guest/add-guests-from-addressBook`,
        { guestIds: rowSelectionModel, eventId: id }
      );
      if (res.status === 200) {
        console.log("response=>", res);
        props.toggleImportModal();
        props.getGuestListDetails(createdEventDetails?.guestListId);
      }
    } catch (error) {
      console.log("error=>", error);
    }
  };
  // ===endof handleImport ====
  // useEffect
  useEffect(() => {
    if (id) {
      getContactList();
    }
  }, []);
  return (
    <Stack
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: { xs: "200px", sm: "550px" },
        maxHeight: "80vh",
        //  bgcolor: " rgba(133, 103, 157, 0.47)",
        bgcolor: "white",
        border: "2px solid rgba(121, 93, 168, 1)",
        borderRadius: "8px",
        p: 4,
      }}
    >
      <IconButton
        onClick={props?.toggleImportModal}
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
        Select and Import Contacts
      </Typography>

      <DataGrid
        components={{ Toolbar: CustomeToolBar }}
        //   slots={{ toolbar: QuickSearchToolbar }}
        rows={allContacts}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setRowSelectionModel(newRowSelectionModel);
        }}
        getRowId={(row) => row._id}
        autoHeight={true}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        getRowClassName={(params) =>
          params?.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        sx={{
          bgcolor: "none",
          border: "none",
          mt: 2,
          "& .odd": { bgcolor: "#F7F7F7 !important" },
          "& .MuiCheckbox-root": {
            color: "black",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "800",
          },
        }}
      />
      <Stack
        direction={"row"}
        spacing={2}
        alignContent={"center"}
        justifyContent={"center"}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{ color: "white" }}
          disabled={rowSelectionModel.length >= 1 ? false : true}
          onClick={handleImport}
        >
          Add To Invitees
        </Button>
        <Button
          variant="contained"
          color="inherit"
          onClick={props.toggleImportModal}
        >
          Cancel
        </Button>
      </Stack>
    </Stack>
  );
};

export default ImportContacts;
