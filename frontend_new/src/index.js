import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
// import store from "./store";
import store from "./redux/store/store";
import "./index.css";
import { ThemeProvider } from "@mui/material";
import theme from "./muiTheme/theme";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter basename="/user/">
        <App />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);


