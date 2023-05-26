import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";
import "./index.css";
import { ThemeProvider } from "@mui/material";
import theme from "./muiTheme/theme";
import { AppContext } from "./AppContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <React.StrictMode>
      <AppContext>
         <Provider store={store}>
            <ThemeProvider theme={theme}>
               <App />
            </ThemeProvider>
         </Provider>
      </AppContext>
   </React.StrictMode>
);
