import { Grid, Typography } from "@mui/material";
import React from "react";

const Inputs = ({
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
  return (
    <>
      {inputType !== "textarea" ? (
        <Grid container mt={2} width={{ xs: "100%", sm: "49%" }}>
          <Grid
            component={"label"}
            htmlFor={labelInputId}
            item
            xs={12}
            sx={{
              fontFamily: "Montserrat",
              fontSize: "15px",
              display: "flex",
              alignItems: "center",
              color: "rgba(73, 74, 78, 1)",
            }}
          >
            {labelText}{" "}
            <span style={{ color: "rgba(235, 67, 53, 1)" }}>
              {requiredTrue ? "*" : ""}
            </span>
          </Grid>
          <Grid
            mt={1}
            component={"input"}
            required={requiredTrue}
            type={inputType}
            size={"small"}
            fullwidth
            name={inputName}
            value={inputValue}
            onChange={onChangeHandler}
            id={labelInputId}
            placeholder={placeholderText}
            item
            xs={12}
            sx={{
              height: "40px",
              outline: "none",
              border: "1px solid #757575",
              borderRadius: "8px",
              color: "rgba(73, 74, 78, 1)",
              paddingX: "10px",
              fontSize: "14px",

              "&::placeholder": {
                color: "rgba(0, 0, 0, 0.2)",
              },
            }}
          />
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
        <Grid container mt={2} mx={1}>
          <Grid
            component={"label"}
            htmlFor={labelInputId}
            item
            xs={12}
            sx={{
              fontFamily: "Montserrat",
              fontSize: "15px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {labelText}{" "}
            <span style={{ color: "rgba(235, 67, 53, 1)" }}>
              {requiredTrue ? "*" : ""}
            </span>
          </Grid>
          <Grid
            mt={1}
            component={"textarea"}
            rows={rows}
            required={requiredTrue}
            name={inputName}
            value={inputValue}
            onChange={onChangeHandler}
            id={labelInputId}
            placeholder={placeholderText}
            item
            xs={12}
            sx={{
              fontFamily: "Montserrat",
              outline: "none",
              border: "1px solid #757575",
              borderRadius: "8px",
              padding: "10px",
              fontSize: "14px",
              "&:focus": { border: "2px solid #795DA8" },
              resize: "none",
              "&::placeholder": {
                color: "rgba(0, 0, 0, 0.2)",
              },
            }}
          />
        </Grid>
      )}
    </>
  );
};

export default Inputs;
