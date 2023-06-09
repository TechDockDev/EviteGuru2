import { Box, Container, Stack } from "@mui/material";
import React from "react";

import FeaturesSection from "./FeaturesSection";
import FooterSection from "./FooterSection";
import HeroSection from "./HeroSection";
import TemplateSection from "./TemplateSection";

const HomeScreen = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <TemplateSection />
    </>
  );
};

export default HomeScreen;
