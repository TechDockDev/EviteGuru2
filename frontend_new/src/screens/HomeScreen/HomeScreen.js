import { Box } from "@mui/material";
import React, { useState } from "react";

import FeaturesSection from "./FeaturesSection";
import HeroSection from "./HeroSection";
import TemplateSection from "./TemplateSection";
import { useEffect } from "react";
import LogInModal from "../LoginModal/LogInModal";
import RegisterModal from "../RegisterModal/RegisterModal";

const HomeScreen = () => {
  const [open, setopen] = useState(false);
  const [registerOpen, setregisterOpen] = useState(false);
  const toggleRegisterModal = () => {
    setregisterOpen(!registerOpen);
  };
  const toggleLoginModal = () => {
    setopen(!open);
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      <Box sx={{ overflowX: "hidden" }}>
        <HeroSection />
        <FeaturesSection />
        <TemplateSection />
      </Box>

      
    </>
  );
};

export default HomeScreen;
