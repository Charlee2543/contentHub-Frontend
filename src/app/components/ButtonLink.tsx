"use client";

import React from "react";
interface buttonLinkType {
   functionOut: () => void;
   textButton: string;
   marginXY: string;
   stlyeTailwind?: string;
   bgColor?: string;
}

function ButtonLink({
   functionOut,
   stlyeTailwind,
   textButton,
   marginXY,
   bgColor,
}: buttonLinkType) {
   // function , ความกว้าง , background color text
   return (
      <button
         onClick={functionOut}
         style={{ backgroundColor: bgColor ?? "", margin: marginXY }}
         className={`button-link ${stlyeTailwind ?? ""} `}
      >
         {textButton}
      </button>
   );
}

export default ButtonLink;
