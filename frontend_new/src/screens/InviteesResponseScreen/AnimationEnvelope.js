import React, { useEffect, useRef, useState } from "react";
import "./AnimationStyle.css";
import { Bounce, gsap } from "gsap";
import { Backdrop, Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { CancelOutlined } from "@mui/icons-material";
import { Sine } from "gsap";
const AnimationEnvelope = ({ src }) => {
   const [envelopeOpen, setEnvelopeOpen] = useState(false);
   const [anim, setAnim] = useState("");

   const [open, setOpen] = useState(false);
   const toggleBackdrop = () => {
      if (open) {
         anim.revert();
         setOpen(!open);
         setEnvelopeOpen(false);
      } else {
         setOpen(!open);
         setAnim(pullOut());
      }
   };

   useEffect(() => {}, []);

   const pullOut = () => {
      const tl = gsap
         .timeline().delay(1)
         .to(".perspective", {
            duration: 0.6,
            rotationY: 180,
            ease: Sine.easeInOut,
            
         }).to(".flap", {
            duration: 0.6,
            rotationX: 180,
            ease: Sine.easeInOut,
            delay:0.6
         })
         .to(".invitation", {
            duration: 0.5,
            scale: 0.8,
            ease: Sine.easeInOut,
         })
         .set(".flap", {
            zIndex: 0,
            
         })
         .set(".mask", {
            height: "1000px",
            
         })
         .to(".face", {
            duration: 0.9,
            bottom: "600px",
            ease: Sine.easeInOut,
         })
         .set(".mask", {
            overflow: "visible",
            "clip-path": "inset(0 0 0% 0)",
            bottom: " -65px",
            onComplete: function () {
               setEnvelopeOpen(true);
            },
         })
         .set(".face", {
            // duration: 0.5,
            height: "auto",
            ease: Sine.easeInOut,
         })
         .to(".face", {
            duration: 0.5,
            // bottom: "-399px",
            bottom: "0px",
            ease: Bounce.inOut,
         })
         .to(".invitation", {
            scale: 0.85,
            ease: Sine.inOut,
         });

      return tl;
   };

   return (
      <>
         <Box
            onClick={toggleBackdrop}
            sx={{
               width: "90%",
               maxWidth: "300px",
               boxShadow: "5px 5px 5px black",
               transition: "all 200ms ease",
               "&:hover": {
                  cursor: "pointer",
                  scale: "0.95",
               },
            }}>
            <Box
               component={"img"}
               src="/assets/envelope.png"
               sx={{
                  width: "100%",
                  height: "auto",
                  display: "block",
               }}
            />
         </Box>
         <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
            <div className="outerWrapper">
               <IconButton onClick={toggleBackdrop}>
                  <CancelOutlined sx={{ color: "#795da8", fontSize: "30px" }} />
               </IconButton>
               <div className="invitation">
                  <div className="perspective">
                     <div className={`envelope ${envelopeOpen ? "is-open" : ""}`}>
                        <div className="mask">
                           <div className="card">
                              <div className="face">
                                 <img src={src} alt="img" />
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="flap"></div>
                     {envelopeOpen && (
                        <button
                           onClick={(e) => {
                              e.stopPropagation();
                              setEnvelopeOpen(false);
                              anim.restart();
                           }}
                           className="restart">
                           Re-Open
                        </button>
                     )}
                  <div className="backEnvelope">
                     <Typography width={"100%"} mt={3} textAlign={"center"} fontWeight={"600"}>New Hero</Typography>
                  </div>
                  </div>
               </div>
               <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  sx={{
                     // border:"1px solid red",
                     position: "absolute",
                     width: "100%",
                     bottom: "20px",
                  }}>
                  <Box maxWidth={"500px"} width={"100%"} display={"flex"} justifyContent={"space-around"}>
                     <Button disableElevation variant="contained" color="success">
                        Will Attend
                     </Button>
                     <Button
                        disableElevation
                        variant="contained"
                        sx={{ color: "white" }}
                        //   onClick={saveAndContinue}
                     >
                        Not Attend
                     </Button>
                  </Box>
               </Stack>
            </div>
         </Backdrop>
      </>
   );
};

export default AnimationEnvelope;

// =======================================================
// =======================================================
// ======================================================
