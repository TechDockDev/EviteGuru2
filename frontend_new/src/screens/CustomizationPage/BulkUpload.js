import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
// import svg from '../../../public/assets/Excel.svg'

import * as XLSX from "xlsx";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { openSnackbar } from "../../redux/action/userActions";
import { Constants } from "../../redux/constants/action-types";

// =========================
const BulkUpload = (props) => {
  const { createdEventDetails } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [sheetData, setSheetData] = useState("");
  const [bulkFile, setBulkFile] = useState(null);
  const onDrop = useCallback((acceptedFiles) => {
    setSheetData("");
    if (
      acceptedFiles[0].type === "application/vnd.ms-excel" ||
      acceptedFiles[0].type === "text/csv" ||
      acceptedFiles[0].type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      setBulkFile(acceptedFiles[0]);
      console.log("accepted file", acceptedFiles[0]);
      readExcel(acceptedFiles[0]);
    } else {
      // console.log("",acceptedFiles[0].type);
      // alert("invalid file format! Please upload xlx, xlxs or csv file");
      dispatch(
        openSnackbar(
          "Invalid File Format! Please upload .xlx, .xlxs or .csv file",
          "warning"
        )
      );
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        // console.log("e=>", e.target);
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);
        // console.log("data=>", data);
        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((dataFromSheet) => {
      setSheetData(dataFromSheet);
      // console.log("console is coming=>");
    });
  };

  // ====handledownload ================
  const handleDownload = () => {
    const fileUrl = "/assets/invitees_template.xlsx";
    // Create a temporary link element
    const downloadLink = document.createElement("a");
    downloadLink.href = fileUrl;

    // Set the filename for the downloaded file
    downloadLink.setAttribute("invitees_template", "filename.ext");

    // Trigger the download
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // Clean up the URL object and link element
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(fileUrl);
  };
  // ==end of handleDownload ===========
  //=== handleupload file bulk upload ====
  const handleUploadFile = async () => {
    try {
      props.setLoading(true);
      if (bulkFile) {
        const fileData = new FormData();
        fileData.append("file", bulkFile);
        const res = await axios.patch(
          `${Constants.URL}/guest/add-guest-in-bulk/${createdEventDetails?.guestListId}`,
          fileData
        );
        if (res.status === 200) {
          // console.log("res=>", res);
          dispatch(openSnackbar("Contacts are added succesfully", "success"));
          props?.toggleBulkModal();
          props?.getGuestListDetails(createdEventDetails?.guestListId);
          props?.setLoading(false);
        }
      } else {
        props?.setLoading(false);
        alert("Please Select File First");
        dispatch(openSnackbar("Please Select a File First", "warning"));
      }
    } catch (error) {
      console.log("error=>", error);
      dispatch(
        openSnackbar(
          "something went wrong with your file download example and fill as instructed then upload,",
          "error"
        )
      );
    }
  };
  // ====endl of handleupload ============
  return (
    <>
      <Stack
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { lg: "550px", md: "500px", sm: "400px", xs: "200px" },
          maxHeight: "80vh",
          //  bgcolor: " rgba(133, 103, 157, 0.47)",
          bgcolor: "white",
          border: "1px solid white",
          borderRadius: "3px",
          p: 5,
          overflow: "auto",
          "&::-webkit-scrollbar": {
            width: "5px",
            bgcolor: "rgba(206, 197, 220, 1)",
            borderRadius: "6px",
            display: { xs: "none", sm: "block", md: "block" },
          },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: "rgba(121, 93, 168, 1)",
            height: "40px",
            borderRadius: "6px",
          },
        }}
      >
        {/* 👇Cross icon to close the modal👇  */}
        <IconButton
          onClick={props?.toggleBulkModal}
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

        <Typography variant="h1" fontSize={"20px"} fontWeight={800} mb={1}>
          Upload Contact List
        </Typography>
        <Grid
          container
          sx={{
            mt: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* ========== */}
          <Grid
            item
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            width="100%"
            display={{ xs: "none", sm: "block" }}
          >
            <Typography fontWeight={600} fontSize="14px">
              Download the sample for bulk uploading of email
            </Typography>
          </Grid>
          {/* ========== */}

          <Grid
            item
            xl={4}
            lg={4}
            md={4}
            sm={8}
            xs={8}
            width="100%"
            sx={{
              mt: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box height="45px" width="45px">
              <Box component={"img"} src="/assets/Excel.svg" width="100%" />
            </Box>
            <Button
              size="large"
              sx={{
                display: "block",
                ml: 4,
                textTransform: "none",
                color: "black",
                boxShadow: "4px 4px 20px rgba(0, 0, 0, 0.3)",
                borderRadius: "4px",

                height: "50px",
                width: "150px",
              }}
              onClick={handleDownload}
            >
              Download Here
            </Button>
          </Grid>
          {/* ========== */}
          <Grid
            item
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            mt={3}
            width="100%"
          >
            <Typography fontSize="12px" fontWeight={500} textAlign="center">
              Download the sample for bulk uploading of email
            </Typography>
          </Grid>
          {/* ========== */}
          <Grid
            item
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            mt={3}
            width="100%"
          >
            <Typography fontSize="14px" fontWeight={600} textAlign="center">
              Locate the File on Your Computer and Upload Below
            </Typography>
          </Grid>
          {/* ========== */}
          {/* ========== */}
          <Grid
            item
            xl={8}
            lg={8}
            md={8}
            sm={10}
            xs={10}
            mt={3}
            width="100%"
            display="flex"
            justifyContent="center"
          >
            <Grid
              container
              sx={{
                width: { xs: "100%", sm: "80%" },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid
                item
                xl={8}
                lg={8}
                md={8}
                sm={10}
                xs={10}
                {...getRootProps()}
                sx={{
                  width: "100%",
                  height: "12rem",
                  border: "2px dashed rgba(0, 128, 220, 0.5)",
                  bgcolor: isDragActive
                    ? "rgba(0, 128, 220, 0.9)"
                    : "rgba(0, 128, 220, 0.5)",
                  borderRadius: "24px",
                  p: 3,
                  cursor: "pointer",
                  transition: "all .2s ease",
                  "&:hover": {
                    bgcolor: "rgba(0, 128, 220, 0.9)",
                    scale: ".97",
                    borderColor: "white",
                  },
                  "&:active": {
                    scale: "1",
                  },
                }}
              >
                <Box
                  component="img"
                  src={
                    bulkFile ? "/assets/Excel.svg" : "/assets/upload-cloud.svg"
                  }
                  display="block"
                  margin="auto"
                  width="23%"
                />
                <input
                  {...getInputProps({
                    accept:
                      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
                    multiple: false,
                  })}
                />
                {bulkFile ? (
                  ""
                ) : (
                  <Typography
                    variant="h1"
                    fontSize={{ xs: "15px", sm: "22px" }}
                    fontWeight="800"
                    color="white"
                    textAlign="center"
                  >
                    Drag & Drop
                  </Typography>
                )}

                {isDragActive ? (
                  <Typography color="white" textAlign="center">
                    Drop your file here
                  </Typography>
                ) : (
                  <Typography color="white" textAlign="center">
                    {bulkFile
                      ? `${bulkFile?.name}`
                      : "or select file from device"}
                  </Typography>
                )}
                <Typography
                  color="rgba(255, 255, 255, 0.3)"
                  textAlign="center"
                  fontSize="14px"
                  mt={1}
                >
                  max. 50MB
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {/* ========== */}
          <Stack alignItems={"center"} mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUploadFile}
            >
              Upload
            </Button>
          </Stack>
        </Grid>
      </Stack>
    </>
  );
};

export default BulkUpload;
