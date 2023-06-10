import { Box} from "@mui/material";
import React from "react";

import FeaturesSection from "./FeaturesSection";
import HeroSection from "./HeroSection";
import TemplateSection from "./TemplateSection";
import { useEffect } from "react";

const HomeScreen = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <Box sx={{ overflowX: "hidden" }}>
      <HeroSection />
      <FeaturesSection />
      <TemplateSection />
    </Box>
  );
};

export default HomeScreen;
