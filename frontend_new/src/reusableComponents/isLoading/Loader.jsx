import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";

export default function Loader() {
  const { loading } = useSelector((state) => state);

  return (
    <div>
      <Backdrop
        sx={{
          color: "#3e2765",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading.open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
