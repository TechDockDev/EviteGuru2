import { Grid, Typography } from "@mui/material";
// import { DatePicker } from "@mui/x-date-pickers";
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/lab";

const SingleInput = ({
  labelText,
  inputType,
  inputName,
  inputValue,
  onChangeHandler,
  labelInputId,
  requiredTrue,
  placeholderText,
  helperText,
  rows,
}) => {
  const today = new Date();
  const minDate = today.toISOString().split("T")[0];
  console.log("datte=>", minDate);
  return (
    <>
      {inputType !== "textarea" ? (
        <Grid container mt={2}>
          <Grid
            component={"label"}
            htmlFor={labelInputId}
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
            {labelText} {requiredTrue ? "*" : ""}
          </Grid>
          {/* minDate={minDate} */}
          {/* const today = new Date();
  const minDate = today.toISOString().split('T')[0]; */}
          {inputType === "date" ? (
            // <LocalizationProvider dateAdapter={AdapterDayjs}>
            //   <Grid
            //     component={DatePicker}
            //     required={requiredTrue}
            //     type={inputType}
            //     name={inputName}
            //     value={inputValue}
            //     onChange={onChangeHandler}
            //     id={labelInputId}
            //     disablePast={true}
            //     placeholder={placeholderText}
            //     item
            //     xl={8}
            //     lg={8}
            //     md={8}
            //     sm={8}
            //     xs={12}
            //     sx={{
            //       height: "50px",
            //       outline: "none",
            //       border: "1px solid black",
            //       borderRadius: "8px",
            //       paddingX: "10px",
            //       fontSize: "18px",
            //       "&:focus": { border: "2px solid #795DA8" },
            //       width: "100%",
            //       "& .css-1dofx41-MuiInputBase-root-MuiOutlinedInput-root": {
            //         border: "transparent",
            //         outline: "none",
            //         width: "100%",
            //       },
            //       "& .css-1dofx41-MuiInputBase-root-MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
            //         {
            //           border: "none",
            //         },
            //     }}
            //   ></Grid>
            // </LocalizationProvider>
            <Grid
              component={"input"}
              required={requiredTrue}
              type={"date"}
              name={inputName}
              value={inputValue}
              onChange={onChangeHandler}
              id={labelInputId}
              placeholder={placeholderText}
              min={minDate}
              // inputProps={{
              //   min: "12-06-2023",
              // }}
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
            ></Grid>
          ) : (
            <Grid
              component={"input"}
              required={requiredTrue}
              type={inputType}
              name={inputName}
              value={inputValue}
              onChange={onChangeHandler}
              id={labelInputId}
              placeholder={placeholderText}
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
            ></Grid>
          )}
          {/* {children} */}

          {helperText ? (
            <Grid
              item
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              sx={{ mt: 1, paddingRight: "20px" }}
            >
              <Typography textAlign={"right"} fontSize="12px">
                {helperText}
              </Typography>
            </Grid>
          ) : (
            ""
          )}
        </Grid>
      ) : (
        <Grid container mt={2}>
          <Grid
            component={"label"}
            htmlFor={labelInputId}
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
            {labelText} {requiredTrue ? "*" : ""}
          </Grid>
          <Grid
            component={"textarea"}
            rows={rows}
            required={requiredTrue}
            name={inputName}
            value={inputValue}
            onChange={onChangeHandler}
            id={labelInputId}
            placeholder={placeholderText}
            item
            xl={8}
            lg={8}
            md={8}
            sm={8}
            xs={12}
            sx={{
              outline: "none",
              border: "1px solid black",
              borderRadius: "8px",
              padding: "10px",
              fontSize: "18px",
              "&:focus": { border: "2px solid #795DA8" },
              resize: "none",
            }}
          ></Grid>
        </Grid>
      )}
    </>
  );
};

export default SingleInput;
