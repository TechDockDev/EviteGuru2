import { Grid, Typography } from "@mui/material";
import React from "react";

const SingleInput = ({ labelText, inputType, inputName, inputValue, onChangeHandler, labelInputId, requiredTrue, placeholderText, helperText, rows }) => {
   return (
      <>
         {inputType !== "textarea" ? (
            <Grid container mt={2}>
               <Grid component={"label"} htmlFor={labelInputId} item xl={4} lg={4} md={4} sm={4} xs={12} sx={{ fontFamily: "Montserrat", fontSize: "20px", display: "flex", alignItems: "center" }}>
                  {labelText} {requiredTrue ? "*" : ""}
               </Grid>
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
                  sx={{ height: "50px", outline: "none", border: "1px solid black", borderRadius: "8px", paddingX: "10px", fontSize: "18px", "&:focus": { border: "2px solid #795DA8" } }}></Grid>
               {helperText ? (
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12} sx={{ mt: 1, paddingRight: "20px" }}>
                     <Typography textAlign={"right"} fontSize="12px" >{helperText}</Typography>
                  </Grid>
               ) : (
                  ""
               )}
            </Grid>
         ) : (
            <Grid container mt={2}>
               <Grid component={"label"} htmlFor={labelInputId} item xl={4} lg={4} md={4} sm={4} xs={12} sx={{ fontFamily: "Montserrat", fontSize: "20px", display: "flex", alignItems: "center" }}>
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
                  sx={{ outline: "none", border: "1px solid black", borderRadius: "8px", padding: "10px", fontSize: "18px", "&:focus": { border: "2px solid #795DA8" },resize:"none" }}></Grid>
            </Grid>
         )}
      </>
   );
};

export default SingleInput;
