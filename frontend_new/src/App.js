import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import "@fontsource/montserrat";
import Header from "./components/Header";
import BrowseTemplate from "./screens/BrowseTemplate/BrowseTemplate";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import CustomizationPage from "./screens/CustomizationPage/CustomizationPage";
import Preview from "./screens/CustomizationPage/Preview";
import Invitees from "./screens/Invitees/Invitees";
import AccountSettings from "./screens/AccountSettings/AccountSettings";
import MailingReponses from "./screens/CustomizationPage/MailingReponses";
import Pricing from "./screens/pricing/Pricing";

// import FooterSection from "./screens/HomeScreen/FooterSection";
// import EmailsendOtp from "./screens/EmailotpScreen";
// import { Stack } from "@mui/material";
// import LogInModal from "./screens/LoginModal/LogInModal";
// import React, { useState, useEffect } from "react";
// import RegisterModal from "./screens/RegisterModal/RegisterModal";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<HomeScreen />} />
          <Route path="/browse_template" element={<BrowseTemplate />} />
          <Route path="/pricing" element={<Pricing />} />
        </Route>
      </Routes>
      <Routes>
        <Route path="/dashboard" element={<UserDashboard />}>
          <Route path="/dashboard/edit/:id" element={<CustomizationPage />} />
          <Route path="/dashboard/preview/:id" element={<Preview />} />

          <Route path="/dashboard/invitees" element={<Invitees />} />
          <Route
            path="/dashboard/account-setting"
            element={<AccountSettings />}
          />
          <Route
            path="/dashboard/mailing-responses"
            element={<MailingReponses />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

//{/* <Route path="/browse_template" element={<BrowseTemplate />} /> */}

// import "@fontsource/montserrat";
// import { Flex } from "@chakra-ui/react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import React from 'react'
// import HomeScreen from './screens/HomeScreen';
// import LoginScreen from "./screens/LoginScreen";
// import RegisterScreen from "./screens/RegisterScreen";
// import EmailsendOtp from "./screens/EmailotpScreen";
// import Changepassword from "./screens/Changepassword";
// import Header from "./components/Header";

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Header />
//       <Flex
//         as='main'
//         mt='65px'
//         direction='column'
//         minH='xl'
//         py='3'
//         px='6'
//       // bgColor='gray.200'
//       >
//         <Routes>
//           <Route path="/" element={<HomeScreen />} />
//           <Route path="/login" element={<LoginScreen />} />
//           <Route path="/register" element={<RegisterScreen />} />
//           <Route path='/send-otp' element={<EmailsendOtp />} />
//           <Route path='/change-password' element={<Changepassword />} />
//         </Routes>
//       </Flex>
//     </BrowserRouter>
//   )
// }

// export default App;
