import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
// import store from "./store";
import store from "./redux/store/store";
import "./index.css";
import { ThemeProvider } from "@mui/material";
import theme from "./muiTheme/theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { ChakraProvider } from "@chakra-ui/react"
// import { Provider } from "react-redux";
// import App from './App';
// import store from './store';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <ChakraProvider>
//       <App />
//       </ChakraProvider>
//     </Provider>
//   </React.StrictMode>
// );
