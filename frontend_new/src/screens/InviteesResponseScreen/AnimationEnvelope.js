import React, { useEffect, useRef, useState } from "react";
import "./AnimationStyle.css";
import { gsap } from "gsap";
import { Power4 } from "gsap";
import { Power1 } from "gsap";
import { Circ } from "gsap";
const AnimationEnvelope = ({src}) => {
   const [envelopeOpen, setEnvelopeOpen] = useState(false);
   const [anim, setAnim] = useState("");

   useEffect(() => {}, []);

   const pullOut = () => {
      const tl =  gsap
         .timeline()
         .to(".flap", {
            duration: 1,
            rotationX: 180,
            ease: Power1.easeInOut,
         })
         .to(".invitation", {
            scale: 0.8,
            ease: Power4.easeInOut,
         })
         .to(".flap", {
            duration:.1,
            zIndex: 0,
           ease: Circ.easeInOut,

         }).to(".mask",{
            duration:.2,
           height:"1000px",
           ease: Circ.easeInOut,

         })
         .to(".card", {
            duration: .8,
            bottom: "800px",
            ease: Circ.ease,
         })
         .to(".mask", {
            overflow: "visible",
            'clip-path': 'inset(0 0 0% 0)',
            bottom:" -65px",
            onComplete: function () {
               setEnvelopeOpen(true);
            },
         })
         .to(".card", {
            duration: .5,
            height:"600px",
            ease: Circ.easeInOut,
         })
         .to(".card", {
            duration: .8,
            bottom: "-399px",
            ease: Circ.easeInOut,
         })
         .to(".invitation", {
            scale:.85,
            ease: Circ.easeInOut,
         })

         return  tl;
   };

   return (
      <div className="wrapper">
         <div className="invitation">
            <div className={`envelope ${envelopeOpen ? "is-open" : ""}`}>
               <div className="mask">
                  <div className="card">
                     <div className="face">
                        <img  src={src} alt="img" srcset="" />
                     </div>
                  </div>
               </div>
            </div>
            <div className="flap"></div>
            <button  
               onClick={() => {
                  setAnim(pullOut());
               }}
               className={` invitedbtn ${envelopeOpen ? "btnHide" : ""}`}>
               You're Invited!
            </button>
           {envelopeOpen &&  <button 
               onClick={() => {
                  setEnvelopeOpen(false)
                  anim.restart();
               }}
               className="restart">
               Re-Open
            </button>}
         </div>
      </div>
   );
};

export default AnimationEnvelope;

// =======================================================
// =======================================================
// ======================================================
