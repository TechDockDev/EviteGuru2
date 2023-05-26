import React, { createContext, useState } from "react";

// =======👇 creating Context👇====   
const DataContext = createContext();



// ***********************************************
const AppContext = ({ children }) => {
   const [severity, setSeverity] = useState("success");
   const [message, setMessage] = useState("");
   const [openSnackbar, setOpenSnackbar] = useState(false);

   // =======👇 function to open snackbar👇====
   const snackbar = (severity, message) => {
      setSeverity(severity);
      setMessage(message);
      setOpenSnackbar(true);
   };

   // =======👆 function to open snackbar👆====

   return (
      <DataContext.Provider
         value={{
            severity,
            message,
            snackbar,
            openSnackbar,
            setOpenSnackbar,
         }}>
         {children}
      </DataContext.Provider>
   );
};

export { AppContext, DataContext };
