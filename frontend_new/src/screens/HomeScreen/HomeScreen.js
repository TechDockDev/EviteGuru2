import { Box, Container, Stack } from "@mui/material";
import React from "react";

import FeaturesSection from "./FeaturesSection";
import FooterSection from "./FooterSection";
import HeroSection from "./HeroSection";
import TemplateSection from "./TemplateSection";

const HomeScreen = () => {
  return (
    <Box
      component={Container}
      sx={{ maxWidth: "1440px", margin: "auto" }}
      justifyContent="center"
      // border='10px solid red'
    >
      <HeroSection />
      <FeaturesSection />
      <TemplateSection />
    </Box>
  );
};

export default HomeScreen;
